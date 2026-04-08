import type { Controller } from '~/types';

import {
    buildAuthSessionResponse,
    clearAuthenticatedSession,
    compareSharedSecret,
    resolveAuthSessionResponse,
    setAuthenticatedSession
} from '~/modules/auth';
import type { AuthConfig } from '~/modules/auth-mode';

const AUTH_DISABLED_RESPONSE = {
    code: 'AUTH_DISABLED',
    message: 'Login is unavailable while auth mode is open.'
} as const;

const INVALID_PASSWORD_RESPONSE = {
    code: 'UNAUTHORIZED',
    message: 'Invalid password'
} as const;

export const createSessionStatusHandler = (authConfig: AuthConfig): Controller => {
    return async (req, res) => {
        res.status(200).json(resolveAuthSessionResponse(authConfig, req)).end();
    };
};

export const createLoginHandler = (authConfig: AuthConfig): Controller => {
    return async (req, res) => {
        if (authConfig.mode !== 'password-protected' || !authConfig.password) {
            res.status(409).json(AUTH_DISABLED_RESPONSE).end();
            return;
        }

        const password = typeof req.body?.password === 'string'
            ? req.body.password
            : '';

        if (!password || !compareSharedSecret(authConfig.password, password)) {
            res.status(401).json(INVALID_PASSWORD_RESPONSE).end();
            return;
        }

        setAuthenticatedSession(authConfig, res);
        res.status(200).json(buildAuthSessionResponse(authConfig, true)).end();
    };
};

export const createLogoutHandler = (authConfig: AuthConfig): Controller => {
    return async (_req, res) => {
        clearAuthenticatedSession(res);
        res.status(200).json(buildAuthSessionResponse(authConfig, false)).end();
    };
};
