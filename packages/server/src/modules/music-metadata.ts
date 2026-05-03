import type { IAudioMetadata } from 'music-metadata';

export const parseBuffer = async (data: Buffer): Promise<IAudioMetadata> => {
    const metadata = await import('music-metadata');

    return metadata.parseBuffer(data);
};
