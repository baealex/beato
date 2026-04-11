import { describe, expect, it } from 'vitest';

import {
    ROOT_PAGER_PAGES,
    resolveRootPagerCommitIndex,
    resolveRootPagerReleaseVelocity,
    resolveRootPagerPageIndex,
    shouldActivateRootPagerGesture
} from './root-pager';

describe('root pager pages', () => {
    it('keeps the top-level page order stable', () => {
        expect(ROOT_PAGER_PAGES.map(page => page.path)).toEqual([
            '/',
            '/favorite',
            '/album',
            '/artist',
            '/playlist',
            '/setting'
        ]);
    });

    it('resolves exact indexes for top-level routes only', () => {
        expect(resolveRootPagerPageIndex('/')).toBe(0);
        expect(resolveRootPagerPageIndex('/playlist')).toBe(4);
        expect(resolveRootPagerPageIndex('/album/42')).toBe(-1);
    });
});

describe('root pager gesture decisions', () => {
    it('claims only clear horizontal swipes', () => {
        expect(shouldActivateRootPagerGesture({
            deltaX: 24,
            deltaY: 6
        })).toBe(true);
        expect(shouldActivateRootPagerGesture({
            deltaX: 3,
            deltaY: 2
        })).toBe(false);
        expect(shouldActivateRootPagerGesture({
            deltaX: 24,
            deltaY: 28
        })).toBe(false);
        expect(shouldActivateRootPagerGesture({
            deltaX: 14,
            deltaY: 12
        })).toBe(true);
    });

    it('commits to the adjacent page only when distance or velocity is sufficient', () => {
        expect(resolveRootPagerCommitIndex({
            currentIndex: 2,
            maxIndex: 5,
            offset: -96,
            width: 320,
            velocityPxPerMs: -0.1
        })).toBe(3);
        expect(resolveRootPagerCommitIndex({
            currentIndex: 2,
            maxIndex: 5,
            offset: 48,
            width: 320,
            velocityPxPerMs: 0.55
        })).toBe(1);
        expect(resolveRootPagerCommitIndex({
            currentIndex: 0,
            maxIndex: 5,
            offset: 120,
            width: 320,
            velocityPxPerMs: 0.7
        })).toBe(0);
        expect(resolveRootPagerCommitIndex({
            currentIndex: 2,
            maxIndex: 5,
            offset: -64,
            width: 320,
            velocityPxPerMs: -0.1
        })).toBe(2);
    });

    it('uses recent movement samples to estimate release velocity', () => {
        expect(resolveRootPagerReleaseVelocity({
            samples: [
                {
                    x: 10,
                    at: 0
                },
                {
                    x: 34,
                    at: 40
                },
                {
                    x: 82,
                    at: 100
                }
            ],
            releasedX: 106,
            releasedAt: 140
        })).toBeCloseTo(0.72, 3);

        expect(resolveRootPagerReleaseVelocity({
            samples: [],
            releasedX: 120,
            releasedAt: 200
        })).toBe(0);
    });
});
