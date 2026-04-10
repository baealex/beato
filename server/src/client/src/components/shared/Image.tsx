import { useEffect, useRef, type ImgHTMLAttributes, type ReactEventHandler } from 'react';
import { getImage } from '~/modules/image';

const PLACEHOLDER_IMAGE =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIW2NQV1f/DwACYwF11mMyYQAAAABJRU5ErkJggg==';
const FALLBACK_APPLIED_FLAG = 'fallbackApplied';

interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
    src?: string;
    loading?: 'lazy' | 'eager';
}

export default function Image({
    src,
    loading = 'lazy',
    onError,
    ...props
}: ImageProps) {
    const ref = useRef<HTMLImageElement>(null);

    const handleError: ReactEventHandler<HTMLImageElement> = (event) => {
        onError?.(event);

        const image = event.currentTarget;
        if (image.dataset[FALLBACK_APPLIED_FLAG] === 'true') {
            return;
        }

        image.dataset[FALLBACK_APPLIED_FLAG] = 'true';
        image.src = getImage();
    };

    useEffect(() => {
        if (ref.current) {
            delete ref.current.dataset[FALLBACK_APPLIED_FLAG];
        }
    }, [src]);

    useEffect(() => {
        if (!ref.current || loading !== 'lazy') {
            return;
        }

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                const img = entry.target as HTMLImageElement;
                img.src = getImage(src);
                observer.unobserve(img);
            }
        });

        observer.observe(ref.current);

        return () => {
            observer.disconnect();
        };
    }, [loading, src]);

    return (
        <>
            {loading !== 'lazy' ? (
                <img
                    ref={ref}
                    src={getImage(src)}
                    loading={loading}
                    onError={handleError}
                    {...props}
                />
            ) : (
                <img
                    ref={ref}
                    src={PLACEHOLDER_IMAGE}
                    loading={loading}
                    onError={handleError}
                    {...props}
                />
            )}
        </>
    );
}
