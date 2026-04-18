import { describe, expect, it } from 'vitest';

import {
    resolveFixedVirtualItemTop,
    resolveFixedVirtualRange
} from './fixed-virtual-list';

describe('fixed virtual list range', () => {
    it('returns an empty range when there is nothing to render', () => {
        expect(resolveFixedVirtualRange({
            count: 0,
            rowHeight: 80,
            scrollTop: 0,
            viewportHeight: 720
        })).toEqual({
            startIndex: 0,
            endIndex: 0,
            totalHeight: 0
        });
    });

    it('includes overscan rows around the visible viewport', () => {
        expect(resolveFixedVirtualRange({
            count: 200,
            rowHeight: 80,
            scrollTop: 400,
            viewportHeight: 640,
            overscanPx: 160
        })).toEqual({
            startIndex: 3,
            endIndex: 15,
            totalHeight: 16000
        });
    });

    it('clamps the visible range to the list boundaries', () => {
        expect(resolveFixedVirtualRange({
            count: 10,
            rowHeight: 96,
            scrollTop: 900,
            viewportHeight: 480,
            overscanPx: 240
        })).toEqual({
            startIndex: 6,
            endIndex: 10,
            totalHeight: 960
        });
    });
});

describe('fixed virtual list layout', () => {
    it('resolves row top positions from the fixed height', () => {
        expect(resolveFixedVirtualItemTop({
            index: 4,
            rowHeight: 80
        })).toBe(320);
    });
});
