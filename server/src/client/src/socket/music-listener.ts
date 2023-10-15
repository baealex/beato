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

    static count(id: string) {
        if (!socket.connected) {
            shouldIncreaseItems.push(id)
            return
        }

        socket.emit(MUSIC_COUNT, { id })

        if (shouldIncreaseItems.length > 0) {
            shouldIncreaseItems.reduce((promise, id) => {
                return promise.then(() => {
                    return new Promise(resolve => {
                        setTimeout(() => {
                            shouldIncreaseItems.splice(shouldIncreaseItems.indexOf(id), 1)
                            socket.emit(MUSIC_COUNT, { id })
                            resolve()
                        }, 500)
                    })
                })
            }, Promise.resolve())
        }
    }

    disconnect() {
        if (this.handler === null) return

        socket.off(MUSIC_LIKE, this.handler.onLike)
        socket.off(MUSIC_COUNT, this.handler.onCount)

        this.handler = null
    }
}
