export interface PlaybackSessionTrack {
    id: string;
    durationMs: number;
}

export interface PlaybackSessionCommit {
    id: string;
    playedMs: number;
    completionRate: number;
    startedAt: string;
}

const normalizeDurationMs = (durationMs: number) => {
    return Math.max(Math.round(durationMs), 1);
};

export class PlaybackSessionTracker {
    private trackId: string | null = null;
    private durationMs = 0;
    private listenedMs = 0;
    private startedAtMs: number | null = null;
    private lastTickAtMs: number | null = null;
    private active = false;

    play(track: PlaybackSessionTrack, now = Date.now()) {
        this.ensureTrack(track, now);

        if (!this.active) {
            this.active = true;
            this.lastTickAtMs = now;
        }
    }

    tick(now = Date.now()) {
        if (!this.active || this.lastTickAtMs === null) {
            return;
        }

        this.listenedMs += Math.max(now - this.lastTickAtMs, 0);
        this.lastTickAtMs = now;
    }

    pause(now = Date.now()) {
        if (!this.active) {
            return;
        }

        this.tick(now);
        this.active = false;
        this.lastTickAtMs = null;
    }

    commit(now = Date.now()): PlaybackSessionCommit | null {
        this.pause(now);

        if (!this.trackId || this.startedAtMs === null) {
            this.reset();
            return null;
        }

        const playedMs = Math.max(Math.round(this.listenedMs), 0);

        if (playedMs <= 0) {
            this.reset();
            return null;
        }

        const payload: PlaybackSessionCommit = {
            id: this.trackId,
            playedMs,
            completionRate: Math.min(playedMs / normalizeDurationMs(this.durationMs), 1),
            startedAt: new Date(this.startedAtMs).toISOString()
        };

        this.reset();

        return payload;
    }

    reset() {
        this.trackId = null;
        this.durationMs = 0;
        this.listenedMs = 0;
        this.startedAtMs = null;
        this.lastTickAtMs = null;
        this.active = false;
    }

    private ensureTrack(track: PlaybackSessionTrack, now: number) {
        if (this.trackId !== track.id) {
            this.trackId = track.id;
            this.durationMs = normalizeDurationMs(track.durationMs);
            this.listenedMs = 0;
            this.startedAtMs = now;
            this.lastTickAtMs = null;
            this.active = false;
            return;
        }

        this.durationMs = normalizeDurationMs(track.durationMs);

        if (this.startedAtMs === null) {
            this.startedAtMs = now;
        }
    }
}
