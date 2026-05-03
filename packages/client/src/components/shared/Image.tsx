
import {
    useState, useEffect, type ImgHTMLAttributes, type ReactNode, type ReactEventHandler
} from 'react';

import { DEFAULT_ALBUM_ART } from '~/modules/image';

interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
    src?: string;
    loading?: 'lazy' | 'eager';
    icon?: ReactNode;
}

export default function Image({
    src,
    loading = 'lazy',
    icon,
    className,
    style,
    onError,
    onLoad,
    ...props
}: ImageProps) {
    void icon;

    const [failed, setFailed] = useState(false);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setFailed(false);
        setLoaded(false);
    }, [src]);

    const effectiveSrc = !src || failed ? DEFAULT_ALBUM_ART : src;

    const handleError: ReactEventHandler<HTMLImageElement> = (event) => {
        onError?.(event);

        if (effectiveSrc !== DEFAULT_ALBUM_ART) {
            setLoaded(false);
            setFailed(true);
        }
    };

    const handleLoad: ReactEventHandler<HTMLImageElement> = (event) => {
        setLoaded(true);
        onLoad?.(event);
    };

    return (
        <img
            src={effectiveSrc}
            loading={loading}
            className={['ow-image', loaded ? 'ow-image-loaded' : '', className].filter(Boolean).join(' ')}
            style={style}
            onError={handleError}
            onLoad={handleLoad}
            {...props}
        />
    );
}
