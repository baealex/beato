interface Window {
    AppChannel: {
        postMessage: (message: string) => void;
        syncAudioTime: (time: number) => void;
        syncAudioState: (state: 'play' | 'pause' | 'stop' | 'end') => void;
    };
}