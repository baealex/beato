import type { Music } from '~/models/type'

export interface AudioChannelEventHandler {
    onPlay?: () => void;
    onPause?: () => void;
    onStop?: () => void;
    onEnded: () => void;
    onTimeUpdate: (time: number) => void;
    onSkipToNext?: () => void;
    onSkipToPrevious?: () => void;
}

export interface AudioChannel {
    load: (music: Music) => void;
    play: () => void;
    pause: () => void;
    stop: () => void;
    seek: (time: number) => void;
}