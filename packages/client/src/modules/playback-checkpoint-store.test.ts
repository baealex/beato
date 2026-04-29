import { beforeEach, describe, expect, it } from 'vitest';

import {
    clearPlaybackCheckpoints,
    deletePlaybackCheckpoint,
    getPlaybackCheckpoint,
    listPlaybackCheckpoints,
    savePlaybackCheckpoint
} from './playback-checkpoint-store';

const createCheckpoint = (overrides?: Partial<Parameters<typeof savePlaybackCheckpoint>[0]>) => ({
    clientSessionId: overrides?.clientSessionId ?? 'session-1',
    trackId: overrides?.trackId ?? 'track-1',
    startedAt: overrides?.startedAt ?? '2026-04-10T10:00:00.000Z',
    accumulatedPlayedMs: overrides?.accumulatedPlayedMs ?? 12_000,
    lastResumedAt: overrides?.lastResumedAt ?? '2026-04-10T10:00:05.000Z',
    active: overrides?.active ?? true,
    updatedAt: overrides?.updatedAt ?? '2026-04-10T10:00:12.000Z',
    source: overrides?.source ?? 'queue-checkpoint'
});

describe('playback checkpoint store', () => {
    beforeEach(async () => {
        await clearPlaybackCheckpoints();
    });

    it('saves and restores a checkpoint by client session id', async () => {
        const checkpoint = createCheckpoint();

        await savePlaybackCheckpoint(checkpoint);

        expect(await getPlaybackCheckpoint(checkpoint.clientSessionId)).toEqual(checkpoint);
    });

    it('overwrites an existing checkpoint with the latest snapshot', async () => {
        await savePlaybackCheckpoint(createCheckpoint());
        await savePlaybackCheckpoint(createCheckpoint({
            accumulatedPlayedMs: 24_000,
            active: false,
            updatedAt: '2026-04-10T10:00:24.000Z',
            source: 'queue-pause'
        }));

        expect(await getPlaybackCheckpoint('session-1')).toEqual(createCheckpoint({
            accumulatedPlayedMs: 24_000,
            active: false,
            updatedAt: '2026-04-10T10:00:24.000Z',
            source: 'queue-pause'
        }));
    });

    it('lists checkpoints in update order and removes deleted entries', async () => {
        await savePlaybackCheckpoint(createCheckpoint({
            clientSessionId: 'session-2',
            updatedAt: '2026-04-10T10:00:20.000Z'
        }));
        await savePlaybackCheckpoint(createCheckpoint({
            clientSessionId: 'session-1',
            updatedAt: '2026-04-10T10:00:10.000Z'
        }));

        expect(await listPlaybackCheckpoints()).toEqual([
            createCheckpoint({
                clientSessionId: 'session-1',
                updatedAt: '2026-04-10T10:00:10.000Z'
            }),
            createCheckpoint({
                clientSessionId: 'session-2',
                updatedAt: '2026-04-10T10:00:20.000Z'
            })
        ]);

        await deletePlaybackCheckpoint('session-1');

        expect(await getPlaybackCheckpoint('session-1')).toBeNull();
        expect(await listPlaybackCheckpoints()).toEqual([
            createCheckpoint({
                clientSessionId: 'session-2',
                updatedAt: '2026-04-10T10:00:20.000Z'
            })
        ]);
    });
});
