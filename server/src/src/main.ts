import app from './app';
import http from 'http';
import { Server } from 'socket.io';

import { sockerManager } from './socket';

const server = http.createServer(app);
const io = new Server(server);
io.on('connection', sockerManager);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`http server listen on:${PORT} `));
