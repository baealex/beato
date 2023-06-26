import { writable } from 'svelte/store';
import { Music } from '../models/type';

interface Playlist {
    selected: number | null;
    items: Music[];
}

const INITIAL_STATE: Playlist = {
    selected: null,
    items: []
};

export const playlist = writable<Playlist>(INITIAL_STATE);

const playlistFromStorage = localStorage.getItem('playlist');

playlist.set(
    playlistFromStorage
        ? JSON.parse(playlistFromStorage)
        : INITIAL_STATE);

playlist.subscribe((value) => {
    localStorage.setItem('playlist', JSON.stringify(value));
});