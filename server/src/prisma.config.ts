import { loadEnvFile } from 'node:process';
import { defineConfig, env } from 'prisma/config';

try {
    loadEnvFile();
} catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
        throw error;
    }
}

export default defineConfig({
    schema: 'prisma/schema.prisma',
    datasource: {
        url: env('DATABASE_URL')
    }
});
