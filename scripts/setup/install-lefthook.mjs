import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';

if (!existsSync('.git')) {
    process.exit(0);
}

const result = spawnSync('lefthook', ['install'], {
    stdio: 'inherit',
    shell: process.platform === 'win32',
});

process.exit(result.status ?? 1);
