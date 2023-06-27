import fs from 'fs';
import path from 'path';

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

    socket.on('file', async (id: string) => {
        const $music = await models.music.findUnique({
            where: {
                id: Number(id),
            },
        });

        if (fs.existsSync(path.resolve('./music', $music.filePath))) {
            stream = fs.createReadStream(path.resolve('./music', $music.filePath));
            console.log(`${socket.id}: stream start [${$music.name}]`);
            stream.on('data', (chunk) => {
                socket.emit('audio', {
                    id: $music.id.toString(),
                    chunk,
                });
            });
            stream.on('end', () => {
                console.log(`${socket.id}: stream end [${$music.name}]`);
                socket.emit('audio', {
                    id: $music.id.toString(),
                    chunk: 'end',
                });
            });
        } else {
            console.log(`${socket.id}: cannot find file [${$music.name}]`);
            socket.emit('audio', {
                id: $music.id,
                chunk: 'cannot find file',
            });
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
        console.log(`${socket.id} : user disconnected`);
        if (stream) {
            stream.destroy();
        }
    });
};