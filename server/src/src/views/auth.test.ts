import request from 'supertest';

import { createApp } from '~/app';

describe('auth http flow', () => {
    it('keeps existing open-mode behavior when no password is configured', async () => {
        const app = createApp({ mode: 'open' });

        const session = await request(app).get('/api/auth/session');
        expect(session.status).toBe(200);
        expect(session.body).toEqual({
            mode: 'open',
            authRequired: false,
            authenticated: false
        });

        const home = await request(app).get('/api/home');
        expect(home.status).toBe(200);
        expect(home.text).toContain('Hello, My Express JS!');

        const graphql = await request(app)
            .post('/graphql')
            .send({ query: 'query { __typename }' });

        expect(graphql.status).toBe(200);
        expect(graphql.body.data.__typename).toBe('Query');

        const login = await request(app)
            .post('/api/auth/login')
            .send({ password: 'secret' });

        expect(login.status).toBe(409);
        expect(login.body.code).toBe('AUTH_DISABLED');
    });

    it('protects api and graphql in password mode until login, then clears access on logout', async () => {
        const app = createApp({
            mode: 'password-protected',
            password: 'secret',
            sessionSecret: 'session-secret'
        });

        const agent = request.agent(app);

        const anonymousSession = await agent.get('/api/auth/session');
        expect(anonymousSession.status).toBe(200);
        expect(anonymousSession.body).toEqual({
            mode: 'password-protected',
            authRequired: true,
            authenticated: false
        });

        const anonymousHome = await agent.get('/api/home');
        expect(anonymousHome.status).toBe(401);
        expect(anonymousHome.body.code).toBe('UNAUTHORIZED');

        const anonymousGraphql = await agent
            .post('/graphql')
            .send({ query: 'query { __typename }' });

        expect(anonymousGraphql.status).toBe(401);
        expect(anonymousGraphql.body.errors[0].extensions.code).toBe('UNAUTHORIZED');

        const wrongPassword = await agent
            .post('/api/auth/login')
            .send({ password: 'wrong' });

        expect(wrongPassword.status).toBe(401);
        expect(wrongPassword.body.code).toBe('UNAUTHORIZED');

        const login = await agent
            .post('/api/auth/login')
            .send({ password: 'secret' });

        expect(login.status).toBe(200);
        expect(login.body).toEqual({
            mode: 'password-protected',
            authRequired: true,
            authenticated: true
        });

        const authenticatedSession = await agent.get('/api/auth/session');
        expect(authenticatedSession.status).toBe(200);
        expect(authenticatedSession.body).toEqual({
            mode: 'password-protected',
            authRequired: true,
            authenticated: true
        });

        const authenticatedHome = await agent.get('/api/home');
        expect(authenticatedHome.status).toBe(200);
        expect(authenticatedHome.text).toContain('Hello, My Express JS!');

        const authenticatedGraphql = await agent
            .post('/graphql')
            .send({ query: 'query { __typename }' });

        expect(authenticatedGraphql.status).toBe(200);
        expect(authenticatedGraphql.body.data.__typename).toBe('Query');

        const logout = await agent
            .post('/api/auth/logout')
            .send({});

        expect(logout.status).toBe(200);
        expect(logout.body).toEqual({
            mode: 'password-protected',
            authRequired: true,
            authenticated: false
        });

        const postLogoutHome = await agent.get('/api/home');
        expect(postLogoutHome.status).toBe(401);
        expect(postLogoutHome.body.code).toBe('UNAUTHORIZED');
    });
});
