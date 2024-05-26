import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        svgr()
    ],
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
                        'framer-motion',
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
            '/api': { target: 'http://localhost:4000' },
            '/cache': { target: 'http://localhost:4000' },
            '/graphql': { target: 'http://localhost:4000' },
            '/socket.io': {
                target: 'http://localhost:4000',
                ws: true,
                onProxyReqWs: (proxyReq) => {
                    proxyReq.setHeader('Origin', 'http://localhost:4000');
                }
            }
        }
    }
});
