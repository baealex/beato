import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import path from 'path';

import logger from './modules/logger';
import router from './urls';
import schema from './schema';

export default express()
    .use(logger)
    .use(express.static(path.resolve('client/dist'), { extensions: ['html'] }))
    .use('/cache', express.static(path.resolve('cache'), {
        cacheControl: true,
        maxAge: 31536000
    }))
    .use(express.json())
    .use('/graphql', createHandler({ schema }))
    .use('/api', router)
    .get('*', (req, res) => {
        if (req.path.startsWith('/api/')) {
            return res.status(404).json({ message: 'Not Found' });
        }
        res.sendFile(path.resolve('client/dist/index.html'));
    });
