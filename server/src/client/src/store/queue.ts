import { writable } from 'svelte/store';
import type { Music } from '../models/type';

interface Queue {
    selected: number | null;
    items: Music[];
}

const INITIAL_STATE: Queue = {
    selected: null,
    items: []
};

export const queue = writable<Queue>(INITIAL_STATE);
export const resetQueue = () => queue.set(INITIAL_STATE);