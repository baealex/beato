import { appCopy } from '~/config/copy';

const RESIZED_SEGMENT = '/resized';

export const getImage = (src?: string) => {
    if (!src) {
        return appCopy.media.defaultArtworkPath;
    }
    return src;
};

export const getOriginalImage = (src?: string) => {
    return getImage(src).replace(RESIZED_SEGMENT, '');
};
