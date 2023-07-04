import { writable } from 'svelte/store';
import type { Music } from '../models/type';
import { toast } from '../modules/ui/toast';

type QueueInsertMode = 'after' | 'before' | 'last';

interface Queue {
    items: Music[];
    selected: number | null;
    insertMode: QueueInsertMode;
}

const INITIAL_STATE: Queue = {
    items: [],
    selected: null,
    insertMode: 'last',
};

export const queue = writable<Queue>(INITIAL_STATE);

export const resetQueue = (musics: Music[] = []) => queue.update((state) => {
    toast("Created new queue");
    const newState = { ...state };
    newState.items = musics;
    newState.selected = musics.length > 0 ? 0 : null;
    return newState;
});

export const insertToQueue = (music: Music) => queue.update((state) => {
    let newState = { ...state };
    if (state.items.length === 0 && state.selected === null) {
        newState.selected = 0;
    }
    if (state.items.find((item) => item.id === music.id)) {
        toast("Already added to queue");
        return newState;
    }
    if (state.insertMode === 'last') {
        newState.items = [...state.items, music];
        toast("Added to queue");
        return newState;
    }
    if (state.selected === null) {
        return newState;
    }
    const index = state.items.findIndex((item) => item.id === state.selected.toString());
    if (state.insertMode === 'after') {
        newState.items = [...state.items.slice(0, index + 1), music, ...state.items.slice(index + 1)];
    }
    if (state.insertMode === 'before') {
        newState.items = [...state.items.slice(0, index), music, ...state.items.slice(index)];
    }
    toast("Added to queue");
    return newState;
});