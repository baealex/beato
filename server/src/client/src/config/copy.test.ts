import { describe, expect, it } from 'vitest';

import { appCopy } from './copy';

describe('appCopy', () => {
    it('points the default artwork at the Ocean Wave asset', () => {
        expect(appCopy.media.defaultArtworkPath).toBe('/images/ocean-wave.jpg');
    });

    it('keeps the default artwork path on the local public asset surface', () => {
        expect(appCopy.media.defaultArtworkPath.startsWith('/images/')).toBe(true);
        expect(appCopy.media.defaultArtworkPath.endsWith('.jpg')).toBe(true);
    });
});
