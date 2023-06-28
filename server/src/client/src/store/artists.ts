import { writable } from 'svelte/store';
import type { Artist } from '../models/type';

export const artists = writable<Artist[]>([]);