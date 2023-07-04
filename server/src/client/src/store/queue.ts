import { writable } from 'svelte/store';
import type { Music } from '../models/type';
import { toast } from '../modules/ui/toast';

export type QueuePlayMode = 'immediate' | 'later';
export type QueueRepeatMode = 'all' | 'one' | 'off';
export type QueueInsertMode = 'after' | 'before' | 'last';

interface Queue {
    items: Music[];
    selected: number | null;
    playMode: QueuePlayMode;
    repeatMode: QueueRepeatMode;
    insertMode: QueueInsertMode;
}

const INITIAL_STATE: Queue = {
    items: [],
    selected: null,
    playMode: 'later',
    repeatMode: 'off',
    insertMode: 'last',
};

export const queue = writable<Queue>(INITIAL_STATE);

export const switchRepeatMode = () => queue.update((state) => {
    let newState = { ...state };
    if (state.repeatMode === 'all') {
        newState.repeatMode = 'one';
        toast("Repeat one");
    } else if (state.repeatMode === 'one') {
        newState.repeatMode = 'off';
        toast("Repeat off");
    } else {
        newState.repeatMode = 'all';
        toast("Repeat all");
    }
    return newState;
});

export const resetQueue = (musics: Music[] = []) => queue.update((state) => {
    toast("Created new queue");
    const newState = { ...state };
    newState.items = musics;
    newState.selected = musics.length > 0 ? 0 : null;
    return newState;
});

export const insertToQueue = (music: Music) => queue.update((state) => {
    let newState = { ...state };

    // 추가할 때 선택된 것이 없을 때
    if (state.items.length === 0 && state.selected === null) {
        newState.selected = 0;
    }

    // 이미 있을 때
    if (state.items.find((item) => item.id === music.id)) {
        state.playMode === 'immediate'
            ? newState.selected = state.items.findIndex((item) => item.id === music.id)
            : toast("Already added to queue")
        return newState;
    }

    // 마지막에 추가할 때
    if (state.insertMode === 'last') {
        newState.items = [...state.items, music];
        if (state.playMode === 'immediate') {
            newState.selected = newState.items.findIndex((item) => item.id === music.id);
        } else {
            toast("Added to queue");
        }
        return newState;
    }
    if (state.selected === null) {
        return newState;
    }

    // 중간에 추가할 때
    const index = state.items.findIndex((item) => item.id === state.selected.toString());
    if (state.insertMode === 'after') {
        newState.items = [...state.items.slice(0, index + 1), music, ...state.items.slice(index + 1)];
    }
    if (state.insertMode === 'before') {
        newState.items = [...state.items.slice(0, index), music, ...state.items.slice(index)];
    }
    if (state.playMode === 'immediate') {
        newState.selected = newState.items.findIndex((item) => item.id === music.id);
    } else {
        toast("Added to queue");
    }
    return newState;
});