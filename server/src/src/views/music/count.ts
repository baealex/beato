import models from '~/models';

import type { Controller } from '~/types';

import { MUSIC_COUNT } from '~/socket/music';
import { connectors } from '~/socket/connectors';

export const count: Controller = async (req, res) => {
    const { id } = req.params;

    const $music = await models.music.findUnique({
        where: {
            id: Number(id),
        },
    });

    if (!$music) {
        res.status(404).end();
        return;
    }

    await models.music.update({
        where: {
            id: Number(id),
        },
        data: {
            playCount: $music.playCount + 1,
        },
    });

    connectors.broadcast(MUSIC_COUNT, {
        id: $music.id.toString(),
        playCount: $music.playCount + 1,
    });

    res.status(200).end();
};
