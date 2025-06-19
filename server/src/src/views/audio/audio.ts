import fs from 'fs';
import path from 'path';
import ffmpeg from 'fluent-ffmpeg';

import models from '~/models';

import type { Controller } from '~/types';
import type { Response } from 'express';

const streamFile = (filePath: string, res: Response): void => {
    const stream = fs.createReadStream(filePath);
    stream.on('error', (err) => {
        console.error('Error streaming file:', err);
        if (!res.headersSent) {
            res.status(500).send('Error streaming audio').end();
        }
    });
    stream.pipe(res);
};

export const audio: Controller = async (req, res) => {
    const { id } = req.params;

    const requestedBitrate = req.query.bitrate as string || '128k';
    const requestedFormat = req.query.format as string || 'mp3';

    const validBitrates = ['64k', '96k', '128k', '192k', '256k', '320k'];
    const bitrate = validBitrates.includes(requestedBitrate) ? requestedBitrate : '128k';

    const validFormats = ['mp3', 'aac', 'ogg'];
    const outputFormat = validFormats.includes(requestedFormat) ? requestedFormat : 'mp3';

    if (!id || !Number.isInteger(Number(id))) {
        res.status(400).send('Bad Request').end();
        return;
    }

    try {
        const $music = await models.music.findUnique({ where: { id: Number(id) } });

        if (!$music) {
            res.status(404).send('Music not found').end();
            return;
        }

        const filePath = path.resolve('./music', $music.filePath);

        if (!fs.existsSync(filePath)) {
            res.status(404).send('Audio file not found').end();
            return;
        }

        const fileExtension = $music.filePath.split('.').pop().toLowerCase();

        const contentTypeMap = {
            'mp3': 'audio/mpeg',
            'aac': 'audio/aac'
        };

        const noTranscode = req.query.notranscode === 'true';

        if (noTranscode) {
            const mimeTypes = {
                'mp3': 'audio/mpeg',
                'flac': 'audio/flac',
                'aac': 'audio/aac',
                'ogg': 'audio/ogg',
                'wav': 'audio/wav'
            };

            res.setHeader('Content-Type', mimeTypes[fileExtension] || 'audio/mpeg');
            res.setHeader('Accept-Ranges', 'bytes');
            res.setHeader('Cache-Control', 'max-age=604800');

            streamFile(filePath, res);
            return;
        }
        res.setHeader('Content-Type', contentTypeMap[outputFormat] || 'audio/mpeg');
        res.setHeader('Cache-Control', 'max-age=604800');

        if (fileExtension === outputFormat && bitrate === '320k') {
            res.setHeader('Accept-Ranges', 'bytes');
            streamFile(filePath, res);
            return;
        }

        res.setHeader('Accept-Ranges', 'none');

        try {
            const tempDir = path.resolve('./temp');
            if (!fs.existsSync(tempDir)) {
                fs.mkdirSync(tempDir, { recursive: true });
            }

            const tempFileName = `${id}_${outputFormat}_${bitrate}_${Date.now()}.${outputFormat}`;
            const tempFilePath = path.join(tempDir, tempFileName);

            const command = ffmpeg(filePath)
                .audioBitrate(bitrate)
                .audioFrequency(44100)
                .audioChannels(2);

            if (outputFormat === 'mp3') {
                command
                    .format('mp3')
                    .audioCodec('libmp3lame')
                    .outputOptions([
                        '-id3v2_version', '3',
                        '-write_xing', '1'
                    ]);
            } else if (outputFormat === 'aac') {
                command
                    .format('adts')
                    .audioCodec('aac')
                    .outputOptions([
                        '-strict', 'experimental'
                    ]);
            }

            command.output(tempFilePath);

            command.on('start', () => {
                console.log(`Starting audio transcoding with bitrate: ${bitrate}, format: ${outputFormat}`);
            });

            command.on('end', () => {
                console.log('Audio transcoding completed successfully');

                const fileStream = fs.createReadStream(tempFilePath);

                fileStream.on('error', (err) => {
                    console.error('Error streaming transcoded file:', err);
                    if (!res.headersSent) {
                        res.status(500).send('Error streaming audio').end();
                    }

                    try { fs.unlinkSync(tempFilePath); } catch (e) { /* ignore */ }
                });

                fileStream.on('close', () => {
                    try { fs.unlinkSync(tempFilePath); } catch (e) { /* ignore */ }
                });

                fileStream.pipe(res);
            });

            command.on('error', (err) => {
                console.error('Error during audio transcoding:', err);
                if (!res.headersSent) {
                    console.log('Falling back to direct streaming');
                    streamFile(filePath, res);
                }
                try { fs.unlinkSync(tempFilePath); } catch (e) { /* ignore */ }
            });

            command.run();
        } catch (err) {
            console.error('Error setting up ffmpeg:', err);
            if (!res.headersSent) {
                res.status(500).send('Error setting up audio streaming').end();
            }
        }

    } catch (error) {
        console.error('Error in audio controller:', error);
        if (!res.headersSent) {
            res.status(500).send('Server error');
        }
    }
};
