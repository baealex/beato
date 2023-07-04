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

    const stream = fs.createReadStream(path.resolve('./music', $music.filePath));

    stream.on('data', (chunk) => {
        res.write(chunk);
    });

    stream.on('error', (err) => {
        console.error(err);
        res.status(500).end();
    });

    stream.on('end', () => {
        res.end();
    });
};
