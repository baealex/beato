import { writable } from 'svelte/store';
import { Artist } from '../models/type';

export const artists = writable<Artist[]>([]);