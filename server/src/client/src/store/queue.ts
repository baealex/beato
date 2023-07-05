import { writable } from 'svelte/store';
import type { Music } from '../models/type';
import { getFormattedDate } from '../modules/time';
import { toast } from '../modules/ui/toast';

import { queueHistory } from './queue-history';

export type QueuePlayMode = 'immediate' | 'later';
export type QueueRepeatMode = 'all' | 'one' | 'off';
export type QueueInsertMode = 'after' | 'before' | 'last';

interface Queue {
    title: string;
    items: Music[];
    selected: number | null;
    playMode: QueuePlayMode;
    repeatMode: QueueRepeatMode;
    insertMode: QueueInsertMode;
}

const INITIAL_STATE: Queue = {
    title: '',
    items: [],
    selected: null,
    playMode: 'later',
    repeatMode: 'off',
    insertMode: 'last',
};

const LOCAL_STORAGE_KEY = 'queue';

const loadQueue = () => {
    const queue = localStorage.getItem(LOCAL_STORAGE_KEY);
    return queue ? JSON.parse(queue) : INITIAL_STATE;
};

export const queue = writable<Queue>(loadQueue());

queue.subscribe((value) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({
        ...value,
        title: '',
        items: [],
        selected: null,
    }));
});

export const switchRepeatMode = () => queue.update((state) => {
    let newState = { ...state };
    if (state.repeatMode === 'all') {
        newState.repeatMode = 'one';
    } else if (state.repeatMode === 'one') {
        newState.repeatMode = 'off';
    } else {
        newState.repeatMode = 'all';
    }
    return newState;
});

export const resetQueue = (title: string = '', musics: Music[] = []) => queue.update((state) => {
    toast("Created new queue");
    queueHistory.update((history) => {
        if (state.items.length === 0) {
            return history;
        }
        if (history.find((item) =>
            item.title === state.title &&
            item.items.every((music, index) => music.id === state.items[index].id))
        ) {
            return history;
        }
        const newHistory = [...history];
        newHistory.unshift({
            title: state.title,
            items: state.items,
        });
        return newHistory.slice(0, 20);
    });
    const newState = { ...state };
    newState.title = title;
    newState.items = musics;
    newState.selected = musics.length > 0 ? 0 : null;
    return newState;
});

export const insertToQueue = (music: Music) => queue.update((state) => {
    let newState = { ...state };

    // 아무것도 없을 때
    if (state.items.length === 0) {
        newState.title = getFormattedDate(new Date())
        newState.selected = 0;
        newState.items = [music];
        return newState;
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
    if (state.insertMode === 'after') {
        const before = state.items.slice(0, state.selected + 1);
        const after = state.items.slice(state.selected + 1);
        newState.items = [...before, music, ...after];
    }
    if (state.insertMode === 'before') {
        const before = state.items.slice(0, state.selected);
        const after = state.items.slice(state.selected);
        newState.selected = state.selected + 1;
        newState.items = [...before, music, ...after];
    }
    if (state.playMode === 'immediate') {
        newState.selected = newState.items.findIndex((item) => item.id === music.id);
    } else {
        toast("Added to queue");
    }
    return newState;
});