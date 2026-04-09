import { socket } from './socket';
import type { Listener } from './listener';

export const MUSIC_LIKE = 'music-like';
export const MUSIC_HATE = 'music-hate';
export const MUSIC_COUNT = 'music-count';

export interface CountPayload {
    id: string;
    playedMs: number;
    completionRate: number;
    startedAt: string;
    source?: string;
}

interface Like {
    id: string;
    isLiked: boolean;
}

interface Hate {
    id: string;
    isHated: boolean;
}

interface Count {
    id: string;
    playCount: number;
    lastPlayedAt: string | null;
    totalPlayedMs: number;
    countedAsPlay: boolean;
}

interface MusicListenerEventHandler {
    onLike: (data: Like) => void;
    onHate: (data: Hate) => void;
    onCount: (data: Count) => void;
}

export class MusicListener implements Listener {
    static pendingCountEvents: CountPayload[] = [];
    static isFlushing = false;

    handler: MusicListenerEventHandler | null;

    constructor() {
        this.handler = null;
    }

    connect(handler: MusicListenerEventHandler) {
        if (this.handler !== null) {
            this.disconnect();
        }
        this.handler = handler;

        socket.on(MUSIC_LIKE, this.handler.onLike);
        socket.on(MUSIC_HATE, this.handler.onHate);
        socket.on(MUSIC_COUNT, this.handler.onCount);
    }

    static like(id: string, isLiked: boolean) {
        socket.emit(MUSIC_LIKE, {
            id,
            isLiked
        });
    }

    static hate(id: string) {
        socket.emit(MUSIC_HATE, { id });
    }

    static async count(payload?: CountPayload) {
        if (payload) {
            this.pendingCountEvents.push(payload);
        }

        if (!socket.connected || this.isFlushing) {
            return;
        }

        this.isFlushing = true;

        try {
            while (this.pendingCountEvents.length > 0) {
                const item = this.pendingCountEvents.shift();

                if (!item) {
                    break;
                }

                socket.emit(MUSIC_COUNT, item);
            }
        } finally {
            this.isFlushing = false;
        }
    }

    disconnect() {
        if (this.handler === null) return;

        socket.off(MUSIC_LIKE, this.handler.onLike);
        socket.off(MUSIC_HATE, this.handler.onHate);
        socket.off(MUSIC_COUNT, this.handler.onCount);

        this.handler = null;
    }
}
