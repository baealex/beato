import crypto from 'crypto';

export const TRACK_CONTENT_HASH_VERSION = 1;

export const createTrackContentHash = (data: Buffer) => {
    return crypto.createHash('sha256').update(data).digest('hex');
};

export const shouldRefreshTrackContentHash = ({
    contentHash,
    hashVersion
}: {
    contentHash: string | null;
    hashVersion: number | null;
}) => {
    return !contentHash || hashVersion !== TRACK_CONTENT_HASH_VERSION;
};
