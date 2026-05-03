import { BaseStore } from './base-store';

export interface EqualizerState {
    lowBass: number;
    bass: number;
    lowMid: number;
    mid: number;
    highMid: number;
    presence: number;
    treble: number;
}

export const EQUALIZER_BAND_IDS = [
    'lowBass',
    'bass',
    'lowMid',
    'mid',
    'highMid',
    'presence',
    'treble'
] as const satisfies ReadonlyArray<keyof EqualizerState>;

export const createFlatEqualizerState = (): EqualizerState => ({
    lowBass: 0,
    bass: 0,
    lowMid: 0,
    mid: 0,
    highMid: 0,
    presence: 0,
    treble: 0
});

class EqualizerStore extends BaseStore<EqualizerState> {
    saveTimer: ReturnType<typeof setTimeout> | null;

    constructor() {
        super();
        this.saveTimer = null;
        this.state = createFlatEqualizerState();

        setTimeout(() => {
            this.set({
                lowBass: Number(localStorage.getItem('audio::eq::lowBass') || localStorage.getItem('audio::eq::bass') || '0'),
                bass: Number(localStorage.getItem('audio::eq::bass') || '0'),
                lowMid: Number(localStorage.getItem('audio::eq::lowMid') || '0'),
                mid: Number(localStorage.getItem('audio::eq::mid') || '0'),
                highMid: Number(localStorage.getItem('audio::eq::highMid') || '0'),
                presence: Number(localStorage.getItem('audio::eq::presence') || localStorage.getItem('audio::eq::highMid') || '0'),
                treble: Number(localStorage.getItem('audio::eq::treble') || '0')
            });
        }, 0);
    }

    reset() {
        this.state = createFlatEqualizerState();
    }

    afterStateChange() {
        if (this.saveTimer) {
            clearTimeout(this.saveTimer);
        }

        this.saveTimer = setTimeout(() => {
            EQUALIZER_BAND_IDS.forEach((id) => {
                localStorage.setItem(`audio::eq::${id}`, this.state[id].toString());
            });
        }, 3000);
    }
}

export const equalizerStore = new EqualizerStore();
