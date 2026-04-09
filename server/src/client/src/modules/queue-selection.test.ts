import { describe, expect, it } from 'vitest';

import { getNextSelectedIndexAfterRemovingCurrent } from './queue-selection';

describe('getNextSelectedIndexAfterRemovingCurrent', () => {
    it('keeps the same index when a following item still exists', () => {
        expect(getNextSelectedIndexAfterRemovingCurrent(1, 3)).toBe(1);
    });

    it('falls back to the last valid index when the removed item was the final item', () => {
        expect(getNextSelectedIndexAfterRemovingCurrent(2, 2)).toBe(1);
    });

    it('returns zero when the first item is removed and one item remains', () => {
        expect(getNextSelectedIndexAfterRemovingCurrent(0, 1)).toBe(0);
    });
});
