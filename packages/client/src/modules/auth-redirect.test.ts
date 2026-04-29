import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
    buildLoginRedirectUrl,
    redirectToLogin,
    resetAuthRedirectStateForTest,
    shouldRedirectToLogin
} from './auth-redirect';

const createAxiosError = (status: number, url = '/graphql') => ({
    isAxiosError: true,
    config: { url },
    response: { status }
});

const createLocation = (pathname: string) => {
    return {
        pathname,
        search: '?tab=queue',
        hash: '#now',
        assign: vi.fn()
    } as unknown as Pick<Location, 'assign' | 'hash' | 'pathname' | 'search'>;
};

describe('auth redirect', () => {
    beforeEach(() => {
        resetAuthRedirectStateForTest();
    });

    it('builds a login URL that preserves the current route', () => {
        expect(buildLoginRedirectUrl({
            pathname: '/playlist/7',
            search: '?tab=queue',
            hash: '#now'
        })).toBe('/login?redirectTo=%2Fplaylist%2F7%3Ftab%3Dqueue%23now');
    });

    it('redirects protected API failures to the login page', () => {
        expect(shouldRedirectToLogin(createAxiosError(401))).toBe(true);
    });

    it('does not redirect auth route or non-auth failures', () => {
        expect(shouldRedirectToLogin(createAxiosError(401, '/api/auth/session'))).toBe(false);
        expect(shouldRedirectToLogin(createAxiosError(401, '/login'))).toBe(false);
        expect(shouldRedirectToLogin(createAxiosError(500))).toBe(false);
    });

    it('does not start a login redirect loop from the login page', () => {
        const location = createLocation('/login');

        redirectToLogin(location);

        expect(location.assign).not.toHaveBeenCalled();
    });

    it('only starts one login redirect at a time', () => {
        const location = createLocation('/albums');

        redirectToLogin(location);
        redirectToLogin(location);

        expect(location.assign).toHaveBeenCalledTimes(1);
        expect(location.assign).toHaveBeenCalledWith('/login?redirectTo=%2Falbums%3Ftab%3Dqueue%23now');
    });
});
