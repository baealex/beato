interface ReceiveMessageAudioState {
    actionType: 'play' | 'pause' | 'stop' | 'skipToNext' | 'skipToPrevious' | 'end';
}

interface ReceiveMessageAudioPosition {
    actionType: 'setPosition';
    position: number;
}

type ReceiveMessage = ReceiveMessageAudioState | ReceiveMessageAudioPosition;

interface Window {
    AppChannel: {
        postMessage: (message: string) => void;
        receiveMessage: (message: ReceiveMessage) => void;
    };
}