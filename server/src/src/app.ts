import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import path from 'path';

import {
    requireAuthenticatedGraphqlRequest,
    requireAuthenticatedHtmlRequest,
    requireAuthenticatedRequest
} from './modules/auth';
import { resolveAuthConfig, type AuthConfig } from './modules/auth-mode';
import logger from './modules/logger';
import { resolveCachePath } from './modules/storage-paths';
import useAsync from './modules/use-async';
import schema from './schema';
import { createApiRouter } from './urls';
import * as views from './views';

export const createApp = (authConfig: AuthConfig = resolveAuthConfig(process.env)) => {
    const clientDistPath = path.resolve('client/dist');
    const clientIndexPath = path.resolve(clientDistPath, 'index.html');

    return express()
        .use(logger)
        .use(express.urlencoded({ extended: false }))
        .use(express.json())
        .get('/login', useAsync(views.createLoginPageHandler(authConfig)))
        .post('/login', useAsync(views.createLoginPageSubmitHandler(authConfig)))
        .post('/logout', useAsync(views.createLogoutPageHandler(authConfig)))
        .get('/logout', (_req, res) => {
            res.status(404).end();
        })
        .use(
            '/cache',
            requireAuthenticatedRequest(authConfig),
            useAsync(views.cacheAsset),
            express.static(resolveCachePath(), {
                cacheControl: true,
                maxAge: 31536000
            })
        )
        .use('/graphql', requireAuthenticatedGraphqlRequest(authConfig), createHandler({ schema }))
        .use('/api', createApiRouter(authConfig))
        .use(express.static(clientDistPath, { index: false }))
        .use(requireAuthenticatedHtmlRequest(authConfig))
        .get('*', (req, res) => {
            if (req.path.startsWith('/api/')) {
                return res.status(404).json({ message: 'Not Found' });
            }

            if (path.extname(req.path)) {
                return res.status(404).end();
            }

            res.sendFile(clientIndexPath);
        });
};

export default createApp;
