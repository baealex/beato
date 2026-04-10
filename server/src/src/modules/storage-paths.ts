import path from 'path';

export const resolveCachePath = () => {
    return process.env.OCEAN_WAVE_CACHE_PATH
        ? path.resolve(process.env.OCEAN_WAVE_CACHE_PATH)
        : path.resolve('./cache');
};
