import app from './app';
import http from 'http';
import { Server } from 'socket.io';

import { socketManager } from './socket';

const server = http.createServer(app);
const io = new Server(server);
io.on('connection', socketManager);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`http server listen on:${PORT} `));
