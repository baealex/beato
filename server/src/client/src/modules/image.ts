const RESIZED_SEGMENT = '/resized';
const DEFAULT_IMAGE = '/images/ocean-wave.jpg';

export const getImage = (src?: string) => {
    return src || DEFAULT_IMAGE;
};

export const getOriginalImage = (src?: string) => {
    return getImage(src).replace(RESIZED_SEGMENT, '');
};
