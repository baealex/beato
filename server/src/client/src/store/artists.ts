import { writable } from 'svelte/store';

import type { Artist } from '../models/type';

import { getArtists } from '../api';

const INITIAL_STATE: Artist[] = [];

export const artists = writable(INITIAL_STATE);
export const syncArtists = () => getArtists().then(({ data }) => artists.set(data.allArtists));