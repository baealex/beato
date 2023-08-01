import { derived, writable } from 'svelte/store';

import type { Music } from '../models/type';

import { getMusics } from '../api';

const INITIAL_STATE: Music[] = [];

export const musics = writable(INITIAL_STATE);
export const musicMap = derived(musics, ($musics) => {
    const map = new Map<string, Music>();
    $musics.forEach((music) => map.set(music.id, music));
    return map;
});
export const syncMusics = () => getMusics().then(({ data }) => musics.set(data.allMusics));