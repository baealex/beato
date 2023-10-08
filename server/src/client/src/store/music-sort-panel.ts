import { writable } from 'svelte/store';

type LatestSort =
    | 'nameAsc'
    | 'nameDesc'
    | 'artistAsc'
    | 'artistDesc'
    | 'albumAsc'
    | 'albumDesc'
    | 'createdAtAsc'
    | 'createdAtDesc'
    | 'playCountAsc'
    | 'playCountDesc'
    | 'durationAsc'
    | 'durationDesc'
    | 'random';

export const musicSortPanel = writable<{
    isOpen: boolean;
    latestSort: LatestSort;
}>({
    isOpen: false,
    latestSort: 'playCountDesc'
});