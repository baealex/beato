import { Router } from 'express';

import type { AuthConfig } from '~/modules/auth-mode';
import useAsync from '~/modules/use-async';
import * as views from '~/views';

export const createAuthPageRouter = (authConfig: AuthConfig) => {
    return Router()
        .get('/login', useAsync(views.createLoginPageHandler(authConfig)))
        .post('/login', useAsync(views.createLoginPageSubmitHandler(authConfig)))
        .post('/logout', useAsync(views.createLogoutPageHandler(authConfig)))
        .get('/logout', (_req, res) => {
            res.status(404).end();
        });
};
