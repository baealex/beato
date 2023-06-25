import type { Controller } from '~/types';
import fs from 'fs';
import models from '~/models';

export const migrate: Controller = async (req, res) => {
    // all music file search and save to db
    const files = fs.readdirSync('D:/Music');
    const musics = files.map((file) => {
        const [artist, title] = file.split(' - ');
        return {
            artist,
            title,
            path: `D:/Music/${file}`,
        };
    });
};
