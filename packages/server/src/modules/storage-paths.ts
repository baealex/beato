import fs from 'fs';
import path from 'path';

const isPathInside = (parentPath: string, childPath: string) => {
    const relativePath = path.relative(parentPath, childPath);

    return Boolean(relativePath) && !relativePath.startsWith('..') && !path.isAbsolute(relativePath);
};

const getLegacyMusicRelativePath = (filePath: string) => {
    const marker = `${path.sep}music${path.sep}`;
    const markerIndex = filePath.lastIndexOf(marker);

    if (markerIndex === -1) {
        return null;
    }

    return filePath.slice(markerIndex + marker.length);
};

export const resolveCachePath = () => {
    return process.env.OCEAN_WAVE_CACHE_PATH
        ? path.resolve(process.env.OCEAN_WAVE_CACHE_PATH)
        : path.resolve('./cache');
};

export const resolveMusicPath = () => {
    return process.env.OCEAN_WAVE_MUSIC_PATH
        ? path.resolve(process.env.OCEAN_WAVE_MUSIC_PATH)
        : path.resolve('./music');
};

export const normalizeMusicFilePath = (filePath: string) => {
    if (!path.isAbsolute(filePath)) {
        return filePath;
    }

    const musicPath = resolveMusicPath();

    if (isPathInside(musicPath, filePath)) {
        return path.relative(musicPath, filePath);
    }

    return getLegacyMusicRelativePath(filePath) ?? filePath;
};

export const resolveMusicFilePath = (filePath: string) => {
    if (!path.isAbsolute(filePath)) {
        return path.resolve(resolveMusicPath(), filePath);
    }

    if (fs.existsSync(filePath)) {
        return filePath;
    }

    const legacyRelativePath = getLegacyMusicRelativePath(filePath);

    return legacyRelativePath
        ? path.resolve(resolveMusicPath(), legacyRelativePath)
        : filePath;
};
