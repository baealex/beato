import placeholderStyles from './Image.module.scss';

import {
    useState, useEffect, type ImgHTMLAttributes, type ReactNode, type ReactEventHandler
} from 'react';

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
    ...props
}: ImageProps) {
    const [failed, setFailed] = useState(!src);

    useEffect(() => {
        setFailed(!src);
    }, [src]);

    const handleError: ReactEventHandler<HTMLImageElement> = (event) => {
        onError?.(event);
        setFailed(true);
    };

    if (failed) {
        if (icon) {
            const classes = [placeholderStyles.placeholder, className].filter(Boolean).join(' ');
            return <div className={classes} style={style}>{icon}</div>;
        }
        return null;
    }

    return (
        <img
            src={src}
            loading={loading}
            className={className}
            style={style}
            onError={handleError}
            {...props}
        />
    );
}
