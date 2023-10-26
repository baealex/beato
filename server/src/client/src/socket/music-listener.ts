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

const shouldIncreaseItems: string[] = []

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

    static async count(id?: string) {
        id && shouldIncreaseItems.push(id)

        if (!socket.connected) {
            return
        }

        const items = shouldIncreaseItems.splice(0, shouldIncreaseItems.length)

        Promise.all(items.map((id, idx) => {
            return new Promise(resolve => {
                setTimeout(() => {
                    socket.emit(MUSIC_COUNT, { id })
                    resolve(true)
                }, idx * 500)
            })
        }))
    }

    disconnect() {
        if (this.handler === null) return

        socket.off(MUSIC_LIKE, this.handler.onLike)
        socket.off(MUSIC_COUNT, this.handler.onCount)

        this.handler = null
    }
}
