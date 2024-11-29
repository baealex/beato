import { eqStore } from '~/store/audioEq';

const audioNodes = new Map();

const createWebAudioContext = () => {
    let context: AudioContext | undefined;

    let source: MediaElementAudioSourceNode | undefined;

    let filters: {
        bass: BiquadFilterNode;
        lowMid: BiquadFilterNode;
        mid: BiquadFilterNode;
        highMid: BiquadFilterNode;
        treble: BiquadFilterNode;
    } | undefined;

    let analyser: AnalyserNode | undefined;

    let hasInit = false;

    const initEqualizer = () => {
        if (context) {
            filters = {
                bass: context.createBiquadFilter(),
                lowMid: context.createBiquadFilter(),
                mid: context.createBiquadFilter(),
                highMid: context.createBiquadFilter(),
                treble: context.createBiquadFilter()
            };

            filters.bass.type = 'lowshelf';
            filters.bass.frequency.setValueAtTime(60, context.currentTime);
            filters.lowMid.type = 'peaking';
            filters.lowMid.frequency.setValueAtTime(250, context.currentTime);
            filters.mid.type = 'peaking';
            filters.mid.frequency.setValueAtTime(1000, context.currentTime);
            filters.highMid.type = 'peaking';
            filters.highMid.frequency.setValueAtTime(4000, context.currentTime);
            filters.treble.type = 'highshelf';
            filters.treble.frequency.setValueAtTime(12000, context.currentTime);

            eqStore.subscribe((state) => {
                if (!context || !filters) {
                    return;
                }

                filters.bass.gain.setValueAtTime(state.bass, context.currentTime);
                filters.lowMid.gain.setValueAtTime(state.lowMid, context.currentTime);
                filters.mid.gain.setValueAtTime(state.mid, context.currentTime);
                filters.highMid.gain.setValueAtTime(state.highMid, context.currentTime);
                filters.treble.gain.setValueAtTime(state.treble, context.currentTime);
            });
        }
    };

    const initAnalyser = () => {
        if (context) {
            analyser = context.createAnalyser();
        }
    };

    const init = () => {
        if (hasInit) {
            return;
        }
        context = new AudioContext();
        initEqualizer();
        initAnalyser();
        hasInit = true;
    };

    return {
        init,
        initialized: () => {
            return hasInit;
        },
        connect: (audio: HTMLAudioElement) => {
            if (!hasInit) {
                init();
            }

            if (audioNodes.has(audio)) {
                return;
            }

            if (!context || !filters || !analyser) {
                return;
            }

            source = context.createMediaElementSource(audio);
            audioNodes.set(audio, source);
            source.connect(analyser);
            source.connect(filters.bass);
            filters.bass.connect(filters.lowMid);
            filters.lowMid.connect(filters.mid);
            filters.mid.connect(filters.highMid);
            filters.highMid.connect(filters.treble);
            filters.treble.connect(context.destination);
        },
        disconnect: (audio: HTMLAudioElement) => {
            if (audioNodes.has(audio)) {
                const source = audioNodes.get(audio);
                source.disconnect();
                audioNodes.delete(audio);
            }
        },
        getSource: () => {
            return source;
        },
        getAnalyser: () => {
            return analyser;
        }
    };
};

export const webAudioContext = createWebAudioContext();
