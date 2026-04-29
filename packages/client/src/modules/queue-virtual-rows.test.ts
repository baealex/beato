import { describe, expect, it } from 'vitest';

import {
    QUEUE_SECTION_ROW_HEIGHT,
    QUEUE_TRACK_CARD_HEIGHT,
    QUEUE_TRACK_ROW_GAP,
    QUEUE_TRACK_ROW_HEIGHT,
    buildQueueVirtualLayout,
    findQueueDropSlot,
    findQueueTrackRow,
    getQueueDropIndicatorTop,
    getVisibleQueueVirtualRows,
    resolveQueueDropIndex
} from './queue-virtual-rows';

describe('queue-virtual-rows', () => {
    it('builds sectioned rows around the current track', () => {
        const layout = buildQueueVirtualLayout(['a', 'b', 'c', 'd'], 1);

        expect(layout.rows.map((row) => row.type === 'section' ? row.label : `${row.tone}:${row.id}`)).toEqual([
            'Earlier',
            'past:a',
            'current:b',
            'Up next',
            'upcoming:c',
            'upcoming:d'
        ]);
        expect(layout.totalHeight).toBe(
            QUEUE_SECTION_ROW_HEIGHT * 2 + QUEUE_TRACK_ROW_HEIGHT * 4
        );
    });

    it('builds a single queue section when nothing is selected', () => {
        const layout = buildQueueVirtualLayout(['a', 'b'], -1);

        expect(layout.rows.map((row) => row.type === 'section' ? row.label : row.id)).toEqual([
            'Queue',
            'a',
            'b'
        ]);
    });

    it('returns only rows inside the visible range plus overscan', () => {
        const layout = buildQueueVirtualLayout(['a', 'b', 'c', 'd', 'e'], -1);

        expect(getVisibleQueueVirtualRows(layout.rows, 0, QUEUE_TRACK_ROW_HEIGHT + 10, 0).map((row) => row.key)).toEqual([
            'section-queue',
            'a'
        ]);
    });

    it('finds the rendered row metadata for a track index', () => {
        const layout = buildQueueVirtualLayout(['a', 'b', 'c'], 2);

        expect(findQueueTrackRow(layout.rows, 2)).toMatchObject({
            type: 'track',
            id: 'c',
            tone: 'current'
        });
    });

    it('resolves drop slots and target indices for drag reorder', () => {
        const layout = buildQueueVirtualLayout(['a', 'b', 'c'], -1);
        const firstTrackCenter = QUEUE_SECTION_ROW_HEIGHT + QUEUE_TRACK_ROW_HEIGHT / 2;
        const lastTrackBottom = QUEUE_SECTION_ROW_HEIGHT + QUEUE_TRACK_ROW_HEIGHT * 3;

        expect(findQueueDropSlot(layout.rows, firstTrackCenter - 8)).toBe(0);
        expect(findQueueDropSlot(layout.rows, firstTrackCenter + QUEUE_TRACK_ROW_HEIGHT)).toBe(2);
        expect(findQueueDropSlot(layout.rows, lastTrackBottom + 20)).toBe(3);
        expect(getQueueDropIndicatorTop(layout.rows, 2)).toBe(
            QUEUE_SECTION_ROW_HEIGHT + QUEUE_TRACK_ROW_HEIGHT * 2
        );
        expect(getQueueDropIndicatorTop(layout.rows, 0)).toBe(
            QUEUE_SECTION_ROW_HEIGHT + QUEUE_TRACK_ROW_GAP / 2
        );
        expect(getQueueDropIndicatorTop(layout.rows, 3)).toBe(
            QUEUE_SECTION_ROW_HEIGHT + QUEUE_TRACK_ROW_HEIGHT * 3 - QUEUE_TRACK_ROW_GAP / 2
        );
        expect(QUEUE_TRACK_CARD_HEIGHT + QUEUE_TRACK_ROW_GAP).toBe(QUEUE_TRACK_ROW_HEIGHT);
        expect(resolveQueueDropIndex(3, 0, 2)).toBe(1);
        expect(resolveQueueDropIndex(3, 2, 0)).toBe(0);
    });
});
