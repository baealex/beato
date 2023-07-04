import { writable, get } from 'svelte/store';

export const useGradualRender = <T>(items: T[], perPage: number = 100) => {
    const state = writable<T[]>([]);

    let page = 1;
    const lastPage = Math.ceil(items.length / perPage);

    const gradualRender = () =>
        requestAnimationFrame(() => {
            if (page < lastPage) {
                page++;
                state.set(items.slice(0, page * perPage));
                gradualRender();
            }
        });
    gradualRender();

    return { ...state };
}