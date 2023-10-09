import { useEffect, useRef } from 'react'
import { getImage } from '~/modules/image'

interface ImageProps {
    src?: string;
    alt?: string;
    style?: React.CSSProperties;
    loading?: 'lazy' | 'eager';
    className?: string;
}

export default function Image({
    src,
    alt,
    style,
    loading = 'lazy',
    className,
}: ImageProps) {
    const ref = useRef<HTMLImageElement>(null)

    useEffect(() => {
        if (!ref.current || loading !== 'lazy') {
            return
        }

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                const img = entry.target as HTMLImageElement
                img.src = getImage(src)
                observer.unobserve(img)
            }
        })

        observer.observe(ref.current)

        return () => {
            observer.disconnect()
        }
    }, [loading, src])

    return (
        <>
            {loading !== 'lazy' ? (
                <img src={getImage(src)} alt={alt} style={style} className={className} />
            ) : (
                <img
                    ref={ref}
                    src={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIW2NQV1f/DwACYwF11mMyYQAAAABJRU5ErkJggg=='}
                    alt={alt}
                    style={style}
                    className={className}
                />
            )}
        </>
    )
}