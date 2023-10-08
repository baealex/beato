import { writable } from 'svelte/store';

type LatestSort =
    | 'nameAsc'
    | 'nameDesc'
    | 'createdAtAsc'
    | 'createdAtDesc'
    | 'albumCountAsc'
    | 'albumCountDesc'
    | 'songCountAsc'
    | 'songCountDesc'
    | 'random';

export const artistSortPanel = writable<{
    isOpen: boolean;
    latestSort: LatestSort;
}>({
    isOpen: false,
    latestSort: 'songCountDesc'
});