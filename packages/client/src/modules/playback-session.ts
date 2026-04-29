export interface PlaybackSessionTrack {
    id: string;
    durationMs: number;
}

export interface PlaybackSessionCheckpoint {
    clientSessionId: string;
    trackId: string;
    startedAt: string;
    accumulatedPlayedMs: number;
    lastResumedAt: string | null;
    active: boolean;
    updatedAt: string;
    source: string;
}

export interface PlaybackSessionCommit {
    clientSessionId: string;
    id: string;
    playedMs: number;
    completionRate: number;
    startedAt: string;
}

const normalizeDurationMs = (durationMs: number) => {
    return Math.max(Math.round(durationMs), 1);
};

const createPlaybackSessionId = () => {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
        return crypto.randomUUID();
    }

    return `playback-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

export class PlaybackSessionTracker {
    private clientSessionId: string | null = null;
    private trackId: string | null = null;
    private durationMs = 0;
    private listenedMs = 0;
    private startedAtMs: number | null = null;
    private lastTickAtMs: number | null = null;
    private lastResumedAtMs: number | null = null;
    private active = false;

    play(track: PlaybackSessionTrack, now = Date.now()) {
        this.ensureTrack(track, now);

        if (!this.active) {
            this.active = true;
            this.lastTickAtMs = now;
            this.lastResumedAtMs = now;
        }
    }

    tick(now = Date.now()) {
        this.syncActiveListening(now);
    }

    pause(now = Date.now()) {
        if (!this.active) {
            return;
        }

        this.tick(now);
        this.active = false;
        this.lastTickAtMs = null;
    }

    getAccumulatedPlayedMs(now = Date.now()) {
        if (!this.active || this.lastTickAtMs === null) {
            return Math.max(Math.round(this.listenedMs), 0);
        }

        return Math.max(Math.round(
            this.listenedMs + Math.max(now - this.lastTickAtMs, 0)
        ), 0);
    }

    createCheckpoint(source: string, now = Date.now()): PlaybackSessionCheckpoint | null {
        if (!this.clientSessionId || !this.trackId || this.startedAtMs === null) {
            return null;
        }

        this.syncActiveListening(now);

        const accumulatedPlayedMs = Math.max(Math.round(this.listenedMs), 0);

        if (accumulatedPlayedMs <= 0) {
            return null;
        }

        return {
            clientSessionId: this.clientSessionId,
            trackId: this.trackId,
            startedAt: new Date(this.startedAtMs).toISOString(),
            accumulatedPlayedMs,
            lastResumedAt: this.lastResumedAtMs === null
                ? null
                : new Date(this.lastResumedAtMs).toISOString(),
            active: this.active,
            updatedAt: new Date(now).toISOString(),
            source
        };
    }

    commit(now = Date.now()): PlaybackSessionCommit | null {
        this.pause(now);

        if (!this.clientSessionId || !this.trackId || this.startedAtMs === null) {
            this.reset();
            return null;
        }

        const playedMs = Math.max(Math.round(this.listenedMs), 0);

        if (playedMs <= 0) {
            this.reset();
            return null;
        }

        const payload: PlaybackSessionCommit = {
            clientSessionId: this.clientSessionId,
            id: this.trackId,
            playedMs,
            completionRate: Math.min(playedMs / normalizeDurationMs(this.durationMs), 1),
            startedAt: new Date(this.startedAtMs).toISOString()
        };

        this.reset();

        return payload;
    }

    reset() {
        this.clientSessionId = null;
        this.trackId = null;
        this.durationMs = 0;
        this.listenedMs = 0;
        this.startedAtMs = null;
        this.lastTickAtMs = null;
        this.lastResumedAtMs = null;
        this.active = false;
    }

    private ensureTrack(track: PlaybackSessionTrack, now: number) {
        if (this.trackId !== track.id) {
            this.clientSessionId = createPlaybackSessionId();
            this.trackId = track.id;
            this.durationMs = normalizeDurationMs(track.durationMs);
            this.listenedMs = 0;
            this.startedAtMs = now;
            this.lastTickAtMs = null;
            this.lastResumedAtMs = null;
            this.active = false;
            return;
        }

        this.durationMs = normalizeDurationMs(track.durationMs);

        if (this.clientSessionId === null) {
            this.clientSessionId = createPlaybackSessionId();
        }

        if (this.startedAtMs === null) {
            this.startedAtMs = now;
        }
    }

    private syncActiveListening(now: number) {
        if (!this.active || this.lastTickAtMs === null) {
            return;
        }

        this.listenedMs += Math.max(now - this.lastTickAtMs, 0);
        this.lastTickAtMs = now;
    }
}
