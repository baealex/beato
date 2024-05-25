import type { Socket } from 'socket.io';

import models from '~/models';

import { connectors } from './connectors';

export const MUSIC_LIKE = 'music-like';
export const MUSIC_HATE = 'music-hate';
export const MUSIC_COUNT = 'music-count';

export const musicListener = (socket: Socket) => {
    socket.on(MUSIC_LIKE, like);
    socket.on(MUSIC_HATE, hate);
    socket.on(MUSIC_COUNT, count);
};

export const like = async ({ id = '' }) => {
    if (!id) {
        return;
    }

    let isLiked = false;
    const $music = await models.music.findUnique({
        where: {
            id: parseInt(id),
        },
    });

    if ($music) {
        const $like = await models.musicLike.findFirst({
            where: {
                musicId: $music.id,
            },
        });

        if ($like) {
            isLiked = false;
            await models.musicLike.delete({
                where: {
                    id: $like.id,
                },
            });
        } else {
            isLiked = true;
            await models.musicLike.create({
                data: {
                    musicId: $music.id,
                },
            });
        }

        console.log('like update', $music.name, isLiked);
        connectors.broadcast(MUSIC_LIKE, {
            id: $music.id.toString(),
            isLiked,
        });
    }
};

export const hate = async ({ id = '' }) => {
    if (!id) {
        return;
    }

    let isHated = false;
    const $music = await models.music.findUnique({
        where: {
            id: parseInt(id),
        },
    });

    if ($music) {
        const $hate = await models.musicHate.findFirst({
            where: {
                musicId: $music.id,
            },
        });

        if ($hate) {
            isHated = false;
            await models.musicHate.delete({
                where: {
                    id: $hate.id,
                },
            });
        } else {
            isHated = true;
            await models.musicHate.create({
                data: {
                    musicId: $music.id,
                },
            });
        }

        console.log('hate update', $music.name, isHated);
        connectors.broadcast(MUSIC_HATE, {
            id: $music.id.toString(),
            isHated,
        });
    }
};

export const count = async ({ id = '' }) => {
    if (!id) {
        return;
    }

    const $music = await models.music.findUnique({
        where: {
            id: parseInt(id),
        },
    });

    if ($music) {
        console.log('count update', $music.name, $music.playCount + 1);
        await models.music.update({
            where: {
                id: parseInt(id),
            },
            data: {
                playCount: $music.playCount + 1,
            },
        });
        connectors.broadcast(MUSIC_COUNT, {
            id: $music.id.toString(),
            playCount: $music.playCount + 1,
        });
    }
};
