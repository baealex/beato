import { describe, expect, it } from 'vitest';

import { getImage, getOriginalImage } from './image';

describe('getImage', () => {
    it('does not provide default artwork for an empty source', () => {
        expect(getImage()).toBe('');
        expect(getImage('')).toBe('');
        expect(getOriginalImage()).toBe('');
    });

    it('keeps provided artwork paths and removes resized segments for original artwork surfaces', () => {
        expect(getImage('/cache/resized/42.jpg')).toBe('/cache/resized/42.jpg');
        expect(getOriginalImage('/cache/resized/42.jpg')).toBe('/cache/42.jpg');
    });
});
