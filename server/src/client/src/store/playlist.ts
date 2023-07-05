import { writable } from 'svelte/store';

import type { Playlist } from '../models/type';

import { getPlaylists } from '../api';

const INITIAL_STATE: Playlist[] = [];

export const playlists = writable(INITIAL_STATE);
export const syncPlaylists = () => getPlaylists().then(({ data }) => playlists.set(data.allPlaylist));