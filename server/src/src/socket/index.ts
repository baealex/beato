import type { Socket } from 'socket.io';

import { connectors } from './connectors';
import { syncListener } from './sync';
import { musicListener } from './music';
import { playlistListener } from './playlist';

export const socketManager = (socket: Socket) => {
    console.log(`${socket.id} : a user connected`);
    connectors.append(Object.assign(socket, {
        userAgent: socket.handshake.headers['user-agent'],
        connectedAt: Date.now(),
    }));
    connectors.broadcast('get-connectors', connectors.get().map((c) => ({
        id: c.id,
        userAgent: c.userAgent,
        connectedAt: c.connectedAt,
    })));

    socket.emit('resync', '');
    syncListener(socket);
    musicListener(socket);
    playlistListener(socket);

    socket.on('get-connectors', () => {
        socket.emit('get-connectors', connectors.get().map((c) => ({
            id: c.id,
            userAgent: c.userAgent,
            connectedAt: c.connectedAt,
        })));
    });

    socket.on('disconnect-connector', ({ id = '' }) => {
        if (!id) return;
        connectors.get().forEach((connector) => {
            console.log(connector.id, id);
            if (connector.id === id) {
                connector.disconnect();
            }
        });
        connectors.remove(id);
    });

    socket.on('disconnect', () => {
        console.log(`${socket.id} : user disconnected`);
        connectors.remove(socket.id);
        connectors.broadcast('get-connectors', connectors.get().map((c) => ({
            id: c.id,
            userAgent: c.userAgent,
            connectedAt: c.connectedAt,
        })));
    });
};