import fs from 'fs';
import path from 'path';
import { parseBuffer } from 'music-metadata';

import type { Socket } from 'socket.io';

import models from '../models';

export const sockerManager = (socket: Socket) => {
    console.log('a user connected');

    let stream: fs.ReadStream;

    socket.on('sync-music', async () => {
        console.log('sync-music');
        try {
            const files = fs.readdirSync(path.resolve('./sample'));

            for (const file of files.filter((file) => file.endsWith('.mp3'))) {
                console.log('sync... ' + file);
                const data = fs.readFileSync(path.resolve('./sample', file));

                const { format, common } = await parseBuffer(data);
                const { duration } = format;
                const { title, artist, album, picture, genre, year, track } = common;

                let $artist = await models.artist.findFirst({
                    where: {
                        name: artist,
                    },
                });

                if (!$artist) {
                    $artist = await models.artist.create({
                        data: {
                            name: artist,
                        },
                    });
                }

                let $album = await models.album.findFirst({
                    where: {
                        name: album,
                        Artist: {
                            name: artist,
                        },
                    },
                });

                if (!$album) {
                    $album = await models.album.create({
                        data: {
                            name: album,
                            cover: '',
                            publishedYear: year?.toString() || (new Date()).getFullYear().toString(),
                            Artist: {
                                connect: {
                                    id: $artist.id,
                                },
                            },
                        },
                    });
                }

                let coverPath = '';
                if (picture?.[0]?.data) {
                    const cachePath = path.resolve('./cache');

                    if (!fs.existsSync(cachePath)) {
                        fs.mkdirSync(cachePath);
                    }
                    const fileName = $album.id + '.jpg';
                    const savePath = path.join(cachePath, fileName);
                    if (!fs.existsSync(savePath)) {
                        fs.writeFileSync(savePath, picture[0].data);
                    }
                    coverPath = '/cache/' + fileName;
                }

                if (coverPath && $album.cover !== coverPath) {
                    $album = await models.album.update({
                        where: {
                            id: $album.id,
                        },
                        data: {
                            cover: coverPath,
                        },
                    });
                }

                const promises = genre?.map(async (name) => {
                    const $genre = await models.genre.findUnique({
                        where: {
                            name,
                        },
                    });

                    if (!$genre) {
                        return await models.genre.create({
                            data: {
                                name,
                            },
                        });
                    }

                    return $genre;
                });

                const $genres = promises ? await Promise.all(promises) : [];

                const $music = await models.music.findFirst({
                    where: {
                        name: title,
                        artistId: $artist.id,
                        albumId: $album.id,
                    },
                });

                if (!$music) {
                    await models.music.create({
                        data: {
                            name: title,
                            artistId: $artist.id,
                            albumId: $album.id,
                            duration,
                            trackNumber: track.no || 0,
                            filePath: file,
                            Genre: {
                                connect: $genres.map((genre) => ({
                                    id: genre.id,
                                })),
                            }
                        },
                    });
                } else if ($music.filePath !== file) {
                    await models.music.update({
                        where: {
                            id: $music.id,
                        },
                        data: {
                            filePath: file,
                        },
                    });
                }
            }
        } catch (error) {
            console.error(error);
            socket.emit('sync-music', 'error');
            return;
        }

        console.log('sync-music done');
        socket.emit('sync-music', 'done');
    });

    socket.on('file', (file) => {
        stream = fs.createReadStream(path.resolve('./sample', file));
        stream.on('data', (chunk) => {
            socket.emit('audio', chunk);
        });
        stream.on('end', () => {
            socket.emit('audio', 'end');
        });
    });

    socket.on('count', async (id: string) => {
        const $music = await models.music.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        if ($music) {
            console.log('count update', $music.name, $music.playCount + 1);
            await models.music.update({
                where: {
                    id: parseInt(id),
                },
                data: {
                    playCount: $music.playCount + 1,
                },
            });
        }
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
        if (stream) {
            stream.destroy();
        }
    });
};