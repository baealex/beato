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
    static shouldIncreaseItems: string[] = []

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

    static async count(id?: string) {
        id && this.shouldIncreaseItems.push(id)

        if (!socket.connected) {
            return
        }

        while (this.shouldIncreaseItems.length > 0) {
            const itemId = this.shouldIncreaseItems.pop()

            if (!itemId) {
                break
            }

            await new Promise(resolve => setTimeout(resolve, 500))
            socket.emit(MUSIC_COUNT, { id: itemId })
        }
    }

    disconnect() {
        if (this.handler === null) return

        socket.off(MUSIC_LIKE, this.handler.onLike)
        socket.off(MUSIC_COUNT, this.handler.onCount)

        this.handler = null
    }
}
