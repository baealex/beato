import {
    createAuthenticatedSessionValue,
    isAuthenticatedCookieHeader
} from '~/modules/auth';
import { resolveAuthConfig } from '~/modules/auth-mode';

describe('auth helpers', () => {
    it('resolves open mode when no password is configured', () => {
        expect(resolveAuthConfig({})).toEqual({ mode: 'open' });
    });

    it('accepts only signed session cookies in password-protected mode', () => {
        const authConfig = resolveAuthConfig({
            OCEAN_WAVE_AUTH_PASSWORD: 'secret',
            OCEAN_WAVE_SESSION_SECRET: 'session-secret'
        });

        const sessionCookie = `ocean-wave.sid=${createAuthenticatedSessionValue(authConfig)}`;

        expect(isAuthenticatedCookieHeader(authConfig, sessionCookie)).toBe(true);
        expect(isAuthenticatedCookieHeader(authConfig, 'ocean-wave.sid=tampered')).toBe(false);
        expect(isAuthenticatedCookieHeader(authConfig, undefined)).toBe(false);
    });

    it('treats open mode as always authenticated for request guards', () => {
        expect(isAuthenticatedCookieHeader({ mode: 'open' }, undefined)).toBe(true);
    });
});
