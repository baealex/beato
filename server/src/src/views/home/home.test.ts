import request from 'supertest';

import { createApp } from '~/app';

describe('GET /home', () => {
    it('return text Hello, My Express JS!', async () => {
        const app = createApp({ mode: 'open' });
        const res = await request(app).get('/api/home');
        expect(res.text).toContain('Hello, My Express JS!');
    });
});
