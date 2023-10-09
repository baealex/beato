import { socket } from './socket'
import { Listener } from './listener'

export const MUSIC_LIKE = 'music-like'
export const MUSIC_COUNT = 'music-count'

interface Like {
    id: string;
    isLiked: boolean;
}

interface Count {
    id: string;
    playCount: number;
}

interface MusicListenerEventHandler {
    onLike: (data: Like) => void;
    onCount: (data: Count) => void;
}

export class MusicListener implements Listener {
    connect({ onLike, onCount }: MusicListenerEventHandler) {
        socket.on(MUSIC_LIKE, onLike)
        socket.on(MUSIC_COUNT, onCount)
    }

    static like(id: string, isLiked: boolean) {
        socket.emit(MUSIC_LIKE, { id, isLiked })
    }

    static count(id: string) {
        socket.emit(MUSIC_COUNT, { id })
    }

    disconnect() {
        socket.off(MUSIC_LIKE)
        socket.off(MUSIC_COUNT)
    }
}
