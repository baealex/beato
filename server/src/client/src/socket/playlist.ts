import { socket } from './socket';

import type { Music, Playlist } from '../models/type';

import { playlists, playlistActionPanel } from '../store';

export const PLAYLIST_CREATE = 'playlist-create';
export const PLAYLIST_DELETE = 'playlist-delete';
export const PLAYLIST_UPDATE = 'playlist-update';
export const PLAYLIST_ADD_MUSIC = 'playlist-add-music';
export const PLAYLIST_REMOVE_MUSIC = 'playlist-remove-music';

export const playlistListener = () => {
    socket.on(PLAYLIST_CREATE, createPlaylist);
    socket.on(PLAYLIST_DELETE, deletePlaylist);
    socket.on(PLAYLIST_UPDATE, updatePlaylist);
    socket.on(PLAYLIST_ADD_MUSIC, addMusicToPlaylist);
    socket.on(PLAYLIST_REMOVE_MUSIC, removeMusicFromPlaylist);
}

export const playlistDisconnection = () => {
    socket.off(PLAYLIST_CREATE);
    socket.off(PLAYLIST_DELETE);
    socket.off(PLAYLIST_UPDATE);
    socket.off(PLAYLIST_ADD_MUSIC);
    socket.off(PLAYLIST_REMOVE_MUSIC);
}

export const createPlaylist = async (playlist: Playlist) => {
    playlists.update((state) => {
        return [playlist, ...state];
    });
};

export const deletePlaylist = async (id: string) => {
    playlistActionPanel.update((state) => {
        if (state.playlist?.id === id) {
            return {
                ...state,
                playlist: null,
            };
        }
        return state;
    });
    playlists.update((state) => {
        return state.filter((playlist) => playlist.id !== id);
    });
}

export const updatePlaylist = async (playlist: Playlist) => {
    playlists.update((state) => {
        return state.map((item) => {
            if (item.id === playlist.id.toString()) {
                return {
                    ...item,
                    name: playlist.name,
                    updatedAt: playlist.updatedAt,
                };
            }
            return item;
        });
    });
}

interface AddMusicToPlaylist {
    id: string;
    music: Pick<Music, 'id'>;
    headerMusics: Pick<Music, 'id'>[];
}

export const addMusicToPlaylist = async ({ id, headerMusics }: AddMusicToPlaylist) => {
    playlists.update((state) => {
        return state.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    headerMusics,
                    musicCount: item.musicCount + 1,
                };
            }
            return item;
        });
    });
}

interface RemoveMusicFromPlaylist {
    id: string;
    musicIds: string[];
    headerMusics: Pick<Music, 'id'>[];
}

export const removeMusicFromPlaylist = async ({ id, musicIds, headerMusics }: RemoveMusicFromPlaylist) => {
    playlists.update((state) => {
        return state.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    headerMusics,
                    musicCount: item.musicCount - musicIds.length,
                };
            }
            return item;
        });
    });
}