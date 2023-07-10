import { Socket } from 'socket.io';

import models from '~/models';

import { connectors } from './connectors';

const PLAYLIST_CREATE = 'playlist-create';
const PLAYLIST_DELETE = 'playlist-delete';
const PLAYLIST_UPDATE = 'playlist-update';
const PLAYLIST_ADD_MUSIC = 'playlist-add-music';
const PLAYLIST_REMOVE_MUSIC = 'playlist-remove-music';

export const playlistListener = (socket: Socket) => {
    socket.on(PLAYLIST_CREATE, createPlaylist);
    socket.on(PLAYLIST_DELETE, deletePlaylist);
    socket.on(PLAYLIST_UPDATE, updatePlaylist);
    socket.on(PLAYLIST_ADD_MUSIC, addMusicToPlaylist);
    socket.on(PLAYLIST_REMOVE_MUSIC, removeMusicFromPlaylist);
};

const createPlaylist = async ({ name = '' }) => {
    if (!name) {
        return;
    }

    const playist = await models.playlist.create({
        data: {
            name,
        },
    });
    connectors.broadcast(PLAYLIST_CREATE, {
        ...playist,
        musicCount: 0,
        headerMusics: [],
    });
};

const deletePlaylist = async ({ id = '' }) => {
    try {
        await models.playlistMusic.deleteMany({
            where: {
                playlistId: Number(id),
            },
        });
        await models.playlist.delete({
            where: {
                id: Number(id),
            },
        });
        connectors.broadcast(PLAYLIST_DELETE, id);
    } catch (e) {
        console.error(e);
    }
};

const updatePlaylist = async ({
    id = '',
    name = '',
}) => {
    if (!id || !name) {
        return;
    }

    const playlist = await models.playlist.update({
        where: {
            id: Number(id),
        },
        data: {
            name,
        },
    });
    connectors.broadcast(PLAYLIST_UPDATE, playlist);
};

const addMusicToPlaylist = async ({
    id = '',
    musicId = '',
}) => {
    if (!id || !musicId) {
        return;
    }

    if (await models.playlistMusic.findFirst({
        where: {
            playlistId: Number(id),
            musicId: Number(musicId),
        },
    })) {
        return;
    }

    const lastOrder = await models.playlistMusic.findFirst({
        where: {
            playlistId: Number(id),
        },
        orderBy: {
            order: 'desc',
        },
    });
    await models.playlistMusic.create({
        data: {
            order: lastOrder ? lastOrder.order + 1 : 0,
            playlistId: Number(id),
            musicId: Number(musicId),
        },
    });
    const album = await models.album.findFirst({
        where: {
            Music: {
                some: {
                    id: Number(musicId),
                },
            },
        },
    });
    connectors.broadcast(PLAYLIST_ADD_MUSIC, {
        id,
        music: {
            id: musicId.toString(),
            album: {
                cover: album?.cover,
            }
        }
    });
};

const removeMusicFromPlaylist = async ({
    id = '',
    musicIds = [],
}) => {
    if (!id || !musicIds.length) {
        return;
    }
    await models.playlistMusic.deleteMany({
        where: {
            playlistId: Number(id),
            musicId: {
                in: musicIds.map((musicId) => Number(musicId)),
            },
        },
    });
    connectors.broadcast(PLAYLIST_REMOVE_MUSIC, {
        id,
        musicIds,
    });
};