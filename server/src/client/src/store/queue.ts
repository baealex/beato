import { writable, get } from 'svelte/store';
import { confirm, toast } from '@baejino/ui';

import type { Music } from '../models/type';

import { getFormattedDate } from '../modules/time';

import { queueHistory } from './queue-history';
import { shuffle } from '../modules/shuffle';

export type QueuePlayMode = 'immediate' | 'later';
export type QueueRepeatMode = 'all' | 'one' | 'off';
export type QueueInsertMode = 'after' | 'before' | 'last';

interface Queue {
    title: string;
    items: Pick<Music, 'id'>[];
    sourceItems: Pick<Music, 'id'>[];
    selected: number | null;
    shuffle: boolean;
    playMode: QueuePlayMode;
    repeatMode: QueueRepeatMode;
    insertMode: QueueInsertMode;
}

const INITIAL_STATE: Queue = {
    title: '',
    items: [],
    sourceItems: [],
    selected: null,
    shuffle: false,
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

export const existQueue = () => get(queue).items.length > 0;

export const shuffleQueue = () => queue.update((state) => {
    let newState = { ...state };

    newState.shuffle = !state.shuffle;

    if (newState.shuffle) {
        newState.sourceItems = [...state.items];
        newState.items = shuffle([...state.items].filter((item) =>
            item.id !== state.items[state.selected].id),
        );
        newState.items.unshift(state.items[state.selected]);
        newState.selected = 0;
    } else {
        newState.selected = state.sourceItems.findIndex((item) =>
            item.id === state.items[state.selected].id
        );
        newState.items = [...state.sourceItems];
        newState.sourceItems = [];
    }
    return newState;
});

export const resetQueue = async (title: string = '', musics: Pick<Music, 'id'>[] = []) => {
    if (
        existQueue() &&
        musics.length > 0 &&
        !(await confirm("The queue will be replaced with this."))
    ) {
        return;
    }

    queue.update((state) => {
        queueHistory.update((history) => {
            if (state.items.length === 0) {
                return history;
            }
            return [{
                title: state.title,
                items: state.items,
            }, ...history].slice(0, 20);
        });
        const newState = { ...state };
        newState.title = title;
        newState.items = musics;
        newState.sourceItems = [];
        newState.shuffle = false;
        newState.selected = musics.length > 0 ? 0 : null;
        return newState;
    });
}

export const insertToQueue = (music: Pick<Music, 'id'>) => queue.update((state) => {
    let newState = { ...state };

    // 아무것도 없을 때
    if (state.items.length === 0) {
        newState.title = 'Create at ' + getFormattedDate(new Date())
        newState.selected = 0;
        newState.items = [music];
        if (newState.shuffle) {
            newState.sourceItems = [music];
        }
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
        if (newState.shuffle) {
            newState.sourceItems = [...state.sourceItems, music];
        }
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
        if (newState.shuffle) {
            const before = state.sourceItems.slice(0, state.selected + 1);
            const after = state.sourceItems.slice(state.selected + 1);
            newState.sourceItems = [...before, music, ...after];
        }
    }
    if (state.insertMode === 'before') {
        const before = state.items.slice(0, state.selected);
        const after = state.items.slice(state.selected);
        newState.selected = state.selected + 1;
        newState.items = [...before, music, ...after];
        if (newState.shuffle) {
            const before = state.sourceItems.slice(0, state.selected);
            const after = state.sourceItems.slice(state.selected);
            newState.sourceItems = [...before, music, ...after];
        }
    }
    if (state.playMode === 'immediate') {
        newState.selected = newState.items.findIndex((item) => item.id === music.id);
    } else {
        toast("Added to queue");
    }
    return newState;
});