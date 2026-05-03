import { describe, expect, it } from 'vitest';

import { DEFAULT_ALBUM_ART, getImage, getOriginalImage } from './image';

describe('getImage', () => {
    it('provides default artwork for an empty source', () => {
        expect(getImage()).toBe(DEFAULT_ALBUM_ART);
        expect(getImage('')).toBe(DEFAULT_ALBUM_ART);
        expect(getOriginalImage()).toBe(DEFAULT_ALBUM_ART);
    });

    it('keeps provided artwork paths and removes resized segments for original artwork surfaces', () => {
        expect(getImage('/cache/resized/42.jpg')).toBe('/cache/resized/42.jpg');
        expect(getOriginalImage('/cache/resized/42.jpg')).toBe('/cache/42.jpg');
    });
});
