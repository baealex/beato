import path from 'path';
import type { Request, Response, RequestHandler } from 'express';
import type { Socket } from 'socket.io';
import {
    buildAuthSessionResponse,
    buildUnauthorizedGraphqlPayload,
    buildUnauthorizedPayload,
    sanitizeRedirectPath
} from '@baejino/auth';
import { parseCookieHeader } from '@baejino/auth/cookies';
import {
    compareSharedSecret,
    createAuthenticatedSessionValue as createCommonAuthenticatedSessionValue,
    verifyAuthenticatedSessionValue
} from '@baejino/auth/crypto';

import type { AuthConfig } from './auth-mode';

export type { AuthSessionResponse } from '@baejino/auth';
export { buildAuthSessionResponse, compareSharedSecret };

const JSON_HEADERS = { 'Content-Type': 'application/json' };
const LOGIN_PATH = '/login';
const LOCALHOST_REDIRECT_HOSTS = [
    'localhost',
    '127.0.0.1',
    '::1',
    '[::1]'
] as const;

const createLoginRedirectUrl = (redirectTo: string) => {
    return `${LOGIN_PATH}?redirectTo=${encodeURIComponent(redirectTo)}`;
};

export const createAuthenticatedSessionValue = (authConfig: AuthConfig) => {
    if (authConfig.mode !== 'password') {
        throw new Error('Authenticated session can only be created in password auth mode.');
    }

    return createCommonAuthenticatedSessionValue(authConfig);
};

export const isAuthenticatedCookieHeader = (
    authConfig: AuthConfig,
    cookieHeader?: string | string[]
) => {
    if (authConfig.mode === 'open') {
        return true;
    }

    const sessionCookie = parseCookieHeader(cookieHeader ?? null)[authConfig.cookieName];

    if (!sessionCookie) {
        return false;
    }

    return verifyAuthenticatedSessionValue(sessionCookie, authConfig);
};

export const isAuthenticatedRequest = (authConfig: AuthConfig, req: Request) => {
    return isAuthenticatedCookieHeader(authConfig, req.headers.cookie);
};

export const resolveAuthSessionResponse = (
    authConfig: AuthConfig,
    req: Request
) => {
    return buildAuthSessionResponse(authConfig, isAuthenticatedRequest(authConfig, req));
};

export const resolveRedirectPath = (value: unknown) => {
    return sanitizeRedirectPath(value, {
        loginPath: LOGIN_PATH,
        allowedAbsoluteHosts: LOCALHOST_REDIRECT_HOSTS
    });
};

export const setAuthenticatedSession = (authConfig: AuthConfig, res: Response) => {
    res.cookie(authConfig.cookieName, createAuthenticatedSessionValue(authConfig), {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/'
    });
};

export const clearAuthenticatedSession = (authConfig: AuthConfig, res: Response) => {
    res.clearCookie(authConfig.cookieName, {
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

        res.status(401).set(JSON_HEADERS).json(buildUnauthorizedPayload()).end();
    };
};

export const requireAuthenticatedGraphqlRequest = (authConfig: AuthConfig): RequestHandler => {
    return (req, res, next) => {
        if (isAuthenticatedRequest(authConfig, req)) {
            next();
            return;
        }

        res.status(401).set(JSON_HEADERS).json(buildUnauthorizedGraphqlPayload()).end();
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

export const requireAuthenticatedHtmlRequest = (authConfig: AuthConfig): RequestHandler => {
    return (req, res, next) => {
        if (req.method !== 'GET' && req.method !== 'HEAD') {
            next();
            return;
        }

        if (path.extname(req.path)) {
            next();
            return;
        }

        if (isAuthenticatedRequest(authConfig, req)) {
            next();
            return;
        }

        const redirectTo = resolveRedirectPath(req.originalUrl || req.url || req.path);

        res.redirect(303, createLoginRedirectUrl(redirectTo));
    };
};
