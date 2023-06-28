import { writable } from 'svelte/store';
import type { Album } from '../models/type';

export const albums = writable<Album[]>([]);