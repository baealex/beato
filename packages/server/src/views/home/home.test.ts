import request from 'supertest';

import { createApp } from '~/app';
import { AUTH_SESSION_COOKIE_NAME, type AuthConfig } from '~/modules/auth-mode';

const openAuthConfig: AuthConfig = {
    mode: 'open',
    source: 'explicit-open',
    cookieName: AUTH_SESSION_COOKIE_NAME
};

describe('GET /home', () => {
    it('return text Hello, My Express JS!', async () => {
        const app = createApp(openAuthConfig);
        const res = await request(app).get('/api/home');
        expect(res.text).toContain('Hello, My Express JS!');
    });
});
