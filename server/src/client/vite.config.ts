import react from '@vitejs/plugin-react';
import path from 'path';
import svgr from 'vite-plugin-svgr';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        svgr()
    ],
    css: { preprocessorOptions: { scss: { api: 'modern' } } },
    resolve: { alias: { '~': path.resolve(__dirname, './src') } },
    build: {
        sourcemap: false,
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: [
                        'react',
                        'react-dom',
                        'react-router-dom',
                        'react-router',
                        'react-query',
                        'react-query/devtools',
                        '@dnd-kit/core',
                        '@dnd-kit/sortable',
                        '@dnd-kit/modifiers',
                        '@dnd-kit/utilities'
                    ]
                }
            }
        }
    },
    server: {
        host: '0.0.0.0',
        proxy: {
            '/api': { target: 'http://localhost:44100' },
            '/cache': { target: 'http://localhost:44100' },
            '/graphql': { target: 'http://localhost:44100' },
            '/socket.io': {
                target: 'http://localhost:44100',
                ws: true,
                onProxyReqWs: (proxyReq) => {
                    proxyReq.setHeader('Origin', 'http://localhost:44100');
                }
            }
        }
    },
    test: {
        environment: 'node',
        include: ['src/**/*.test.ts'],
        setupFiles: ['./src/test/setup.ts']
    }
});
