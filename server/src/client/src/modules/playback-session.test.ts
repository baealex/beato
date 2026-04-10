import { describe, expect, it } from 'vitest';

import { PlaybackSessionTracker } from './playback-session';

describe('PlaybackSessionTracker', () => {
    it('tracks only real listening time across ticks and pauses', () => {
        const tracker = new PlaybackSessionTracker();

        tracker.play({
            id: 'track-1',
            durationMs: 200_000
        }, 1_000);
        tracker.tick(1_400);
        tracker.tick(1_900);
        tracker.pause(2_100);
        tracker.play({
            id: 'track-1',
            durationMs: 200_000
        }, 5_000);
        tracker.tick(5_300);

        expect(tracker.commit(5_500)).toEqual({
            clientSessionId: expect.any(String),
            id: 'track-1',
            playedMs: 1_600,
            completionRate: expect.closeTo(0.008, 10),
            startedAt: new Date(1_000).toISOString()
        });
    });

    it('does not count paused gaps or seek jumps as listened time', () => {
        const tracker = new PlaybackSessionTracker();

        tracker.play({
            id: 'track-2',
            durationMs: 180_000
        }, 10_000);
        tracker.tick(10_300);
        tracker.pause(10_300);

        tracker.play({
            id: 'track-2',
            durationMs: 180_000
        }, 20_000);
        tracker.tick(20_200);

        expect(tracker.commit(20_400)).toEqual({
            clientSessionId: expect.any(String),
            id: 'track-2',
            playedMs: 700,
            completionRate: expect.closeTo(700 / 180_000, 10),
            startedAt: new Date(10_000).toISOString()
        });
    });

    it('resets after commit so the next track starts a fresh session', () => {
        const tracker = new PlaybackSessionTracker();

        tracker.play({
            id: 'track-1',
            durationMs: 120_000
        }, 1_000);
        tracker.tick(2_000);

        expect(tracker.commit(2_500)).toEqual({
            clientSessionId: expect.any(String),
            id: 'track-1',
            playedMs: 1_500,
            completionRate: expect.closeTo(0.0125, 10),
            startedAt: new Date(1_000).toISOString()
        });

        tracker.play({
            id: 'track-2',
            durationMs: 60_000
        }, 5_000);
        tracker.tick(5_600);

        expect(tracker.commit(5_800)).toEqual({
            clientSessionId: expect.any(String),
            id: 'track-2',
            playedMs: 800,
            completionRate: expect.closeTo(800 / 60_000, 10),
            startedAt: new Date(5_000).toISOString()
        });
    });

    it('creates overwriteable checkpoints with stable session identity across pause and resume', () => {
        const tracker = new PlaybackSessionTracker();

        tracker.play({
            id: 'track-3',
            durationMs: 90_000
        }, 1_000);
        tracker.tick(5_000);

        const firstCheckpoint = tracker.createCheckpoint('queue-checkpoint', 11_000);

        tracker.pause(11_500);
        tracker.play({
            id: 'track-3',
            durationMs: 90_000
        }, 20_000);
        tracker.tick(23_000);
        tracker.pause(23_000);

        const secondCheckpoint = tracker.createCheckpoint('queue-pause', 23_000);

        expect(firstCheckpoint).toEqual({
            clientSessionId: expect.any(String),
            trackId: 'track-3',
            startedAt: new Date(1_000).toISOString(),
            accumulatedPlayedMs: 10_000,
            lastResumedAt: new Date(1_000).toISOString(),
            active: true,
            updatedAt: new Date(11_000).toISOString(),
            source: 'queue-checkpoint'
        });
        expect(secondCheckpoint).toEqual({
            clientSessionId: firstCheckpoint?.clientSessionId,
            trackId: 'track-3',
            startedAt: new Date(1_000).toISOString(),
            accumulatedPlayedMs: 13_500,
            lastResumedAt: new Date(20_000).toISOString(),
            active: false,
            updatedAt: new Date(23_000).toISOString(),
            source: 'queue-pause'
        });
    });

    it('starts a fresh client session id when the track changes', () => {
        const tracker = new PlaybackSessionTracker();

        tracker.play({
            id: 'track-4',
            durationMs: 100_000
        }, 1_000);
        tracker.tick(4_000);
        const firstCheckpoint = tracker.createCheckpoint('queue-checkpoint', 4_000);

        tracker.play({
            id: 'track-5',
            durationMs: 120_000
        }, 10_000);
        tracker.tick(12_000);
        const secondCheckpoint = tracker.createCheckpoint('queue-checkpoint', 12_000);

        expect(firstCheckpoint?.clientSessionId).not.toBe(secondCheckpoint?.clientSessionId);
        expect(secondCheckpoint).toEqual({
            clientSessionId: expect.any(String),
            trackId: 'track-5',
            startedAt: new Date(10_000).toISOString(),
            accumulatedPlayedMs: 2_000,
            lastResumedAt: new Date(10_000).toISOString(),
            active: true,
            updatedAt: new Date(12_000).toISOString(),
            source: 'queue-checkpoint'
        });
    });
});
