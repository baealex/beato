import type { Socket } from 'socket.io';

import models from '~/models';

import { connectors } from './connectors';

const PLAYLIST_CREATE = 'playlist-create';
const PLAYLIST_DELETE = 'playlist-delete';
const PLAYLIST_UPDATE = 'playlist-update';
const PLAYLIST_CHANGE_ORDER = 'playlist-change-order';
const PLAYLIST_ADD_MUSIC = 'playlist-add-music';
const PLAYLIST_MOVE_MUSIC = 'playlist-move-music';
const PLAYLIST_REMOVE_MUSIC = 'playlist-remove-music';
const PLAYLIST_CHANGE_MUSIC_ORDER = 'playlist-change-music-order';

export const playlistListener = (socket: Socket) => {
    socket.on(PLAYLIST_CREATE, createPlaylist);
    socket.on(PLAYLIST_DELETE, deletePlaylist);
    socket.on(PLAYLIST_UPDATE, updatePlaylist);
    socket.on(PLAYLIST_CHANGE_ORDER, changePlaylistOrder);
    socket.on(PLAYLIST_ADD_MUSIC, addMusicToPlaylist);
    socket.on(PLAYLIST_MOVE_MUSIC, moveMusicToPlaylist);
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
                    musicId: Number(musicId)
                }))
            }
        }
    });

    connectors.broadcast(PLAYLIST_CREATE, {
        ...playlist,
        id: playlist.id.toString(),
        musicCount: musics.length,
        headerMusics: musics.slice(0, 4).map((musicId) => ({ id: musicId.toString() }))
    });
};

const deletePlaylist = async ({ id = '' }) => {
    try {
        await models.playlistMusic.deleteMany({ where: { playlistId: Number(id) } });
        await models.playlist.delete({ where: { id: Number(id) } });
        connectors.broadcast(PLAYLIST_DELETE, id);
    } catch (e) {
        console.error(e);
    }
};

const changePlaylistMusicOrder = async ({ id = '', musicIds = [] }) => {
    if (!id || !musicIds.length) {
        return;
    }

    const playlistMusics = await models.playlistMusic.findMany({
        where: { playlistId: Number(id) },
        orderBy: { order: 'asc' }
    });

    for (const playlistMusic of playlistMusics) {
        const order = musicIds.indexOf(playlistMusic.musicId.toString());

        if (playlistMusic.order === order) {
            continue;
        }

        await models.playlistMusic.update({
            where: { id: playlistMusic.id },
            data: { order: order }
        });
    }

    const headerMusics = await models.playlistMusic.findMany({
        where: { playlistId: Number(id) },
        take: 4,
        orderBy: { order: 'asc' }
    });

    connectors.broadcast(PLAYLIST_CHANGE_MUSIC_ORDER, {
        id,
        musicIds,
        headerMusics: headerMusics.map((music) => ({ id: music.musicId.toString() }))
    });
};

const updatePlaylist = async ({
    id = '',
    name = ''
}) => {
    if (!id || !name) {
        return;
    }

    await models.playlist.update({
        where: { id: Number(id) },
        data: { name }
    });
    connectors.broadcast(PLAYLIST_UPDATE, {
        id,
        name
    });
};

const addMusicToPlaylist = async ({
    id = '',
    musicIds = []
}) => {
    if (!id || !musicIds.length) {
        return;
    }

    const lastOrder = await models.playlistMusic.findFirst({
        where: { playlistId: Number(id) },
        orderBy: { order: 'desc' }
    });

    for (const [index, musicId] of musicIds.entries()) {
        if (await models.playlistMusic.findFirst({
            where: {
                playlistId: Number(id),
                musicId: Number(musicId)
            }
        })) {
            continue;
        }
        await models.playlistMusic.create({
            data: {
                order: lastOrder ? lastOrder.order + index + 1 : index,
                playlistId: Number(id),
                musicId: Number(musicId)
            }
        });
    }

    const musicCount = await models.playlistMusic.count({ where: { playlistId: Number(id) } });

    const headerMusics = await models.playlistMusic.findMany({
        where: { playlistId: Number(id) },
        take: 4,
        orderBy: { order: 'asc' }
    });

    connectors.broadcast(PLAYLIST_ADD_MUSIC, {
        id,
        musicCount,
        headerMusics: headerMusics.map((music) => ({ id: music.musicId.toString() })),
        musicIds
    });
};

const moveMusicToPlaylist = async ({
    toId = '',
    fromId = '',
    musicIds = []
}) => {
    if (!toId || !fromId || !musicIds.length) {
        return;
    }

    await models.playlistMusic.deleteMany({
        where: {
            playlistId: Number(fromId),
            musicId: { in: musicIds.map((musicId) => Number(musicId)) }
        }
    });

    const lastOrder = await models.playlistMusic.findFirst({
        where: { playlistId: Number(toId) },
        orderBy: { order: 'desc' }
    });

    for (const [index, musicId] of musicIds.entries()) {
        if (await models.playlistMusic.findFirst({
            where: {
                playlistId: Number(toId),
                musicId: Number(musicId)
            }
        })) {
            continue;
        }
        await models.playlistMusic.create({
            data: {
                order: lastOrder ? lastOrder.order + index + 1 : index,
                playlistId: Number(toId),
                musicId: Number(musicId)
            }
        });
    }

    const fromHeaderMusics = await models.playlistMusic.findMany({
        where: { playlistId: Number(fromId) },
        take: 4,
        orderBy: { order: 'asc' }
    });

    const toMusicCount = await models.playlistMusic.count({ where: { playlistId: Number(toId) } });

    const toHeaderMusics = await models.playlistMusic.findMany({
        where: { playlistId: Number(toId) },
        take: 4,
        orderBy: { order: 'asc' }
    });

    connectors.broadcast(PLAYLIST_MOVE_MUSIC, {
        fromId,
        formHeaderMusics: fromHeaderMusics.map((music) => ({ id: music.musicId.toString() })),
        toId,
        toMusicCount,
        toHeaderMusics: toHeaderMusics.map((music) => ({ id: music.musicId.toString() })),
        musicIds
    });
};

const removeMusicFromPlaylist = async ({
    id = '',
    musicIds = []
}) => {
    if (!id || !musicIds.length) {
        return;
    }
    await models.playlistMusic.deleteMany({
        where: {
            playlistId: Number(id),
            musicId: { in: musicIds.map((musicId) => Number(musicId)) }
        }
    });
    const headerMusics = await models.playlistMusic.findMany({
        where: { playlistId: Number(id) },
        take: 4,
        orderBy: { order: 'asc' }
    });
    connectors.broadcast(PLAYLIST_REMOVE_MUSIC, {
        id,
        musicIds,
        headerMusics: headerMusics.map((music) => ({ id: music.musicId.toString() }))
    });
};

const changePlaylistOrder = async ({ ids = [] }) => {
    if (!ids.length) {
        return;
    }

    const playlists = await models.playlist.findMany({ where: { id: { in: ids.map((id) => Number(id)) } } });

    for (const playlist of playlists) {
        const order = ids.indexOf(playlist.id.toString());

        if (playlist.order === order) {
            continue;
        }

        await models.playlist.update({
            where: { id: playlist.id },
            data: { order: order }
        });
    }

    connectors.broadcast(PLAYLIST_CHANGE_ORDER, ids);
};
