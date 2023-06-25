import app from './app';
import fs from 'fs';
import http from 'http';
import path from 'path';
import { Server } from 'socket.io';
import { parseBuffer } from 'music-metadata';

import models from './models';

const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('a user connected');

    let stream: fs.ReadStream;

    socket.on('sync-music', async () => {
        try {
            const files = fs.readdirSync(path.join(__dirname, '../sample'));

            for (const file of files.filter((file) => file.endsWith('.mp3'))) {
                console.log('sync... ' + file);
                const data = fs.readFileSync(path.join(__dirname, '../sample', file));

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
                    if (!fs.existsSync(path.join(__dirname, '../cache'))) {
                        fs.mkdirSync(path.join(__dirname, '../cache'));
                    }
                    const fileName = $album.id + '.jpg';
                    const savePath = path.join(__dirname, '../cache', fileName);
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

        socket.emit('sync-music', 'done');
    });

    socket.on('file', (file) => {
        stream = fs.createReadStream(path.resolve(__dirname, '../sample/', file));
        stream.on('data', (chunk) => {
            socket.emit('audio', chunk);
        });
        stream.on('end', () => {
            socket.emit('audio', null);
        });
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
        if (stream) {
            stream.destroy();
        }
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`http server listen on:${PORT} `));
