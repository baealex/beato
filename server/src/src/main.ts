import http from 'http';
import { Server } from 'socket.io';

import { createApp } from './app';
import { requireAuthenticatedSocketConnection } from './modules/auth';
import { logAuthConfig, resolveAuthConfig } from './modules/auth-mode';
import { socketManager } from './socket';

const authConfig = resolveAuthConfig(process.env);
logAuthConfig(authConfig);

const app = createApp(authConfig);
const server = http.createServer(app);
const io = new Server(server);
io.use(requireAuthenticatedSocketConnection(authConfig));
io.on('connection', socketManager);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    process.stdout.write(`http server listen on:${PORT} (auth: ${authConfig.mode}) \n`);
});
