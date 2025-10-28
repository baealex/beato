import { socket } from './socket';
import type { Listener } from './listener';

export const GET_PLAYBACK_STATE = 'get-playback-state';
export const PLAYBACK_STATE_UPDATE = 'playback-state-update';
export const PLAYBACK_STATE_SYNC = 'playback-state-sync';
export const TRANSFER_PLAYBACK = 'transfer-playback';
export const REQUEST_PLAYBACK_CONTROL = 'request-playback-control';
export const ACTIVE_DEVICE_CHANGED = 'active-device-changed';

export interface PlaybackState {
    activeDeviceId: string | null;
    selected: number | null;
    isPlaying: boolean;
    shuffle: boolean;
    insertMode: 'first' | 'last' | 'after';
    repeatMode: 'none' | 'one' | 'all';
    playMode: 'later' | 'immediately';
    mixMode: 'none' | 'mix';
    currentTime: number;
    progress: number;
    items: string[];
    sourceItems: string[];
}

interface PlaybackListenerEventHandler {
    onPlaybackStateSync: (state: PlaybackState) => void;
    onActiveDeviceChanged?: (data: { activeDeviceId: string; isActive: boolean }) => void;
}

export class PlaybackListener implements Listener {
    handler: PlaybackListenerEventHandler | null;

    constructor() {
        this.handler = null;
    }

    connect(handler: PlaybackListenerEventHandler) {
        if (this.handler !== null) {
            this.disconnect();
        }
        this.handler = handler;

        socket.on(PLAYBACK_STATE_SYNC, this.handler.onPlaybackStateSync);
        if (this.handler.onActiveDeviceChanged) {
            socket.on(ACTIVE_DEVICE_CHANGED, this.handler.onActiveDeviceChanged);
        }

        // 연결 시 현재 재생 상태 요청
        socket.emit(GET_PLAYBACK_STATE);
    }

    static updatePlaybackState(state: Partial<PlaybackState>) {
        socket.emit(PLAYBACK_STATE_UPDATE, state);
    }

    static transferPlayback(deviceId: string) {
        socket.emit(TRANSFER_PLAYBACK, { deviceId });
    }

    static requestPlaybackControl() {
        socket.emit(REQUEST_PLAYBACK_CONTROL);
    }

    disconnect() {
        if (this.handler === null) return;

        socket.off(PLAYBACK_STATE_SYNC, this.handler.onPlaybackStateSync);
        if (this.handler.onActiveDeviceChanged) {
            socket.off(ACTIVE_DEVICE_CHANGED, this.handler.onActiveDeviceChanged);
        }

        this.handler = null;
    }
}
