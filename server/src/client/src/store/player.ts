import { writable } from 'svelte/store';

export type CoverAnimation = 'none' | 'rotate' | 'bounce';

interface Player {
    coverAnimation: CoverAnimation;
}

const INITIAL_STATE: Player = {
    coverAnimation: 'bounce',
};

const LOCAL_STORAGE_KEY = 'player';

const loadPlayer = () => {
    const queue = localStorage.getItem(LOCAL_STORAGE_KEY);
    return queue ? JSON.parse(queue) : INITIAL_STATE;
};

export const player = writable<Player>(loadPlayer());

player.subscribe((value) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({
        ...value,
    }));
});