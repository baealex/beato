import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [svelte()],
    resolve: {
        alias: {
            '~': path.resolve(__dirname, './src'),
        },
    },
    server: {
        host: '0.0.0.0',
        proxy: {
            '/api': {
                target: 'http://localhost:4000',
            },
            '/cache': {
                target: 'http://localhost:4000',
            },
            '/graphql': {
                target: 'http://localhost:4000',
            },
            '/socket.io': {
                target: 'http://localhost:4000',
                ws: true,
                onProxyReqWs: (proxyReq) => {
                    proxyReq.setHeader('Origin', 'http://localhost:4000');
                },
            },
        }
    }
});
