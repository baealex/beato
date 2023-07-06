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
    console.log(playlist)
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
            if (item.id === playlist.id) {
                return playlist;
            }
            return item;
        });
    });
}

interface AddMusicToPlaylist {
    id: string;
    music: Music;
}

export const addMusicToPlaylist = async ({ id, music }: AddMusicToPlaylist) => {
    playlists.update((state) => {
        return state.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    musicCount: item.musicCount + 1,
                    headerMusics: [...item.headerMusics, music],
                };
            }
            return item;
        });
    });
}

interface RemoveMusicFromPlaylist {
    id: string;
    musicId: string;
}

export const removeMusicFromPlaylist = async ({ id, musicId }: RemoveMusicFromPlaylist) => {
    playlists.update((state) => {
        return state.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    headerMusics: item.musics.filter((music) => music.id !== musicId),
                };
            }
            return item;
        });
    });
}