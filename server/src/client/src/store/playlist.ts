import { writable } from 'svelte/store';
import { toast } from '@baejino/ui';

import type { Playlist, Music } from '../models/type';

import { getPlaylists } from '../api';
import * as socketManager from '../socket';

const INITIAL_STATE: Playlist[] = [];

export const playlists = writable(INITIAL_STATE);
export const insertToPlaylist = async (playlist: Playlist, music: Music) => {
    socketManager.socket.emit(socketManager.PLAYLIST_ADD_MUSIC, {
        id: playlist.id,
        musicId: music.id,
    });
    toast('Added to playlist');
}
export const syncPlaylists = () => getPlaylists().then(({ data }) => playlists.set(data.allPlaylist));