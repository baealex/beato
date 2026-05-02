import { BaseStore } from './base-store';

export type PlayerVisualizerMode =
    | 'puffy'
    | 'disk'
    | 'round'
    | 'line'
    | 'ring'
    | 'digital';

interface ThemeState {
    playerVisualizerMode: PlayerVisualizerMode;
}

const PLAYER_VISUALIZER_MODES = new Set<PlayerVisualizerMode>([
    'puffy',
    'disk',
    'round',
    'line',
    'ring',
    'digital'
]);

const resolveLegacyVisualizerMode = (playerAlbumArtStyle: string): PlayerVisualizerMode => {
    if (!playerAlbumArtStyle) {
        return 'puffy';
    }

    if (playerAlbumArtStyle === 'disk') {
        return 'disk';
    }

    if (!playerAlbumArtStyle.startsWith('visualizer')) {
        return 'disk';
    }

    const [, legacyMode = 'round'] = playerAlbumArtStyle.split(':');

    if (PLAYER_VISUALIZER_MODES.has(legacyMode as PlayerVisualizerMode)) {
        return legacyMode as PlayerVisualizerMode;
    }

    return 'round';
};

const resolveVisualizerMode = (
    savedMode: string | null,
    playerAlbumArtStyle: string
): PlayerVisualizerMode => {
    if (savedMode && PLAYER_VISUALIZER_MODES.has(savedMode as PlayerVisualizerMode)) {
        return savedMode as PlayerVisualizerMode;
    }

    if (savedMode === 'off') {
        return 'disk';
    }

    if (savedMode === 'spectrum') {
        return 'line';
    }

    if (savedMode === 'dna' || savedMode === 'neon') {
        return 'round';
    }

    if (savedMode === 'calm' || savedMode === 'wave' || savedMode === 'orbit') {
        return 'round';
    }

    return resolveLegacyVisualizerMode(playerAlbumArtStyle);
};

class ThemeStore extends BaseStore<ThemeState> {
    constructor() {
        super();
        const savedAlbumArtStyle = localStorage.getItem('theme:playerAlbumArtStyle') || '';
        const playerVisualizerMode = resolveVisualizerMode(
            localStorage.getItem('theme:playerVisualizerMode'),
            savedAlbumArtStyle
        );

        this.state = {
            playerVisualizerMode
        };
    }

    setPlayerVisualizerMode(playerVisualizerMode: PlayerVisualizerMode) {
        this.set({ playerVisualizerMode });
        localStorage.setItem('theme:playerVisualizerMode', playerVisualizerMode);
    }
}

export const themeStore = new ThemeStore();
