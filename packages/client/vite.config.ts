import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import svgr from 'vite-plugin-svgr';
import { defineConfig } from 'vitest/config';

const vendorModules = [
    'react',
    'react-dom',
    'react-router-dom',
    'react-router',
    '@tanstack/react-query',
    '@dnd-kit/core',
    '@dnd-kit/sortable',
    '@dnd-kit/modifiers',
    '@dnd-kit/utilities'
];

function getManualChunk(id: string) {
    const normalizedId = id.replaceAll('\\', '/');
    if (!normalizedId.includes('/node_modules/')) return undefined;

    if (vendorModules.some((moduleName) => normalizedId.includes(`/node_modules/${moduleName}/`))) {
        return 'vendor';
    }

    return undefined;
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        svgr(),
        tailwindcss()
    ],
    css: { preprocessorOptions: { scss: { api: 'modern' } } },
    resolve: { alias: { '~': path.resolve(__dirname, './src') } },
    build: {
        sourcemap: false,
        rollupOptions: {
            output: {
                manualChunks: getManualChunk
            }
        }
    },
    server: {
        host: '0.0.0.0',
        proxy: {
            '/api': { target: 'http://localhost:44100' },
            '/cache': { target: 'http://localhost:44100' },
            '/graphql': { target: 'http://localhost:44100' },
            '/login': { target: 'http://localhost:44100' },
            '/logout': { target: 'http://localhost:44100' },
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
