import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import path from 'path';

import {
    requireAuthenticatedGraphqlRequest,
    requireAuthenticatedRequest
} from './modules/auth';
import { resolveAuthConfig, type AuthConfig } from './modules/auth-mode';
import logger from './modules/logger';
import schema from './schema';
import { createApiRouter } from './urls';

export const createApp = (authConfig: AuthConfig = resolveAuthConfig(process.env)) => {
    return express()
        .use(logger)
        .use(express.static(path.resolve('client/dist'), { extensions: ['html'] }))
        .use('/cache', requireAuthenticatedRequest(authConfig), express.static(path.resolve('cache'), {
            cacheControl: true,
            maxAge: 31536000
        }))
        .use(express.json())
        .use('/graphql', requireAuthenticatedGraphqlRequest(authConfig), createHandler({ schema }))
        .use('/api', createApiRouter(authConfig))
        .get('*', (req, res) => {
            if (req.path.startsWith('/api/')) {
                return res.status(404).json({ message: 'Not Found' });
            }
            res.sendFile(path.resolve('client/dist/index.html'));
        });
};

export default createApp();
