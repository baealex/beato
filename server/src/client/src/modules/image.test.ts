import { describe, expect, it } from 'vitest';

import { getImage, getOriginalImage } from './image';

describe('getImage', () => {
    it('returns the default artwork when the source is empty', () => {
        expect(getImage()).toBe('/images/ocean-wave.jpg');
        expect(getImage('')).toBe('/images/ocean-wave.jpg');
    });

    it('returns the provided source when it exists', () => {
        expect(getImage('/cache/resized/42.jpg')).toBe('/cache/resized/42.jpg');
    });
});

describe('getOriginalImage', () => {
    it('keeps the default artwork path intact', () => {
        expect(getOriginalImage()).toBe('/images/ocean-wave.jpg');
    });

    it('removes the resized path segment for original artwork surfaces', () => {
        expect(getOriginalImage('/cache/resized/42.jpg')).toBe('/cache/42.jpg');
    });
});
