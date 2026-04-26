import { Router } from 'express';
import { createHandler } from 'graphql-http/lib/use/express';

import { requireAuthenticatedGraphqlRequest } from '~/modules/auth';
import type { AuthConfig } from '~/modules/auth-mode';
import schema from '~/schema';

export const createGraphqlRouter = (authConfig: AuthConfig) => {
    return Router().use(
        '/graphql',
        requireAuthenticatedGraphqlRequest(authConfig),
        createHandler({ schema })
    );
};
