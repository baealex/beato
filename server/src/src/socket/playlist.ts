import { Socket } from 'socket.io';

import models from '~/models';

import { connectors } from './connectors';

export const playlistListener = (socket: Socket) => {
    socket.on('playlist-create', () => { null; });
    socket.on('playlist-delete', () => { null; });
    socket.on('playlist-update', () => { null; });
    socket.on('playlist-add-music', () => { null; });
    socket.on('playlist-remove-music', () => { null; });
};