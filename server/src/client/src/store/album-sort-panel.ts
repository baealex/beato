import { writable } from 'svelte/store';

type LatestSort =
    | "nameAsc"
    | "nameDesc"
    | "artistAsc"
    | "artistDesc"
    | "createdAtAsc"
    | "createdAtDesc"
    | "publishedYearAsc"
    | "publishedYearDesc"
    | "random";

export const albumSortPanel = writable<{
    isOpen: boolean;
    latestSort: LatestSort;
}>({
    isOpen: false,
    latestSort: 'nameAsc'
});