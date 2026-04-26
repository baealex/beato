import express, { Router } from 'express';

import { requireAuthenticatedRequest } from '~/modules/auth';
import type { AuthConfig } from '~/modules/auth-mode';
import { resolveCachePath } from '~/modules/storage-paths';
import useAsync from '~/modules/use-async';
import * as views from '~/views';

export const createCacheAssetRouter = (authConfig: AuthConfig) => {
    return Router().use(
        '/cache',
        requireAuthenticatedRequest(authConfig),
        useAsync(views.cacheAsset),
        express.static(resolveCachePath(), {
            cacheControl: true,
            maxAge: 31536000
        })
    );
};
