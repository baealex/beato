import { writable } from 'svelte/store';
import type { Album } from '../models/type';
import { getAlbums } from '../api';

const INITIAL_STATE: Album[] = [];

export const albums = writable(INITIAL_STATE);
export const syncAlbums = () => getAlbums().then(({ data }) => albums.set(data.allAlbums));