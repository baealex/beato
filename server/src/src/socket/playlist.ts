import { Socket } from 'socket.io';

import models from '~/models';

import { connectors } from './connectors';

const PLAYLIST_CREATE = 'playlist-create';
const PLAYLIST_DELETE = 'playlist-delete';
const PLAYLIST_UPDATE = 'playlist-update';
const PLAYLIST_CHANGE_ORDER = 'playlist-change-order';
const PLAYLIST_ADD_MUSIC = 'playlist-add-music';
const PLAYLIST_REMOVE_MUSIC = 'playlist-remove-music';
const PLAYLIST_CHANGE_MUSIC_ORDER = 'playlist-change-music-order';

export const playlistListener = (socket: Socket) => {
    socket.on(PLAYLIST_CREATE, createPlaylist);
    socket.on(PLAYLIST_DELETE, deletePlaylist);
    socket.on(PLAYLIST_UPDATE, updatePlaylist);
    socket.on(PLAYLIST_CHANGE_ORDER, changePlaylistOrder);
    socket.on(PLAYLIST_ADD_MUSIC, addMusicToPlaylist);
    socket.on(PLAYLIST_REMOVE_MUSIC, removeMusicFromPlaylist);
    socket.on(PLAYLIST_CHANGE_MUSIC_ORDER, changePlaylistMusicOrder);
};

const createPlaylist = async ({ name = '', musics = [] }) => {
    if (!name) {
        return;
    }

    const playlist = await models.playlist.create({
        data: {
            name,
            PlaylistMusic: {
                create: musics.map((musicId, index) => ({
                    order: index,
                    musicId: Number(musicId),
                })),
            },
        },
    });

    connectors.broadcast(PLAYLIST_CREATE, {
        ...playlist,
        id: playlist.id.toString(),
        musicCount: musics.length,
        headerMusics: musics.slice(0, 4).map((musicId) => ({
            id: musicId.toString(),
        })),
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

const changePlaylistOrder = async ({ ids = [] }) => {
    if (!ids.length) {
        return;
    }

    const playlists = await models.playlist.findMany({
        where: {
            id: {
                in: ids.map((id) => Number(id)),
            },
        },
    });

    for (const playlist of playlists) {
        const order = ids.indexOf(playlist.id.toString());

        if (playlist.order === order) {
            continue;
        }

        await models.playlist.update({
            where: {
                id: playlist.id,
            },
            data: {
                order: order,
            },
        });
    }

    connectors.broadcast(PLAYLIST_CHANGE_ORDER, ids);
};

const changePlaylistMusicOrder = async ({ id = '', musicIds = [] }) => {
    if (!id || !musicIds.length) {
        return;
    }

    const playlistMusics = await models.playlistMusic.findMany({
        where: {
            playlistId: Number(id),
        },
        orderBy: {
            order: 'asc',
        },
    });

    for (const playlistMusic of playlistMusics) {
        const order = musicIds.indexOf(playlistMusic.musicId.toString());

        if (playlistMusic.order === order) {
            continue;
        }

        await models.playlistMusic.update({
            where: {
                id: playlistMusic.id,
            },
            data: {
                order: order,
            },
        });
    }

    connectors.broadcast(PLAYLIST_CHANGE_MUSIC_ORDER, {
        id,
        musicIds,
    });
};

const updatePlaylist = async ({
    id = '',
    name = '',
}) => {
    if (!id || !name) {
        return;
    }

    await models.playlist.update({
        where: {
            id: Number(id),
        },
        data: {
            name,
        },
    });
    connectors.broadcast(PLAYLIST_UPDATE, { id, name });
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
    const headerMusics = await models.playlistMusic.findMany({
        where: {
            playlistId: Number(id),
        },
        take: 4,
    });
    connectors.broadcast(PLAYLIST_ADD_MUSIC, {
        id,
        music: {
            id: musicId.toString()
        },
        headerMusics: headerMusics.map((music) => ({
            id: music.musicId.toString(),
        })),
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
    const headerMusics = await models.playlistMusic.findMany({
        where: {
            playlistId: Number(id),
        },
        take: 4,
    });
    connectors.broadcast(PLAYLIST_REMOVE_MUSIC, {
        id,
        musicIds,
        headerMusics: headerMusics.map((music) => ({
            id: music.musicId.toString(),
        })),
    });
};