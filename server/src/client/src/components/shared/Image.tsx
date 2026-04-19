import placeholderStyles from './Image.module.scss';

import { useState, useEffect, useRef, type ImgHTMLAttributes, type ReactNode, type ReactEventHandler } from 'react';

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
    const ref = useRef<HTMLImageElement>(null);

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

    if (loading !== 'lazy') {
        return (
            <img
                ref={ref}
                src={src}
                loading={loading}
                className={className}
                style={style}
                onError={handleError}
                {...props}
            />
        );
    }

    return (
        <LazyImage
            ref={ref}
            src={src!}
            className={className}
            style={style}
            onError={handleError}
            {...props}
        />
    );
}

interface LazyImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
    src: string;
}

const PLACEHOLDER_IMAGE =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIW2NQV1f/DwACYwF11mMyYQAAAABJRU5ErkJggg==';

function LazyImage({ src, onError, ...props }: LazyImageProps & { ref?: React.Ref<HTMLImageElement> }) {
    const ref = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (!ref.current) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                const img = entry.target as HTMLImageElement;
                img.src = src;
                observer.unobserve(img);
            }
        });

        observer.observe(ref.current);

        return () => {
            observer.disconnect();
        };
    }, [src]);

    return (
        <img
            ref={ref}
            src={PLACEHOLDER_IMAGE}
            loading="lazy"
            onError={onError}
            {...props}
        />
    );
}
