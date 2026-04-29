import fs from 'fs';
import os from 'os';
import path from 'path';

import {
    normalizeMusicFilePath,
    resolveMusicFilePath
} from './storage-paths';

const restoreEnvValue = (key: string, value: string | undefined) => {
    if (value === undefined) {
        delete process.env[key];
        return;
    }

    process.env[key] = value;
};

describe('storage paths', () => {
    const tempDirectories: string[] = [];
    const originalMusicPath = process.env.OCEAN_WAVE_MUSIC_PATH;

    afterEach(() => {
        restoreEnvValue('OCEAN_WAVE_MUSIC_PATH', originalMusicPath);

        while (tempDirectories.length > 0) {
            fs.rmSync(tempDirectories.pop()!, {
                recursive: true,
                force: true
            });
        }
    });

    it('stores absolute paths inside the music root as relative paths', () => {
        const musicPath = fs.mkdtempSync(path.join(os.tmpdir(), 'ocean-wave-music-root-'));
        const filePath = path.join(musicPath, 'library/track-a.mp3');
        tempDirectories.push(musicPath);
        process.env.OCEAN_WAVE_MUSIC_PATH = musicPath;

        expect(normalizeMusicFilePath(filePath)).toBe('library/track-a.mp3');
    });

    it('resolves legacy absolute music paths against the current music root', () => {
        const musicPath = fs.mkdtempSync(path.join(os.tmpdir(), 'ocean-wave-music-root-'));
        tempDirectories.push(musicPath);
        process.env.OCEAN_WAVE_MUSIC_PATH = musicPath;

        const legacyPath = path.join(
            '/Users/baealex/GitHub/ocean-wave/server/src/music',
            'library/track-a.mp3'
        );

        expect(normalizeMusicFilePath(legacyPath)).toBe('library/track-a.mp3');
        expect(resolveMusicFilePath(legacyPath)).toBe(path.join(musicPath, 'library/track-a.mp3'));
    });
});
