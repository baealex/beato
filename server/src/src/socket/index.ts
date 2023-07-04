import fs from 'fs';

import type { Socket } from 'socket.io';

import models from '~/models';
import { indexingMusic } from '~/modules/indexing';

export const socketManager = (socket: Socket) => {
    console.log(`${socket.id} : a user connected`);

    let stream: fs.ReadStream;
    let isSyuncing = false;

    socket.on('sync-music', async () => {
        console.log('sync-music');
        socket.emit('sync-music', 'syncing...');

        if (isSyuncing) {
            console.error('already syncing');
            socket.emit('sync-music', 'error');
            return;
        }

        isSyuncing = true;
        await indexingMusic(socket);
        isSyuncing = false;
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

    socket.on('like', async (id: string) => {
        let isLiked = false;
        const $music = await models.music.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        if ($music) {
            const $like = await models.musicLike.findFirst({
                where: {
                    musicId: $music.id,
                },
            });

            if ($like) {
                isLiked = false;
                await models.musicLike.delete({
                    where: {
                        id: $like.id,
                    },
                });
            } else {
                isLiked = true;
                await models.musicLike.create({
                    data: {
                        musicId: $music.id,
                    },
                });
            }

            console.log('like update', $music.name, isLiked);
            socket.emit('like', {
                id: $music.id.toString(),
                isLiked,
            });
        }
    });

    socket.on('disconnect', () => {
        console.log(`${socket.id} : user disconnected`);
        if (stream) {
            stream.destroy();
        }
    });
};