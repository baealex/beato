import { writable } from 'svelte/store';
import type { Music } from '../models/type';

export const musics = writable<Music[]>([]);