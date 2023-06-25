import { writable } from 'svelte/store';
import { Music } from '../models/type';

export const playlist = writable<{
    selected: number | null,
    items: Music[]
}>({
    selected: null,
    items: []
});