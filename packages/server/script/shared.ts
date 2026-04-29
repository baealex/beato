import fs from 'fs';
import childProcess from 'child_process';
import path from 'path';

const prismaPath = path.resolve(__dirname, '../prisma');
const packagePath = path.resolve(__dirname, '..');
type MigrationMode = 'dev' | 'deploy';

export const createDatabase = async (mode: MigrationMode = 'dev') => {
    childProcess.execSync(`pnpm exec prisma migrate ${mode}`, {
        stdio: 'inherit',
    });
};

export const removeDatabase = async (fileName = 'db.sqlite3') => {
    const databasePaths = [
        path.resolve(packagePath, fileName),
        path.resolve(prismaPath, fileName)
    ];

    for (const databasePath of databasePaths) {
        if (fs.existsSync(databasePath)) {
            fs.unlinkSync(databasePath);
        }
    }
};
