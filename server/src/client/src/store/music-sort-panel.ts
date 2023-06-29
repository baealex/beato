import { writable } from 'svelte/store';

export const musicSortPanel = writable<{
    isOpen: boolean;
    latestSort:
    | "nameAsc"
    | "nameDesc"
    | "artistAsc"
    | "artistDesc"
    | "albumAsc"
    | "albumDesc"
    | "createdAtAsc"
    | "createdAtDesc"
    | "playCountAsc"
    | "playCountDesc"
    | "durationAsc"
    | "durationDesc"
}>({
    isOpen: false,
    latestSort: 'playCountAsc'
});