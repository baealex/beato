import fs from 'fs';
import path from 'path';

import models from '~/models';

import type { Controller } from '~/types';

export const audio: Controller = async (req, res) => {
    const { id } = req.params;

    const $music = await models.music.findUnique({
        where: {
            id: Number(id),
        },
    });

    if (!fs.existsSync(path.resolve('./music', $music.filePath))) {
        res.status(404).send('Not Found').end();
    }

    if ($music.filePath.split('.').pop() === 'mp3') {
        res.setHeader('Content-Type', 'audio/mpeg');
    } else if ($music.filePath.split('.').pop() === 'flac') {
        res.setHeader('Content-Type', 'audio/flac');
    } else if ($music.filePath.split('.').pop() === 'aac') {
        res.setHeader('Content-Type', 'audio/aac');
    } else if ($music.filePath.split('.').pop() === 'ogg') {
        res.setHeader('Content-Type', 'audio/ogg');
    } else if ($music.filePath.split('.').pop() === 'wav') {
        res.setHeader('Content-Type', 'audio/wav');
    }

    const { size } = fs.statSync(path.resolve('./music', $music.filePath));

    res.setHeader('Content-Length', size);
    res.setHeader('Accept-Ranges', 'bytes');
    res.setHeader('Cache-Control', 'max-age=604800');

    fs.createReadStream(path.resolve('./music', $music.filePath)).pipe(res);
};
