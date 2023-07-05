import { writable } from 'svelte/store';

import type { Playlist } from '../models/type';

import { getAllPlaylist } from '../api';

const INITIAL_STATE: Playlist[] = [];

export const playlist = writable(INITIAL_STATE);
export const syncPlaylist = () => getAllPlaylist().then(({ data }) => playlist.set(data.allPlaylist));