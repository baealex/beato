import { default as socketClient } from 'socket.io-client';

export const socket = socketClient('/', {
    autoConnect: false,
});
