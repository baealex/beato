import { describe, expect, it } from 'vitest';

import { queryKeys } from './query-keys';

describe('queryKeys', () => {
    it('provides an auth session key', () => {
        expect(queryKeys.auth.session()).toEqual(['auth', { scope: 'session' }]);
    });

    it('uses stable object payloads for detail keys', () => {
        expect(queryKeys.albums.detail('3')).toEqual(['album', { id: '3' }]);
        expect(queryKeys.artists.detail('5')).toEqual(['artist', { id: '5' }]);
        expect(queryKeys.playlists.detail('7')).toEqual(['playlist', { id: '7' }]);
    });

    it('provides an explicit prefix helper for sync report invalidation', () => {
        expect(queryKeys.syncReports.listAll()).toEqual(['sync-report']);
        expect(queryKeys.syncReports.latest()).toEqual(['sync-report', { scope: 'latest' }]);
    });
});
