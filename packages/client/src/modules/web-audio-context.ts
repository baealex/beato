import {
    equalizerStore,
    type EqualizerState
} from '~/store/equalizer';

type EqualizerFilter = {
    id: keyof EqualizerState;
    node: BiquadFilterNode;
};

type ConnectedAudioNode = {
    source: MediaElementAudioSourceNode;
    gain: GainNode;
};

const EQ_CHANGE_RAMP_SECONDS = 0.018;
const GAIN_CHANGE_RAMP_SECONDS = 0.025;

const FILTER_DEFINITIONS = [
    { id: 'lowBass', type: 'lowshelf', frequency: 63, q: null },
    { id: 'bass', type: 'peaking', frequency: 125, q: 1 },
    { id: 'lowMid', type: 'peaking', frequency: 250, q: 1 },
    { id: 'mid', type: 'peaking', frequency: 500, q: 1 },
    { id: 'highMid', type: 'peaking', frequency: 1000, q: 1 },
    { id: 'presence', type: 'peaking', frequency: 4000, q: 1 },
    { id: 'treble', type: 'highshelf', frequency: 10000, q: null }
] as const satisfies ReadonlyArray<{
    id: keyof EqualizerState;
    type: BiquadFilterType;
    frequency: number;
    q: number | null;
}>;

const createWebAudioContext = () => {
    const audioNodes = new Map<HTMLAudioElement, ConnectedAudioNode>();

    let context: AudioContext | undefined;
    let filters: EqualizerFilter[] = [];
    let analyser: AnalyserNode | undefined;
    let hasInit = false;
    let unsubscribeEqualizer: (() => void) | undefined;

    const getFirstFilter = () => filters[0]?.node;
    const getLastFilter = () => filters[filters.length - 1]?.node;

    const setAudioParam = (
        param: AudioParam,
        value: number,
        rampSeconds = EQ_CHANGE_RAMP_SECONDS
    ) => {
        if (!context) {
            return;
        }

        const now = context.currentTime;
        param.cancelScheduledValues(now);
        param.setTargetAtTime(value, now, rampSeconds);
    };

    const applyEqualizerState = () => {
        const state = equalizerStore.state;

        filters.forEach(({ id, node }) => {
            setAudioParam(node.gain, state[id]);
        });
    };

    const initEqualizer = () => {
        if (!context) {
            return;
        }

        filters = FILTER_DEFINITIONS.map(({ id, type, frequency, q }) => {
            const node = context!.createBiquadFilter();
            node.type = type;
            node.frequency.value = frequency;

            if (typeof q === 'number') {
                node.Q.value = q;
            }

            return { id, node };
        });

        applyEqualizerState();
        unsubscribeEqualizer = equalizerStore.subscribe(applyEqualizerState);
    };

    const initAnalyser = () => {
        if (!context) {
            return;
        }

        analyser = context.createAnalyser();
        analyser.fftSize = 512;
        analyser.smoothingTimeConstant = 0.82;
    };

    const connectEqualizerGraph = () => {
        if (!context || !analyser || filters.length === 0) {
            return;
        }

        filters.forEach(({ node }, index) => {
            const nextFilter = filters[index + 1]?.node;

            if (nextFilter) {
                node.connect(nextFilter);
            }
        });

        getLastFilter()?.connect(analyser);
        analyser.connect(context.destination);
    };

    const init = () => {
        if (hasInit) {
            return;
        }

        context = new AudioContext();
        initEqualizer();
        initAnalyser();
        connectEqualizerGraph();
        hasInit = true;
    };

    const resume = () => {
        if (!context || context.state !== 'suspended') {
            return;
        }

        void context.resume();
    };

    const connect = (audio: HTMLAudioElement) => {
        if (!hasInit) {
            init();
        }

        if (audioNodes.has(audio)) {
            resume();
            return;
        }

        const firstFilter = getFirstFilter();

        if (!context || !firstFilter) {
            return;
        }

        const source = context.createMediaElementSource(audio);
        const gain = context.createGain();

        gain.gain.value = audio.volume;
        source.connect(gain);
        gain.connect(firstFilter);
        audioNodes.set(audio, { source, gain });
        resume();
    };

    const disconnect = (audio: HTMLAudioElement) => {
        const node = audioNodes.get(audio);

        if (!node) {
            return;
        }

        node.source.disconnect();
        node.gain.disconnect();
        audioNodes.delete(audio);
    };

    const setGain = (
        audio: HTMLAudioElement,
        value: number,
        rampSeconds = GAIN_CHANGE_RAMP_SECONDS
    ) => {
        if (!context) {
            audio.volume = value;
            return;
        }

        connect(audio);
        const node = audioNodes.get(audio);

        if (!node) {
            audio.volume = value;
            return;
        }

        const now = context.currentTime;
        node.gain.gain.cancelScheduledValues(now);
        node.gain.gain.setTargetAtTime(value, now, rampSeconds);
        audio.volume = 1;
    };

    return {
        init,
        initialized: () => hasInit,
        connect,
        disconnect,
        setGain,
        getContext: () => context,
        getAnalyser: () => analyser,
        dispose: () => {
            unsubscribeEqualizer?.();
            audioNodes.forEach(({ source, gain }) => {
                source.disconnect();
                gain.disconnect();
            });
            filters.forEach(({ node }) => node.disconnect());
            audioNodes.clear();
            void context?.close();
            context = undefined;
            filters = [];
            analyser = undefined;
            hasInit = false;
        }
    };
};

export const webAudioContext = createWebAudioContext();
