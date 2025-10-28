import type { Socket } from 'socket.io';
import { connectors } from './connectors';

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

export const playbackState = (() => {
    let state: PlaybackState = {
        activeDeviceId: null,
        selected: null,
        isPlaying: false,
        shuffle: false,
        insertMode: 'last',
        repeatMode: 'none',
        playMode: 'later',
        mixMode: 'none',
        currentTime: 0,
        progress: 0,
        items: [],
        sourceItems: []
    };

    return {
        get: () => state,
        update: (newState: Partial<PlaybackState>) => {
            state = { ...state, ...newState };
            return state;
        },
        setActiveDevice: (deviceId: string | null) => {
            state.activeDeviceId = deviceId;
            return state;
        }
    };
})();

export const playbackListener = (socket: Socket) => {
    // 클라이언트가 현재 재생 상태를 요청
    socket.on('get-playback-state', () => {
        socket.emit('playback-state-sync', playbackState.get());
    });

    // 클라이언트가 재생 상태를 업데이트
    socket.on('playback-state-update', (data: Partial<PlaybackState>) => {
        // 현재 활성 기기가 없거나, 요청한 기기가 활성 기기인 경우에만 업데이트
        const currentState = playbackState.get();
        if (!currentState.activeDeviceId || currentState.activeDeviceId === socket.id) {
            const updatedState = playbackState.update(data);

            // 모든 클라이언트에게 동기화
            connectors.broadcast('playback-state-sync', updatedState);
        }
    });

    // 특정 기기로 재생 전환
    socket.on('transfer-playback', ({ deviceId }: { deviceId: string }) => {
        const updatedState = playbackState.setActiveDevice(deviceId);

        // 모든 클라이언트에게 활성 기기 변경 알림
        connectors.broadcast('playback-state-sync', updatedState);
        connectors.broadcast('active-device-changed', {
            activeDeviceId: deviceId,
            isActive: true
        });
    });

    // 클라이언트가 재생을 시작할 때 자동으로 활성 기기로 설정
    socket.on('request-playback-control', () => {
        const updatedState = playbackState.setActiveDevice(socket.id);
        connectors.broadcast('playback-state-sync', updatedState);
    });
};
