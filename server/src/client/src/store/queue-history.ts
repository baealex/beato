import { writable } from 'svelte/store';
import type { Music } from '../models/type';

interface QueueHistory {
    title: string;
    items: Music[];
}

const INITIAL_STATE = [];

const LOCAL_STORAGE_KEY = 'queue-history';

const loadQueueHistory = () => {
    const queue = localStorage.getItem(LOCAL_STORAGE_KEY);
    return queue ? JSON.parse(queue) : INITIAL_STATE;
};

export const queueHistory = writable<QueueHistory[]>(loadQueueHistory());

queueHistory.subscribe((value) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value));
});
