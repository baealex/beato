import {
    createAuthenticatedSessionValue,
    isAuthenticatedCookieHeader
} from '~/modules/auth';
import { AUTH_SESSION_COOKIE_NAME, resolveAuthConfig, type AuthConfig } from '~/modules/auth-mode';

const openAuthConfig: AuthConfig = {
    mode: 'open',
    source: 'explicit-open',
    cookieName: AUTH_SESSION_COOKIE_NAME
};

describe('auth helpers', () => {
    it('fails closed when neither password nor explicit open mode is configured', () => {
        expect(() => resolveAuthConfig({})).toThrow('Unable to resolve auth mode');
    });

    it('resolves explicit open mode only when insecure no-auth is allowed', () => {
        expect(resolveAuthConfig({ OCEAN_WAVE_ALLOW_INSECURE_NO_AUTH: 'true' })).toEqual(openAuthConfig);
    });

    it('requires a dedicated session secret in password mode', () => {
        expect(() => resolveAuthConfig({ OCEAN_WAVE_AUTH_PASSWORD: 'secret' })).toThrow('Missing OCEAN_WAVE_SESSION_SECRET');
    });

    it('fails closed when password mode and open mode are both configured', () => {
        expect(() => resolveAuthConfig({
            OCEAN_WAVE_AUTH_PASSWORD: 'secret',
            OCEAN_WAVE_SESSION_SECRET: 'session-secret',
            OCEAN_WAVE_ALLOW_INSECURE_NO_AUTH: 'true'
        })).toThrow('Conflicting auth config');
    });

    it('accepts only signed session cookies in password mode', () => {
        const authConfig = resolveAuthConfig({
            OCEAN_WAVE_AUTH_PASSWORD: 'secret',
            OCEAN_WAVE_SESSION_SECRET: 'session-secret'
        });

        const sessionCookie = `${AUTH_SESSION_COOKIE_NAME}=${createAuthenticatedSessionValue(authConfig)}`;

        expect(isAuthenticatedCookieHeader(authConfig, sessionCookie)).toBe(true);
        expect(isAuthenticatedCookieHeader(authConfig, `${AUTH_SESSION_COOKIE_NAME}=tampered`)).toBe(false);
        expect(isAuthenticatedCookieHeader(authConfig, undefined)).toBe(false);
    });

    it('treats open mode as always authenticated for request guards', () => {
        expect(isAuthenticatedCookieHeader(openAuthConfig, undefined)).toBe(true);
    });
});
