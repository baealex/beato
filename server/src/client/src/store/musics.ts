import { writable } from 'svelte/store';
import { Music } from '../models/type';

export const musics = writable<Music[]>([]);