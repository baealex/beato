import express, { Router } from 'express';
import path from 'path';

import { requireAuthenticatedHtmlRequest } from '~/modules/auth';
import type { AuthConfig } from '~/modules/auth-mode';

interface ClientAssetRouterOptions {
    distPath: string;
    indexPath: string;
}

export const createClientAssetRouter = (
    authConfig: AuthConfig,
    { distPath, indexPath }: ClientAssetRouterOptions
) => {
    return Router()
        .use(express.static(distPath, { index: false }))
        .use(requireAuthenticatedHtmlRequest(authConfig))
        .get('/{*splat}', (req, res) => {
            if (req.path.startsWith('/api/')) {
                return res.status(404).json({ message: 'Not Found' });
            }

            if (path.extname(req.path)) {
                return res.status(404).end();
            }

            res.sendFile(indexPath);
        });
};
