import { get } from 'svelte/store';

import { socket } from './socket';

import type { Music } from '../models/type';

import { musics, queue, musicActionPanel, musicSortPanel } from '../store';

export const MUSIC_LIKE = 'music-like';
export const MUSIC_COUNT = 'music-count';

export const musicListener = () => {
    socket.on(MUSIC_LIKE, like);
    socket.on(MUSIC_COUNT, count);
}

export const musicDisconnection = () => {
    socket.off(MUSIC_LIKE);
    socket.off(MUSIC_COUNT);
}

interface Like {
    id: string;
    isLiked: boolean;
}

export const like = async ({ id, isLiked }: Like) => {
    const switchLike = (music: Music) => {
        if (music.id === id) {
            music.isLiked = isLiked;
        }
        return music;
    };
    musics.update((state) => state.map(switchLike));
    queue.update((state) => ({
        ...state,
        items: state.items.map(switchLike),
    }));
    musicActionPanel.update((state) => ({
        ...state,
        music: state.music ? switchLike(state.music) : null,
    }));
};

interface Count {
    id: string;
    playCount: number;
}

export const count = async ({ id, playCount }: Count) => {
    const { latestSort } = get(musicSortPanel);
    if (latestSort === "playCountAsc") {
        musics.update((state) =>
            state.map((music) => {
                if (music.id === id) {
                    music.playCount = playCount;
                }
                return music;
            }).sort((a, b) => b.playCount - a.playCount)
        );
    }
    if (latestSort === "playCountDesc") {
        musics.update((state) =>
            state.map((music) => {
                if (music.id === id) {
                    music.playCount = playCount;
                }
                return music;
            }).sort((a, b) => a.playCount - b.playCount)
        );
    }
};