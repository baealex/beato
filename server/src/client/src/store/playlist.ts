import { writable } from 'svelte/store';

import type { Playlist, Music } from '../models/type';

import { getPlaylists, addMusicToPlaylist } from '../api';
import { toast } from '../modules/ui/toast';

const INITIAL_STATE: Playlist[] = [];

export const playlists = writable(INITIAL_STATE);
export const insertToPlaylist = async (playlist: Playlist, music: Music) => {
    try {
        const { data } = await addMusicToPlaylist(playlist.id, music.id);
        if (!data.addMusicToPlaylist) {
            toast("Already added to playlist");
            return;
        }
        playlists.update((state) => {
            return state.map((item) => {
                if (item.id === playlist.id) {
                    return {
                        ...item,
                        headerMusics: [
                            ...item.headerMusics,
                            music,
                        ],
                        musicCount: item.musicCount + 1,
                    }
                }
                return item;
            });
        });
        toast("Added to playlist");
    } catch (e) {
        console.error(e);
        toast("Failed to add to playlist");
    }
}
export const syncPlaylists = () => getPlaylists().then(({ data }) => playlists.set(data.allPlaylist));