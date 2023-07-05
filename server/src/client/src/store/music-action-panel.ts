import { writable } from 'svelte/store';
import type { Music } from '../models/type';

export const musicActionPanel = writable<{
    isOpen: boolean;
    music: Music | null;
}>({
    isOpen: false,
    music: null
});