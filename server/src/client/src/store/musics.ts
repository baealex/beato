import { writable } from 'svelte/store';

import type { Music } from '../models/type';

import { getMusics } from '../api';

const INITIAL_STATE: Music[] = [];

export const musics = writable(INITIAL_STATE);
export const syncMusics = () => getMusics().then(({ data }) => musics.set(data.allMusics));