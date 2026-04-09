import fs from 'fs';
import path from 'path';
import type { Socket } from 'socket.io';
import { parseBuffer } from 'music-metadata';
import sharp from 'sharp';

import { connectors } from './connectors';

import { walk } from '../modules/file';
import {
    TRACK_CONTENT_HASH_VERSION,
    createTrackContentHash,
    shouldRefreshTrackContentHash
} from '../modules/track-hash';
import {
    TRACK_SYNC_STATUS,
    classifyTrackIdentityCandidate,
    deriveTrackPresenceUpdates,
    type TrackIdentityRecord,
    type TrackSyncStatus
} from '../modules/track-identity';
import {
    SYNC_REPORT_KIND,
    SYNC_REPORT_STATUS,
    type SyncReportStatus
} from '../modules/sync-report';

import models, { type Album, type Artist, type Genre, type Music } from '~/models';

const SUPPORTED_AUDIO_EXTENSIONS = new Set([
    '.mp3',
    '.aac',
    '.wav',
    '.ogg',
    '.flac'
]);

const SYNC_EVENT = 'sync-music';

interface ParsedTrackMetadata {
    title: string;
    albumArtist: string | null;
    artist: string;
    album: string;
    pictureData: Buffer | null;
    genres: string[];
    year: string;
    trackNumber: number;
    codec: string;
    container: string;
    bitrate: number;
    duration: number;
    sampleRate: number;
}

interface SyncResultEntry {
    musicId: number;
    musicName: string;
    filePath: string;
    previousFilePath: string | null;
}

export interface SyncMusicResult {
    scannedFiles: number;
    indexedFiles: number;
    created: SyncResultEntry[];
    moved: SyncResultEntry[];
    duplicate: SyncResultEntry[];
    missing: SyncResultEntry[];
}

const ensureDirectory = (directoryPath: string) => {
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
    }
};

const emitSyncMessage = (socket: Pick<Socket, 'emit'>, message: string) => {
    socket.emit(SYNC_EVENT, message);
};

const isSupportedAudioFile = (filePath: string) => {
    return SUPPORTED_AUDIO_EXTENSIONS.has(path.extname(filePath).toLowerCase());
};

const toTrackIdentityRecord = (music: Music): TrackIdentityRecord => {
    return {
        id: music.id,
        filePath: music.filePath,
        contentHash: music.contentHash,
        lastSeenAt: music.lastSeenAt,
        missingSinceAt: music.missingSinceAt,
        syncStatus: music.syncStatus as TrackSyncStatus
    };
};

const parseTrackMetadata = async (filePath: string, data: Buffer): Promise<ParsedTrackMetadata> => {
    const { format, common } = await parseBuffer(data);
    const {
        container = '',
        codec = '',
        bitrate = 0,
        duration = 0,
        sampleRate = 0
    } = format;
    const {
        title = path.parse(filePath).name,
        albumartist: albumArtist = null,
        artist = 'unknown',
        album = 'unknown',
        picture,
        genre = [],
        year = (new Date()).getFullYear(),
        track
    } = common;

    return {
        title,
        albumArtist,
        artist,
        album,
        pictureData: picture?.[0]?.data ?? null,
        genres: genre,
        year: year.toString(),
        trackNumber: track?.no || 1,
        codec,
        container,
        bitrate,
        duration,
        sampleRate
    };
};

const findOrCreateArtist = async (name: string): Promise<Artist> => {
    const existingArtist = await models.artist.findFirst({ where: { name } });

    if (existingArtist) {
        return existingArtist;
    }

    return models.artist.create({ data: { name } });
};

const findOrCreateAlbum = async ({
    name,
    publishedYear,
    artistId
}: {
    name: string;
    publishedYear: string;
    artistId: number;
}): Promise<Album> => {
    const existingAlbum = await models.album.findFirst({
        where: {
            name,
            artistId
        }
    });

    if (existingAlbum) {
        return existingAlbum;
    }

    return models.album.create({
        data: {
            name,
            cover: '',
            publishedYear,
            artistId
        }
    });
};

const findOrCreateGenres = async (genreNames: string[]): Promise<Genre[]> => {
    return Promise.all(genreNames.map(async (name) => {
        const existingGenre = await models.genre.findUnique({ where: { name } });

        if (existingGenre) {
            return existingGenre;
        }

        return models.genre.create({ data: { name } });
    }));
};

const syncAlbumCover = async ({
    album,
    pictureData,
    cachePath,
    resizedPath
}: {
    album: Album;
    pictureData: Buffer | null;
    cachePath: string;
    resizedPath: string;
}) => {
    if (!pictureData) {
        return album.cover;
    }

    const fileName = `${album.id}.jpg`;
    const savePath = path.join(cachePath, fileName);

    const hasCache = fs.existsSync(savePath);
    const shouldUpdate = hasCache && (
        fs.readFileSync(savePath).toString() !== pictureData.toString()
    );

    if (!hasCache || shouldUpdate) {
        fs.writeFileSync(savePath, pictureData);
    }

    const resizedSavePath = path.join(resizedPath, fileName);
    if (!fs.existsSync(resizedSavePath) || shouldUpdate) {
        await sharp(savePath)
            .resize(300, 300)
            .toFile(resizedSavePath);
    }

    const coverPath = `/cache/resized/${fileName}`;
    if (album.cover !== coverPath) {
        await models.album.update({
            where: { id: album.id },
            data: { cover: coverPath }
        });
    }

    return coverPath;
};

const upsertMusicFromMetadata = async ({
    existingMusic,
    filePath,
    contentHash,
    metadata,
    observedAt,
    syncStatus,
    cachePath,
    resizedPath
}: {
    existingMusic?: Music;
    filePath: string;
    contentHash: string;
    metadata: ParsedTrackMetadata;
    observedAt: Date;
    syncStatus: TrackSyncStatus;
    cachePath: string;
    resizedPath: string;
}) => {
    const artist = await findOrCreateArtist(metadata.artist);
    const albumArtist = metadata.albumArtist
        ? await findOrCreateArtist(metadata.albumArtist)
        : null;
    const album = await findOrCreateAlbum({
        name: metadata.album,
        publishedYear: metadata.year,
        artistId: albumArtist ? albumArtist.id : artist.id
    });
    const genres = await findOrCreateGenres(metadata.genres);

    await syncAlbumCover({
        album,
        pictureData: metadata.pictureData,
        cachePath,
        resizedPath
    });

    if (existingMusic) {
        return models.music.update({
            where: { id: existingMusic.id },
            data: {
                codec: metadata.codec,
                container: metadata.container,
                bitrate: metadata.bitrate,
                sampleRate: metadata.sampleRate,
                name: metadata.title,
                duration: metadata.duration,
                trackNumber: metadata.trackNumber,
                filePath,
                contentHash,
                hashVersion: TRACK_CONTENT_HASH_VERSION,
                lastSeenAt: observedAt,
                missingSinceAt: null,
                syncStatus,
                albumId: album.id,
                artistId: artist.id,
                Genre: { set: genres.map((genre) => ({ id: genre.id })) }
            }
        });
    }

    return models.music.create({
        data: {
            codec: metadata.codec,
            container: metadata.container,
            bitrate: metadata.bitrate,
            sampleRate: metadata.sampleRate,
            name: metadata.title,
            duration: metadata.duration,
            trackNumber: metadata.trackNumber,
            filePath,
            contentHash,
            hashVersion: TRACK_CONTENT_HASH_VERSION,
            lastSeenAt: observedAt,
            missingSinceAt: null,
            syncStatus,
            Album: { connect: { id: album.id } },
            Artist: { connect: { id: artist.id } },
            Genre: { connect: genres.map((genre) => ({ id: genre.id })) }
        }
    });
};

const updateMusicIdentity = async ({
    music,
    contentHash
}: {
    music: Music;
    contentHash: string;
}) => {
    return models.music.update({
        where: { id: music.id },
        data: {
            contentHash,
            hashVersion: TRACK_CONTENT_HASH_VERSION
        }
    });
};

const pruneEmptyLibraryNodes = async () => {
    const existingAlbums = await models.album.findMany({ include: { Music: true } });

    for (const album of existingAlbums) {
        if (album.Music.length === 0) {
            await models.album.delete({ where: { id: album.id } });
        }
    }

    const existingArtists = await models.artist.findMany({
        include: {
            Album: {},
            Music: {}
        }
    });

    for (const artist of existingArtists) {
        if (artist.Album.length === 0 && artist.Music.length === 0) {
            await models.artist.delete({ where: { id: artist.id } });
        }
    }
};

const flattenSyncReportEntries = (result: SyncMusicResult) => {
    return ([
        [SYNC_REPORT_KIND.created, result.created],
        [SYNC_REPORT_KIND.moved, result.moved],
        [SYNC_REPORT_KIND.duplicate, result.duplicate],
        [SYNC_REPORT_KIND.missing, result.missing]
    ] as const).flatMap(([kind, entries]) => {
        return entries.map((entry) => ({
            kind,
            ...entry
        }));
    });
};

const persistSyncReport = async ({
    startedAt,
    completedAt,
    force,
    status,
    result
}: {
    startedAt: Date;
    completedAt: Date;
    force: boolean;
    status: SyncReportStatus;
    result: SyncMusicResult;
}) => {
    const items = flattenSyncReportEntries(result);

    return models.syncReport.create({
        data: {
            startedAt,
            completedAt,
            force,
            status,
            scannedFiles: result.scannedFiles,
            indexedFiles: result.indexedFiles,
            createdCount: result.created.length,
            movedCount: result.moved.length,
            duplicateCount: result.duplicate.length,
            missingCount: result.missing.length,
            Item: {
                create: items.map((entry) => ({
                    kind: entry.kind,
                    musicId: entry.musicId,
                    musicName: entry.musicName,
                    filePath: entry.filePath,
                    previousFilePath: entry.previousFilePath
                }))
            }
        }
    });
};

export const syncListener = (socket: Socket) => {
    let alreadySyncing = false;

    socket.on(SYNC_EVENT, async ({ force = false }) => {
        console.log(SYNC_EVENT);
        emitSyncMessage(socket, 'syncing...');

        if (alreadySyncing) {
            console.error('already syncing');
            emitSyncMessage(socket, 'error');
            return;
        }

        alreadySyncing = true;
        const syncResult = await syncMusic(socket, force);
        if (syncResult) {
            connectors.broadcast('resync', '');
        }
        alreadySyncing = false;
    });
};

export const syncMusic = async (socket: Pick<Socket, 'emit'>, force = false): Promise<SyncMusicResult | null> => {
    const startedAt = new Date();

    try {
        const files = (await walk(path.resolve('./music')))
            .filter(isSupportedAudioFile)
            .sort();
        const visiblePaths = new Set(files);
        const observedAt = startedAt;

        console.log(`find ${files.length} files`);
        emitSyncMessage(socket, `find ${files.length} files`);

        const cachePath = path.resolve('./cache');
        const resizedPath = path.join(cachePath, 'resized');
        ensureDirectory(cachePath);
        ensureDirectory(resizedPath);

        const musics = await models.music.findMany({ orderBy: { id: 'asc' } });
        const musicById = new Map(musics.map((music) => [music.id, music]));
        const musicByPath = new Map(musics.map((music) => [music.filePath, music]));
        const identityRecordById = new Map(musics.map((music) => [music.id, toTrackIdentityRecord(music)]));
        const indexedFiles = files.filter((filePath) => {
            const music = musicByPath.get(filePath);

            if (!music) {
                return true;
            }

            return force || shouldRefreshTrackContentHash({
                contentHash: music.contentHash,
                hashVersion: music.hashVersion
            });
        }).length;
        const result: SyncMusicResult = {
            scannedFiles: files.length,
            indexedFiles,
            created: [],
            moved: [],
            duplicate: [],
            missing: []
        };
        const orderedFiles = [
            ...files.filter((filePath) => musicByPath.has(filePath)),
            ...files.filter((filePath) => !musicByPath.has(filePath))
        ];

        console.log(`indexing ${indexedFiles} files`);
        emitSyncMessage(socket, `indexing ${indexedFiles} files`);

        const upsertKnownMusic = (music: Music) => {
            const previousMusic = musicById.get(music.id);

            if (previousMusic) {
                musicByPath.delete(previousMusic.filePath);
            }

            musicById.set(music.id, music);
            musicByPath.set(music.filePath, music);
            identityRecordById.set(music.id, toTrackIdentityRecord(music));
        };

        for (const [index, filePath] of orderedFiles.entries()) {
            console.log(`sync... ${filePath}`);
            emitSyncMessage(socket, `sync... ${index + 1}/${files.length}`);

            const pathMatch = musicByPath.get(filePath);
            const requiresHashRefresh = !pathMatch || force || shouldRefreshTrackContentHash({
                contentHash: pathMatch.contentHash,
                hashVersion: pathMatch.hashVersion
            });

            let fileData: Buffer | null = null;
            let contentHash = pathMatch?.contentHash ?? null;

            if (requiresHashRefresh) {
                fileData = fs.readFileSync(filePath);
                contentHash = createTrackContentHash(fileData);
            }

            if (pathMatch) {
                if (force) {
                    const metadata = await parseTrackMetadata(filePath, fileData ?? fs.readFileSync(filePath));
                    const updatedMusic = await upsertMusicFromMetadata({
                        existingMusic: pathMatch,
                        filePath,
                        contentHash: contentHash ?? createTrackContentHash(fs.readFileSync(filePath)),
                        metadata,
                        observedAt,
                        syncStatus: pathMatch.syncStatus as TrackSyncStatus,
                        cachePath,
                        resizedPath
                    });
                    upsertKnownMusic(updatedMusic);
                    continue;
                }

                if (requiresHashRefresh && contentHash) {
                    const updatedMusic = await updateMusicIdentity({
                        music: pathMatch,
                        contentHash
                    });
                    upsertKnownMusic(updatedMusic);
                }

                continue;
            }

            const resolvedFileData = fileData ?? fs.readFileSync(filePath);
            const resolvedContentHash = contentHash ?? createTrackContentHash(resolvedFileData);
            const metadata = await parseTrackMetadata(filePath, resolvedFileData);
            const match = classifyTrackIdentityCandidate(
                [...identityRecordById.values()],
                {
                    filePath,
                    contentHash: resolvedContentHash
                },
                visiblePaths
            );

            if (match.kind === 'moved') {
                const existingMusic = musicById.get(match.record.id);

                if (!existingMusic) {
                    continue;
                }

                const movedMusic = await upsertMusicFromMetadata({
                    existingMusic,
                    filePath,
                    contentHash: resolvedContentHash,
                    metadata,
                    observedAt,
                    syncStatus: TRACK_SYNC_STATUS.active,
                    cachePath,
                    resizedPath
                });
                upsertKnownMusic(movedMusic);
                result.moved.push({
                    musicId: movedMusic.id,
                    musicName: movedMusic.name,
                    filePath,
                    previousFilePath: match.record.filePath
                });
                continue;
            }

            const createdMusic = await upsertMusicFromMetadata({
                filePath,
                contentHash: resolvedContentHash,
                metadata,
                observedAt,
                syncStatus: match.kind === 'duplicate'
                    ? TRACK_SYNC_STATUS.duplicate
                    : TRACK_SYNC_STATUS.active,
                cachePath,
                resizedPath
            });
            upsertKnownMusic(createdMusic);

            if (match.kind === 'duplicate') {
                result.duplicate.push({
                    musicId: createdMusic.id,
                    musicName: createdMusic.name,
                    filePath,
                    previousFilePath: null
                });
            } else {
                result.created.push({
                    musicId: createdMusic.id,
                    musicName: createdMusic.name,
                    filePath,
                    previousFilePath: null
                });
            }
        }

        const presenceUpdates = deriveTrackPresenceUpdates(
            [...identityRecordById.values()],
            visiblePaths,
            observedAt
        );

        for (const presenceUpdate of presenceUpdates) {
            const updatedMusic = await models.music.update({
                where: { id: presenceUpdate.id },
                data: {
                    lastSeenAt: presenceUpdate.lastSeenAt,
                    missingSinceAt: presenceUpdate.missingSinceAt,
                    syncStatus: presenceUpdate.syncStatus
                }
            });
            upsertKnownMusic(updatedMusic);

            if (presenceUpdate.syncStatus === TRACK_SYNC_STATUS.missing) {
                result.missing.push({
                    musicId: updatedMusic.id,
                    musicName: updatedMusic.name,
                    filePath: updatedMusic.filePath,
                    previousFilePath: null
                });
            }
        }

        await pruneEmptyLibraryNodes();
        await persistSyncReport({
            startedAt,
            completedAt: new Date(),
            force,
            status: SYNC_REPORT_STATUS.success,
            result
        });
        console.log('sync-music done');
        emitSyncMessage(socket, 'done');

        return result;
    } catch (error) {
        console.error(error);
        await persistSyncReport({
            startedAt,
            completedAt: new Date(),
            force,
            status: SYNC_REPORT_STATUS.error,
            result: {
                scannedFiles: 0,
                indexedFiles: 0,
                created: [],
                moved: [],
                duplicate: [],
                missing: []
            }
        }).catch((reportError) => {
            console.error(reportError);
        });
        emitSyncMessage(socket, 'error');
        return null;
    }
};
