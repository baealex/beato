import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..', '..');

const readJson = (...segments) =>
    JSON.parse(readFileSync(path.join(repoRoot, ...segments), 'utf8'));

const readText = (...segments) =>
    readFileSync(path.join(repoRoot, ...segments), 'utf8');

test('package manifests use Ocean Wave identifiers', () => {
    const rootPackage = readJson('package.json');
    const serverPackage = readJson('server', 'src', 'package.json');
    const clientPackage = readJson('server', 'src', 'client', 'package.json');

    assert.equal(rootPackage.name, 'ocean-wave');
    assert.equal(serverPackage.name, 'ocean-wave-server');
    assert.equal(clientPackage.name, 'ocean-wave-client');
});

test('server package metadata points at the Ocean Wave repository', () => {
    const serverPackage = readJson('server', 'src', 'package.json');

    assert.deepEqual(serverPackage.repository, {
        type: 'git',
        url: 'git+https://github.com/baealex/ocean-wave.git'
    });
    assert.deepEqual(serverPackage.bugs, {
        url: 'https://github.com/baealex/ocean-wave/issues'
    });
    assert.equal(
        serverPackage.homepage,
        'https://github.com/baealex/ocean-wave#readme'
    );
});

test('README and Docker metadata use Ocean Wave public branding', () => {
    const readme = readText('README.md');
    const composeFile = readText('docker-compose.yml');

    assert.match(readme, /^# Ocean Wave$/m);
    assert.match(readme, /baealex\/ocean-wave/);
    assert.doesNotMatch(readme, /\bbeato\b/i);

    assert.match(composeFile, /image:\s*baealex\/ocean-wave/);
});
