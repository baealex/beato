import { describe, expect, it } from 'vitest';

import { resolveMixDuration, shouldStartMix } from './mix-timing';

describe('mix timing', () => {
    it('prefers metadata duration over unstable media duration', () => {
        expect(shouldStartMix({
            currentTime: 35,
            fadeTime: 20,
            metadataDuration: 240,
            mediaDuration: 50
        })).toBe(false);
    });

    it('starts mix when metadata duration reaches the fade window', () => {
        expect(shouldStartMix({
            currentTime: 221,
            fadeTime: 20,
            metadataDuration: 240,
            mediaDuration: Number.NaN
        })).toBe(true);
    });

    it('falls back to media duration when metadata duration is unavailable', () => {
        expect(resolveMixDuration({
            metadataDuration: null,
            mediaDuration: 180
        })).toBe(180);
    });

    it('does not start mix for tracks shorter than the fade window', () => {
        expect(shouldStartMix({
            currentTime: 3,
            fadeTime: 20,
            metadataDuration: 12,
            mediaDuration: 12
        })).toBe(false);
    });
});
