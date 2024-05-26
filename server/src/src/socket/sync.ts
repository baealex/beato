import fs from 'fs';
import path from 'path';
import type { Socket } from 'socket.io';
import { parseBuffer } from 'music-metadata';
import sharp from 'sharp';

import { connectors } from './connectors';

import { walk } from '../modules/file';

import models from '~/models';

export const syncListener = (socket: Socket) => {
    let alreadySyncing = false;

    socket.on('sync-music', async ({ force = false }) => {
        console.log('sync-music');
        socket.emit('sync-music', 'syncing...');

        if (alreadySyncing) {
            console.error('already syncing');
            socket.emit('sync-music', 'error');
            return;
        }

        alreadySyncing = true;
        await syncMusic(socket, force);
        connectors.broadcast('resync', '');
        alreadySyncing = false;
    });
};

export const syncMusic = async (socket: Socket, force = false) => {
    try {
        const files = (await walk(path.resolve('./music')))
            .filter((file) =>
                file.endsWith('.mp3') ||
                file.endsWith('.aac') ||
                file.endsWith('.wav') ||
                file.endsWith('.ogg') ||
                file.endsWith('.flac'));
        console.log(`find ${files.length} files`);
        socket.emit('sync-music', `find ${files.length} files`);

        let $existMusics = await models.music.findMany();

        const filteredFiles = force ? files : files.filter((file) => {
            for (const existMusic of $existMusics) {
                if (existMusic.filePath === file) {
                    return false;
                }
            }
            return true;
        });

        console.log(`indexing ${filteredFiles.length} files`);
        socket.emit('sync-music', `indexing ${filteredFiles.length} files`);

        const cachePath = path.resolve('./cache');
        if (!fs.existsSync(cachePath)) {
            fs.mkdirSync(cachePath);
        }
        const resizedPath = path.join(cachePath, 'resized');
        if (!fs.existsSync(resizedPath)) {
            fs.mkdirSync(resizedPath);
        }

        for (const file of filteredFiles) {
            console.log(`sync... ${file}`);
            socket.emit('sync-music', `sync... ${filteredFiles.indexOf(file) + 1}/${filteredFiles.length}`);

            const data = fs.readFileSync(path.resolve('./music', file));

            const { format, common } = await parseBuffer(data);
            const {
                container = '',
                codec = '',
                bitrate = 0,
                duration = 0,
                sampleRate = 0
            } = format;
            const {
                title = file.split('/').pop().split('.').shift(),
                albumartist: albumArtist = null,
                artist = 'unknown',
                album = 'unknown',
                picture,
                genre,
                year = (new Date()).getFullYear(),
                track
            } = common;

            let $artist = await models.artist.findFirst({ where: { name: artist } });

            if (!$artist) {
                $artist = await models.artist.create({ data: { name: artist } });
            }

            let $albumArtist = null;

            if (albumArtist) {
                $albumArtist = await models.artist.findFirst({ where: { name: albumArtist } });

                if (!$albumArtist) {
                    $albumArtist = await models.artist.create({ data: { name: albumArtist } });
                }
            }

            let $album = await models.album.findFirst({
                where: {
                    name: album,
                    Artist: { name: albumArtist || artist }
                }
            });

            if (!$album) {
                $album = await models.album.create({
                    data: {
                        name: album,
                        cover: '',
                        publishedYear: year.toString(),
                        Artist: { connect: { id: albumArtist ? $albumArtist.id : $artist.id } }
                    }
                });
            }

            let coverPath = '';
            if (picture?.[0]?.data) {
                const fileName = $album.id + '.jpg';
                const savePath = path.join(cachePath, fileName);

                const hasCache = fs.existsSync(savePath);
                const shouldUpdate = hasCache && (
                    fs.readFileSync(savePath).toString() !== picture[0].data.toString()
                );
                if (!hasCache || shouldUpdate) {
                    fs.writeFileSync(savePath, picture[0].data);
                }

                const resizedFileName = $album.id + '.jpg';
                const resizedSavePath = path.join(resizedPath, resizedFileName);
                if (!fs.existsSync(resizedSavePath) || shouldUpdate) {
                    await sharp(savePath)
                        .resize(300, 300)
                        .toFile(resizedSavePath);
                }
                coverPath = '/cache/resized/' + fileName;
            }

            if (coverPath && $album.cover !== coverPath) {
                $album = await models.album.update({
                    where: { id: $album.id },
                    data: { cover: coverPath }
                });
            }

            const promises = genre?.map(async (name) => {
                const $genre = await models.genre.findUnique({ where: { name } });

                if (!$genre) {
                    return await models.genre.create({ data: { name } });
                }

                return $genre;
            });

            const $genres = promises ? await Promise.all(promises) : [];

            const $music = await models.music.findFirst({
                where: {
                    codec,
                    container,
                    bitrate,
                    sampleRate,
                    name: title,
                    duration,
                    trackNumber: track?.no || 1,
                    filePath: file,
                    albumId: $album.id,
                    artistId: $artist.id
                }
            });

            if (!$music) {
                await models.music.create({
                    data: {
                        codec,
                        container,
                        bitrate,
                        sampleRate,
                        name: title,
                        duration,
                        trackNumber: track?.no || 1,
                        filePath: file,
                        Album: { connect: { id: $album.id } },
                        Artist: { connect: { id: $artist.id } },
                        Genre: { connect: $genres.map((genre) => ({ id: genre.id })) }
                    }
                });
            } else if ($music.filePath !== file) {
                await models.music.update({
                    where: { id: $music.id },
                    data: { filePath: file }
                });
            }
        }

        $existMusics = await models.music.findMany();

        for (const music of $existMusics) {
            if (!files.includes(music.filePath)) {
                console.log(`delete music from db... ${music.name}`);
                socket.emit('sync-music', `delete music from db... ${music.name}`);
                await models.playlistMusic.deleteMany({ where: { musicId: music.id } });
                await models.musicHate.deleteMany({ where: { musicId: music.id } });
                await models.musicLike.deleteMany({ where: { musicId: music.id } });
                await models.music.delete({ where: { id: music.id } });
            }
        }

        const $existAlbums = await models.album.findMany({ include: { Music: true } });

        for (const album of $existAlbums) {
            if (album.Music.length === 0) {
                console.log(`delete album from db... ${album.name}`);
                socket.emit('sync-music', `delete album from db... ${album.name}`);
                await models.album.delete({ where: { id: album.id } });
            }
        }

        const $existArtists = await models.artist.findMany({
            include: {
                Album: {},
                Music: {}
            }
        });

        for (const artist of $existArtists) {
            if (artist.Album.length === 0 && artist.Music.length === 0) {
                console.log(`delete artist from db... ${artist.name}`);
                socket.emit('sync-music', `delete artist from db... ${artist.name}`);
                await models.artist.delete({ where: { id: artist.id } });
            }
        }
    } catch (error) {
        console.error(error);
        socket.emit('sync-music', 'error');
        return;
    }

    console.log('sync-music done');
    socket.emit('sync-music', 'done');
};
