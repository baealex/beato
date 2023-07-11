import { writable } from 'svelte/store';
import type { Music } from '../models/type';

export const musicActionPanel = writable<{
    isOpen: boolean;
    music: Music | null;
    onPageMove: (() => void) | null;
}>({
    isOpen: false,
    music: null,
    onPageMove: null,
});