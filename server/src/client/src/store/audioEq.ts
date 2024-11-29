import Store from 'badland';

interface AudioEQState {
    bass: number;
    lowMid: number;
    mid: number;
    highMid: number;
    treble: number;
}

class AudioEQStore extends Store<AudioEQState> {
    saveTimer: ReturnType<typeof setTimeout> | null;

    constructor() {
        super();
        this.saveTimer = null;
        this.state = {
            bass: 0,
            lowMid: 0,
            mid: 0,
            highMid: 0,
            treble: 0
        };

        setTimeout(() => {
            this.set({
                bass: Number(localStorage.getItem('audio::eq::bass') || '0'),
                lowMid: Number(localStorage.getItem('audio::eq::lowMid') || '0'),
                mid: Number(localStorage.getItem('audio::eq::mid') || '0'),
                highMid: Number(localStorage.getItem('audio::eq::highMid') || '0'),
                treble: Number(localStorage.getItem('audio::eq::treble') || '0')
            });
        }, 0);
    }

    afterStateChange() {
        if (this.saveTimer) {
            clearTimeout(this.saveTimer);
        }

        this.saveTimer = setTimeout(() => {
            localStorage.setItem('audio::eq::bass', this.state.bass.toString());
            localStorage.setItem('audio::eq::lowMid', this.state.lowMid.toString());
            localStorage.setItem('audio::eq::mid', this.state.mid.toString());
            localStorage.setItem('audio::eq::highMid', this.state.highMid.toString());
            localStorage.setItem('audio::eq::treble', this.state.treble.toString());
        }, 3000);
    }
}

export const eqStore = new AudioEQStore();
