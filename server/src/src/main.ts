import app from './app';
import fs from 'fs';
import http from 'http';
import path from 'path';
import { Server } from 'socket.io';
import { parseBuffer } from 'music-metadata';

const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('a user connected');

    let stream: fs.ReadStream;

    socket.on('sync', (file) => {
        fs.readdir(path.join(__dirname, '../sample'), (err, files) => {
            if (err) {
                console.log(err);
                return;
            }
            const promises = files.filter((file) => file.endsWith('.mp3')).map((file) => {
                return new Promise((resolve, reject) => {
                    fs.readFile(path.join(__dirname, '../sample', file), async (err, data) => {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        const { format, common } = await parseBuffer(data);
                        const { duration, } = format;
                        const { title, artist, album, picture, genre } = common;
                        resolve({
                            file,
                            title,
                            artist,
                            album,
                            picture,
                            genre,
                            duration,
                        });
                    });
                });
            });

            Promise.all(promises).then((values) => {
                socket.emit('files', values);
            });
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
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`http server listen on :${PORT}`));
