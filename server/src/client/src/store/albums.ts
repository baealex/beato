import { writable } from 'svelte/store';
import { Album } from '../models/type';

export const albums = writable<Album[]>([]);