const RESIZED_SEGMENT = '/resized';

export const getImage = (src?: string) => {
    return src;
};

export const getOriginalImage = (src?: string) => {
    return getImage(src).replace(RESIZED_SEGMENT, '');
};
