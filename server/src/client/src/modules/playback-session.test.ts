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
            id: 'track-2',
            playedMs: 800,
            completionRate: expect.closeTo(800 / 60_000, 10),
            startedAt: new Date(5_000).toISOString()
        });
    });
});
