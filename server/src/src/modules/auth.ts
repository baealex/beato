import crypto from 'crypto';
import type { Request, Response, RequestHandler } from 'express';
import type { Socket } from 'socket.io';

import type { AuthConfig, AuthMode } from './auth-mode';

export interface AuthSessionResponse {
    mode: AuthMode;
    authRequired: boolean;
    authenticated: boolean;
}

const JSON_HEADERS = { 'Content-Type': 'application/json' };
const SESSION_COOKIE_NAME = 'ocean-wave.sid';
const AUTHENTICATED_SESSION_VALUE = 'authenticated';

const UNAUTHORIZED_PAYLOAD = {
    code: 'UNAUTHORIZED',
    message: 'Authentication required'
} as const;

const UNAUTHORIZED_GRAPHQL_PAYLOAD = {
    errors: [{
        message: 'Authentication required',
        extensions: { code: 'UNAUTHORIZED' }
    }]
} as const;

const normalizeCookieHeader = (cookieHeader?: string | string[]) => {
    if (!cookieHeader) {
        return '';
    }

    return Array.isArray(cookieHeader)
        ? cookieHeader.join(';')
        : cookieHeader;
};

const parseCookieHeader = (cookieHeader?: string | string[]) => {
    return normalizeCookieHeader(cookieHeader)
        .split(';')
        .map((segment) => segment.trim())
        .filter(Boolean)
        .reduce<Record<string, string>>((cookies, segment) => {
            const separatorIndex = segment.indexOf('=');

            if (separatorIndex === -1) {
                return cookies;
            }

            const key = decodeURIComponent(segment.slice(0, separatorIndex).trim());
            const value = decodeURIComponent(segment.slice(separatorIndex + 1).trim());

            cookies[key] = value;
            return cookies;
        }, {});
};

const getSigningSecret = (authConfig: AuthConfig) => authConfig.sessionSecret || authConfig.password || '';

const signSessionValue = (value: string, authConfig: AuthConfig) => {
    return crypto
        .createHmac('sha256', getSigningSecret(authConfig))
        .update(value)
        .digest('base64url');
};

export const compareSharedSecret = (expected: string, actual: string) => {
    const expectedBuffer = Buffer.from(expected, 'utf8');
    const actualBuffer = Buffer.from(actual, 'utf8');

    if (expectedBuffer.length !== actualBuffer.length) {
        return false;
    }

    return crypto.timingSafeEqual(expectedBuffer, actualBuffer);
};

export const createAuthenticatedSessionValue = (authConfig: AuthConfig) => {
    return `${AUTHENTICATED_SESSION_VALUE}.${signSessionValue(AUTHENTICATED_SESSION_VALUE, authConfig)}`;
};

export const isAuthenticatedCookieHeader = (
    authConfig: AuthConfig,
    cookieHeader?: string | string[]
) => {
    if (authConfig.mode === 'open') {
        return true;
    }

    const sessionCookie = parseCookieHeader(cookieHeader)[SESSION_COOKIE_NAME];

    if (!sessionCookie) {
        return false;
    }

    const separatorIndex = sessionCookie.indexOf('.');

    if (separatorIndex === -1) {
        return false;
    }

    const value = sessionCookie.slice(0, separatorIndex);
    const signature = sessionCookie.slice(separatorIndex + 1);

    if (value !== AUTHENTICATED_SESSION_VALUE || !signature) {
        return false;
    }

    return compareSharedSecret(signSessionValue(value, authConfig), signature);
};

export const isAuthenticatedRequest = (authConfig: AuthConfig, req: Request) => {
    return isAuthenticatedCookieHeader(authConfig, req.headers.cookie);
};

export const buildAuthSessionResponse = (
    authConfig: AuthConfig,
    authenticated: boolean
): AuthSessionResponse => {
    return {
        mode: authConfig.mode,
        authRequired: authConfig.mode === 'password-protected',
        authenticated: authConfig.mode === 'password-protected'
            ? authenticated
            : false
    };
};

export const resolveAuthSessionResponse = (
    authConfig: AuthConfig,
    req: Request
) => {
    return buildAuthSessionResponse(authConfig, isAuthenticatedRequest(authConfig, req));
};

export const setAuthenticatedSession = (authConfig: AuthConfig, res: Response) => {
    res.cookie(SESSION_COOKIE_NAME, createAuthenticatedSessionValue(authConfig), {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/'
    });
};

export const clearAuthenticatedSession = (res: Response) => {
    res.clearCookie(SESSION_COOKIE_NAME, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/'
    });
};

export const requireAuthenticatedRequest = (authConfig: AuthConfig): RequestHandler => {
    return (req, res, next) => {
        if (isAuthenticatedRequest(authConfig, req)) {
            next();
            return;
        }

        res.status(401).set(JSON_HEADERS).json(UNAUTHORIZED_PAYLOAD).end();
    };
};

export const requireAuthenticatedGraphqlRequest = (authConfig: AuthConfig): RequestHandler => {
    return (req, res, next) => {
        if (isAuthenticatedRequest(authConfig, req)) {
            next();
            return;
        }

        res.status(401).set(JSON_HEADERS).json(UNAUTHORIZED_GRAPHQL_PAYLOAD).end();
    };
};

export const requireAuthenticatedSocketConnection = (authConfig: AuthConfig) => {
    return (socket: Socket, next: (error?: Error) => void) => {
        if (isAuthenticatedCookieHeader(authConfig, socket.handshake.headers.cookie)) {
            next();
            return;
        }

        next(new Error('Authentication required'));
    };
};
