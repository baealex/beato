import type { Socket } from 'socket.io';

import { connectors } from './connectors';
import { syncListener } from './sync';
import { musicListener } from './music';
import { playlistListener } from './playlist';

export const socketManager = (socket: Socket) => {
    console.log(`${socket.id} : a user connected`);
    connectors.append(socket);

    syncListener(socket);
    musicListener(socket);
    playlistListener(socket);

    socket.on('disconnect', () => {
        console.log(`${socket.id} : user disconnected`);
        connectors.remove(socket);
    });
};