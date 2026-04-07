import { appCopy } from '~/config/copy';

export const getImage = (src?: string) => {
    if (!src) {
        return appCopy.media.defaultArtworkPath;
    }
    return src;
};
