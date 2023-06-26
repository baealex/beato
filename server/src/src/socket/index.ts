import fs from 'fs';
import path from 'path';
import { parseBuffer } from 'music-metadata';

import type { Socket } from 'socket.io';

import models from '../models';
import { walk } from '../modules/file';

export const sockerManager = (socket: Socket) => {
    console.log('a user connected');

    let stream: fs.ReadStream;

    socket.on('sync-music', async () => {
        console.log('sync-music');
        socket.emit('sync-music', 'syncing...');

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

            const filteredFiles = files.filter((file) => {
                for (const existMusic of $existMusics) {
                    if (existMusic.filePath === file) {
                        return false;
                    }
                }
                return true;
            });

            console.log(`indexing ${filteredFiles.length} files`);
            socket.emit('sync-music', `indexing ${filteredFiles.length} files`);

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
                    sampleRate = 0,
                } = format;
                const {
                    title = file.split('/').pop().split('.').shift(),
                    artist = 'unknown',
                    album = 'unknown',
                    picture,
                    genre,
                    year = (new Date()).getFullYear(),
                    track: { no: trackNumber = 0 }
                } = common;

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
                            publishedYear: year.toString(),
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
                            codec,
                            container,
                            bitrate,
                            sampleRate,
                            name: title,
                            duration,
                            trackNumber,
                            filePath: file,
                            Album: {
                                connect: {
                                    id: $album.id,
                                },
                            },
                            Artist: {
                                connect: {
                                    id: $artist.id,
                                },
                            },
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

            $existMusics = await models.music.findMany({});

            for (const music of $existMusics) {
                if (!files.includes(music.filePath)) {
                    console.log(`delete music from db... ${music.name}`);
                    socket.emit('sync-music', `delete music from db... ${music.name}`);
                    await models.music.delete({
                        where: {
                            id: music.id,
                        },
                    });
                }
            }

            const $existAlbums = await models.album.findMany({
                include: {
                    Music: true,
                },
            });

            for (const album of $existAlbums) {
                if (album.Music.length === 0) {
                    console.log(`delete album from db... ${album.name}`);
                    socket.emit('sync-music', `delete album from db... ${album.name}`);
                    await models.album.delete({
                        where: {
                            id: album.id,
                        },
                    });
                }
            }

            const $existArtists = await models.artist.findMany({
                include: {
                    Album: {
                        include: {
                            Music: true,
                        },
                    },
                },
            });

            for (const artist of $existArtists) {
                if (artist.Album.length === 0) {
                    console.log(`delete artist from db... ${artist.name}`);
                    socket.emit('sync-music', `delete artist from db... ${artist.name}`);
                    await models.artist.delete({
                        where: {
                            id: artist.id,
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
        if (fs.existsSync(path.resolve('./music', file))) {
            stream = fs.createReadStream(path.resolve('./music', file));
            stream.on('data', (chunk) => {
                socket.emit('audio', chunk);
            });
            stream.on('end', () => {
                socket.emit('audio', 'end');
            });
        } else {
            socket.emit('audio', 'end');
        }
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