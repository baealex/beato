import fs from 'fs';
import os from 'os';
import path from 'path';
import { parseBuffer } from 'music-metadata';

import models from '~/models';
import { musicResolvers } from '~/schema/music';

jest.mock('../modules/file', () => ({ walk: jest.fn() }));

jest.mock('music-metadata', () => ({ parseBuffer: jest.fn() }));

jest.mock('sharp', () => {
    return jest.fn(() => ({
        resize: jest.fn().mockReturnThis(),
        toFile: jest.fn().mockResolvedValue(undefined)
    }));
});

import { walk } from '../modules/file';
import { TRACK_CONTENT_HASH_VERSION, createTrackContentHash } from '../modules/track-hash';
import { SYNC_REPORT_KIND, SYNC_REPORT_STATUS } from '../modules/sync-report';
import { TRACK_SYNC_STATUS } from '../modules/track-identity';
import { syncMusic } from './sync';

const walkMock = jest.mocked(walk);
const parseBufferMock = jest.mocked(parseBuffer);

const createTrackFixture = (overrides?: {
    title?: string;
    artist?: string;
    album?: string;
    year?: string;
    trackNumber?: number;
    fingerprint?: string;
}) => {
    const title = overrides?.title ?? 'Track A';
    const artist = overrides?.artist ?? 'Artist A';
    const album = overrides?.album ?? 'Album A';
    const year = overrides?.year ?? '2026';
    const trackNumber = overrides?.trackNumber ?? 1;
    const fingerprint = overrides?.fingerprint ?? 'fingerprint-a';

    return `title=${title}|artist=${artist}|album=${album}|year=${year}|track=${trackNumber}|fingerprint=${fingerprint}`;
};

const createTempTrackFile = ({
    directory,
    relativePath,
    contents
}: {
    directory: string;
    relativePath: string;
    contents: string;
}) => {
    const absolutePath = path.join(directory, relativePath);

    fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
    fs.writeFileSync(absolutePath, contents);

    return absolutePath;
};

const createExistingMusic = async ({
    filePath,
    contents,
    syncStatus = TRACK_SYNC_STATUS.active,
    withHash = true
}: {
    filePath: string;
    contents: string;
    syncStatus?: typeof TRACK_SYNC_STATUS[keyof typeof TRACK_SYNC_STATUS];
    withHash?: boolean;
}) => {
    const artist = await models.artist.create({ data: { name: 'Artist A' } });
    const album = await models.album.create({
        data: {
            name: 'Album A',
            cover: '',
            publishedYear: '2026',
            artistId: artist.id
        }
    });

    return models.music.create({
        data: {
            name: 'Track A',
            artistId: artist.id,
            albumId: album.id,
            filePath,
            contentHash: withHash ? createTrackContentHash(Buffer.from(contents)) : null,
            hashVersion: withHash ? TRACK_CONTENT_HASH_VERSION : null,
            duration: 180,
            codec: 'mp3',
            container: 'mp3',
            bitrate: 320,
            sampleRate: 44100,
            trackNumber: 1,
            syncStatus
        }
    });
};

describe('sync music identity', () => {
    const tempDirectories: string[] = [];

    beforeEach(async () => {
        jest.restoreAllMocks();
        walkMock.mockReset();
        parseBufferMock.mockReset();
        parseBufferMock.mockImplementation(async (data) => {
            const entries = Object.fromEntries(
                data.toString().split('|').map((entry) => entry.split('='))
            );

            return {
                format: {
                    container: 'mp3',
                    codec: 'mp3',
                    bitrate: 320,
                    duration: 180,
                    sampleRate: 44100
                },
                common: {
                    title: entries.title,
                    artist: entries.artist,
                    album: entries.album,
                    genre: [],
                    year: Number(entries.year),
                    track: { no: Number(entries.track) }
                }
            } as never;
        });

        await models.playbackEvent.deleteMany();
        await models.syncReportItem.deleteMany();
        await models.syncReport.deleteMany();
        await models.playlistMusic.deleteMany();
        await models.playlist.deleteMany();
        await models.musicLike.deleteMany();
        await models.musicHate.deleteMany();
        await models.music.deleteMany();
        await models.album.deleteMany();
        await models.artist.deleteMany();
        await models.genre.deleteMany();
    });

    afterEach(() => {
        while (tempDirectories.length > 0) {
            fs.rmSync(tempDirectories.pop()!, {
                recursive: true,
                force: true
            });
        }

        fs.rmSync(path.resolve('./cache'), {
            recursive: true,
            force: true
        });
    });

    it('moves a track to a new path without losing linked data', async () => {
        const contents = createTrackFixture();
        const tempDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'beato-sync-move-'));
        tempDirectories.push(tempDirectory);

        const movedPath = createTempTrackFile({
            directory: tempDirectory,
            relativePath: 'library/new/track-a.mp3',
            contents
        });
        const existingMusic = await createExistingMusic({
            filePath: path.join(tempDirectory, 'library/old/track-a.mp3'),
            contents
        });
        const playlist = await models.playlist.create({ data: { name: 'Favorites' } });
        await models.musicLike.create({ data: { musicId: existingMusic.id } });
        await models.playlistMusic.create({
            data: {
                playlistId: playlist.id,
                musicId: existingMusic.id
            }
        });

        walkMock.mockResolvedValue([movedPath]);

        const result = await syncMusic({ emit: jest.fn() } as never);
        const movedMusic = await models.music.findUniqueOrThrow({ where: { id: existingMusic.id } });
        const like = await models.musicLike.findFirst({ where: { musicId: existingMusic.id } });
        const playlistLink = await models.playlistMusic.findFirst({ where: { musicId: existingMusic.id } });
        const report = await models.syncReport.findFirstOrThrow({
            orderBy: { createdAt: 'desc' },
            include: { Item: true }
        });

        expect(result).toMatchObject({
            moved: [{
                musicId: existingMusic.id,
                filePath: movedPath
            }]
        });
        expect(movedMusic.filePath).toBe(movedPath);
        expect(movedMusic.syncStatus).toBe(TRACK_SYNC_STATUS.active);
        expect(movedMusic.missingSinceAt).toBeNull();
        expect(like).not.toBeNull();
        expect(playlistLink).not.toBeNull();
        expect(report).toMatchObject({
            status: SYNC_REPORT_STATUS.success,
            movedCount: 1,
            createdCount: 0,
            duplicateCount: 0,
            missingCount: 0
        });
        expect(report.Item).toEqual(expect.arrayContaining([
            expect.objectContaining({
                kind: SYNC_REPORT_KIND.moved,
                musicId: existingMusic.id,
                musicName: movedMusic.name,
                filePath: movedPath,
                previousFilePath: path.join(tempDirectory, 'library/old/track-a.mp3')
            })
        ]));
    });

    it('creates a duplicate row but keeps the normal library scoped to active tracks', async () => {
        const contents = createTrackFixture({ fingerprint: 'duplicate-hash' });
        const tempDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'beato-sync-duplicate-'));
        tempDirectories.push(tempDirectory);

        const originalPath = createTempTrackFile({
            directory: tempDirectory,
            relativePath: 'library/original/track-a.mp3',
            contents
        });
        const copyPath = createTempTrackFile({
            directory: tempDirectory,
            relativePath: 'library/copy/track-a.mp3',
            contents
        });
        const originalMusic = await createExistingMusic({
            filePath: originalPath,
            contents,
            withHash: false
        });

        walkMock.mockResolvedValue([originalPath, copyPath]);

        const result = await syncMusic({ emit: jest.fn() } as never);
        const musics = await models.music.findMany({ orderBy: { id: 'asc' } });
        const visibleMusics = await (musicResolvers.Query as { allMusics: () => Promise<{ id: number }[]> }).allMusics();
        const report = await models.syncReport.findFirstOrThrow({
            orderBy: { createdAt: 'desc' },
            include: { Item: true }
        });

        expect(result).toMatchObject({
            duplicate: [{
                musicId: musics[1].id,
                filePath: copyPath
            }]
        });
        expect(musics).toHaveLength(2);
        expect(musics[0]).toMatchObject({
            id: originalMusic.id,
            filePath: originalPath,
            syncStatus: TRACK_SYNC_STATUS.active
        });
        expect(musics[0].contentHash).toBe(createTrackContentHash(Buffer.from(contents)));
        expect(musics[1]).toMatchObject({
            filePath: copyPath,
            syncStatus: TRACK_SYNC_STATUS.duplicate
        });
        expect(visibleMusics.map((music) => music.id)).toEqual([originalMusic.id]);
        expect(report).toMatchObject({
            status: SYNC_REPORT_STATUS.success,
            createdCount: 0,
            movedCount: 0,
            duplicateCount: 1,
            missingCount: 0
        });
        expect(report.Item).toEqual(expect.arrayContaining([
            expect.objectContaining({
                kind: SYNC_REPORT_KIND.duplicate,
                filePath: copyPath,
                musicName: musics[1].name
            })
        ]));
    });

    it('marks unseen tracks as missing instead of deleting them', async () => {
        const contents = createTrackFixture({ fingerprint: 'missing-hash' });
        const existingMusic = await createExistingMusic({
            filePath: '/tmp/library/missing-track.mp3',
            contents
        });
        const playlist = await models.playlist.create({ data: { name: 'Archive' } });
        await models.musicLike.create({ data: { musicId: existingMusic.id } });
        await models.playlistMusic.create({
            data: {
                playlistId: playlist.id,
                musicId: existingMusic.id
            }
        });

        walkMock.mockResolvedValue([]);

        const result = await syncMusic({ emit: jest.fn() } as never);
        const missingMusic = await models.music.findUniqueOrThrow({ where: { id: existingMusic.id } });
        const visibleMusics = await (musicResolvers.Query as { allMusics: () => Promise<{ id: number }[]> }).allMusics();
        const report = await models.syncReport.findFirstOrThrow({
            orderBy: { createdAt: 'desc' },
            include: { Item: true }
        });

        expect(result).toMatchObject({
            missing: [{
                musicId: existingMusic.id,
                filePath: existingMusic.filePath
            }]
        });
        expect(missingMusic.syncStatus).toBe(TRACK_SYNC_STATUS.missing);
        expect(missingMusic.missingSinceAt).not.toBeNull();
        expect(await models.musicLike.count({ where: { musicId: existingMusic.id } })).toBe(1);
        expect(await models.playlistMusic.count({ where: { musicId: existingMusic.id } })).toBe(1);
        expect(visibleMusics).toHaveLength(0);
        expect(report).toMatchObject({
            status: SYNC_REPORT_STATUS.success,
            missingCount: 1
        });
        expect(report.Item).toEqual(expect.arrayContaining([
            expect.objectContaining({
                kind: SYNC_REPORT_KIND.missing,
                musicId: existingMusic.id,
                filePath: existingMusic.filePath,
                musicName: existingMusic.name
            })
        ]));
    });
});
