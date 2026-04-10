import { albumResolvers } from './index';

describe('album cover resolver', () => {
    it('returns the canonical cover route from album id', () => {
        const cover = (albumResolvers.Album as { cover: (album: { id: number; cover: string }) => string }).cover({
            id: 42,
            cover: '/cache/resized/999.jpg'
        });

        expect(cover).toBe('/cache/resized/42.jpg');
    });

    it('keeps empty cover values empty', () => {
        const cover = (albumResolvers.Album as { cover: (album: { id: number; cover: string }) => string }).cover({
            id: 42,
            cover: ''
        });

        expect(cover).toBe('');
    });
});
