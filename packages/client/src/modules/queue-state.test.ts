import { describe, expect, it } from 'vitest';

import {
    deriveQueueState,
    deriveQueueStateFromTrack,
    moveQueueItemToIndex,
    reorderQueueItems
} from './queue-state';

describe('queue-state', () => {
    it('derives the current track id and queue length from a valid selection', () => {
        expect(deriveQueueState(['a', 'b', 'c'], 1)).toEqual({
            selected: 1,
            currentTrackId: 'b',
            queueLength: 3
        });
    });

    it('preserves the selected track when the queue shape changes', () => {
        expect(deriveQueueStateFromTrack(['x', 'a', 'b'], 'a')).toEqual({
            selected: 1,
            currentTrackId: 'a',
            queueLength: 3
        });
    });

    it('clears selection when the selected track disappears from the queue', () => {
        expect(deriveQueueStateFromTrack(['a', 'c'], 'b')).toEqual({
            selected: null,
            currentTrackId: null,
            queueLength: 2
        });
    });

    it('reorders queue items by id', () => {
        expect(reorderQueueItems(['a', 'b', 'c', 'd'], 'd', 'b')).toEqual([
            'a',
            'd',
            'b',
            'c'
        ]);
    });

    it('moves a queue item to an explicit index', () => {
        expect(moveQueueItemToIndex(['a', 'b', 'c', 'd'], 'a', 2)).toEqual([
            'b',
            'c',
            'a',
            'd'
        ]);
    });
});
