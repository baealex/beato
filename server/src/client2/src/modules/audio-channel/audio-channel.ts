export interface AudioChannelEventHandler {
    onPlay?: () => void;
    onPause?: () => void;
    onStop?: () => void;
    onEnded: () => void;
    onTimeUpdate: (time: number) => void;
    onSetPosition?: (position: number) => void;
    onSkipToNext?: () => void;
    onSkipToPrevious?: () => void;
}

export interface AudioChannel {
    load: (id: string) => void;
    play: () => void;
    pause: () => void;
    stop: () => void;
    seek: (time: number) => void;
}