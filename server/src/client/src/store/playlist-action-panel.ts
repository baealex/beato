import { writable } from 'svelte/store';
import type { Playlist } from '../models/type';

export const playlistActionPanel = writable<{
    isOpen: boolean;
    playlist: Playlist | null;
}>({
    isOpen: false,
    playlist: null
});
