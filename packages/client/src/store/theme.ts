import { BaseStore } from './base-store';

export type PlayerVisualizerMode =
    | 'disk'
    | 'round'
    | 'line';

interface ThemeState {
    playerVisualizerMode: PlayerVisualizerMode;
}

const PLAYER_VISUALIZER_MODES = new Set<PlayerVisualizerMode>([
    'disk',
    'round',
    'line'
]);

const resolveRetiredVisualizerMode = (mode: string) => (
    mode === 'ring' ? 'round' : mode
);

const resolveLegacyVisualizerMode = (playerAlbumArtStyle: string): PlayerVisualizerMode => {
    if (!playerAlbumArtStyle) {
        return 'disk';
    }

    if (playerAlbumArtStyle === 'disk') {
        return 'disk';
    }

    if (!playerAlbumArtStyle.startsWith('visualizer')) {
        return 'disk';
    }

    const [, rawLegacyMode = 'round'] = playerAlbumArtStyle.split(':');
    const legacyMode = resolveRetiredVisualizerMode(rawLegacyMode);

    if (PLAYER_VISUALIZER_MODES.has(legacyMode as PlayerVisualizerMode)) {
        return legacyMode as PlayerVisualizerMode;
    }

    return 'round';
};

const resolveVisualizerMode = (
    savedMode: string | null,
    playerAlbumArtStyle: string
): PlayerVisualizerMode => {
    if (savedMode) {
        const normalizedMode = resolveRetiredVisualizerMode(savedMode);

        if (PLAYER_VISUALIZER_MODES.has(normalizedMode as PlayerVisualizerMode)) {
            return normalizedMode as PlayerVisualizerMode;
        }
    }

    if (savedMode === 'off' || savedMode === 'puffy') {
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
