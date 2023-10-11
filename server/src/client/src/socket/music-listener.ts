import { socket } from './socket'
import { Listener } from './listener'
import { increasePlayCount } from '~/api'

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
    handler: MusicListenerEventHandler | null

    constructor() {
        this.handler = null
    }

    connect(handler: MusicListenerEventHandler) {
        if (this.handler !== null) {
            this.disconnect()
        }
        this.handler = handler

        socket.on(MUSIC_LIKE, this.handler.onLike)
        socket.on(MUSIC_COUNT, this.handler.onCount)
    }

    static like(id: string, isLiked: boolean) {
        socket.emit(MUSIC_LIKE, { id, isLiked })
    }

    static count(id: string) {
        if (!socket.connected) {
            increasePlayCount(id)
            return
        }
        socket.emit(MUSIC_COUNT, { id })
    }

    disconnect() {
        if (this.handler === null) return

        socket.off(MUSIC_LIKE)
        socket.off(MUSIC_COUNT)

        this.handler = null
    }
}
