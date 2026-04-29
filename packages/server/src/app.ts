import express from 'express';
import path from 'path';

import { resolveAuthConfig, type AuthConfig } from './modules/auth-mode';
import logger from './modules/logger';
import {
    createAuthPageRouter,
    createCacheAssetRouter,
    createClientAssetRouter,
    createGraphqlRouter
} from './routes';
import { createApiRouter } from './urls';

export const createApp = (authConfig: AuthConfig = resolveAuthConfig(process.env)) => {
    const clientDistPath = path.resolve('..', 'client', 'dist');
    const clientIndexPath = path.resolve(clientDistPath, 'index.html');

    return express()
        .use(logger)
        .use(express.urlencoded({ extended: false }))
        .use(express.json())
        .use(createAuthPageRouter(authConfig))
        .use(createCacheAssetRouter(authConfig))
        .use(createGraphqlRouter(authConfig))
        .use('/api', createApiRouter(authConfig))
        .use(createClientAssetRouter(authConfig, {
            distPath: clientDistPath,
            indexPath: clientIndexPath
        }));
};

export default createApp;
