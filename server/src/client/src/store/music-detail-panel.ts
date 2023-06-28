import { writable } from 'svelte/store';
import type { Music } from '../models/type';

export const musicDetailPanel = writable<{
    isOpen: boolean;
    music: Music;
}>({
    isOpen: false,
    music: null
});