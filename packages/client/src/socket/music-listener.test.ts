import {
    beforeEach,
    describe,
    expect,
    it,
    vi
} from 'vitest';

const { emitMock } = vi.hoisted(() => ({ emitMock: vi.fn() }));

vi.mock('./socket', () => ({
    socket: {
        connected: true,
        on: vi.fn(),
        off: vi.fn(),
        emit: emitMock
    }
}));

import {
    clearPlaybackCheckpoints,
    getPlaybackCheckpoint,
    savePlaybackCheckpoint
} from '~/modules/playback-checkpoint-store';
import { socket } from './socket';
import { MUSIC_COUNT, MusicListener } from './music-listener';

const createCheckpoint = () => ({
    clientSessionId: 'session-1',
    trackId: 'track-1',
    startedAt: '2026-04-10T10:00:00.000Z',
    accumulatedPlayedMs: 12_000,
    lastResumedAt: '2026-04-10T10:00:05.000Z',
    active: false,
    updatedAt: '2026-04-10T10:00:12.000Z',
    source: 'queue-pagehide'
});

describe('MusicListener playback recovery', () => {
    beforeEach(async () => {
        await clearPlaybackCheckpoints();
        MusicListener.pendingCountEvents = [];
        MusicListener.isFlushing = false;
        socket.connected = true;
        emitMock.mockReset();
    });

    it('flushes pending count events and reports successful delivery after ack', async () => {
        emitMock.mockImplementation((_event, _payload, ack) => {
            ack?.({ ok: true });
        });

        const delivered = await MusicListener.count({
            id: 'track-1',
            clientSessionId: 'session-1',
            playedMs: 15_000,
            completionRate: 0.25,
            startedAt: '2026-04-10T10:00:00.000Z',
            source: 'queue-track-change'
        });

        expect(delivered).toBe(true);
        expect(MusicListener.pendingCountEvents).toEqual([]);
        expect(emitMock).toHaveBeenCalledWith(
            MUSIC_COUNT,
            expect.objectContaining({
                id: 'track-1',
                clientSessionId: 'session-1'
            }),
            expect.any(Function)
        );
    });

    it('deletes recovered checkpoints after a successful recovery ack', async () => {
        emitMock.mockImplementation((_event, _payload, ack) => {
            ack?.({ ok: true });
        });
        await savePlaybackCheckpoint(createCheckpoint());

        await MusicListener.recoverPlaybackCheckpoints();

        expect(emitMock).toHaveBeenCalledWith(
            MUSIC_COUNT,
            expect.objectContaining({
                id: 'track-1',
                clientSessionId: 'session-1',
                playedMs: 12_000,
                source: 'queue-recovery'
            }),
            expect.any(Function)
        );
        expect(await getPlaybackCheckpoint('session-1')).toBeNull();
    });

    it('keeps checkpoints for the next startup when recovery delivery fails', async () => {
        emitMock.mockImplementation((_event, _payload, ack) => {
            ack?.({ ok: false });
        });
        await savePlaybackCheckpoint(createCheckpoint());

        await MusicListener.recoverPlaybackCheckpoints();

        expect(await getPlaybackCheckpoint('session-1')).toEqual(createCheckpoint());
    });
});
