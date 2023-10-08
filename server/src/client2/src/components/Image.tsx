import { useEffect, useRef } from 'react'

interface ImageProps {
    src?: string;
    alt?: string;
    loading?: 'lazy' | 'eager';
    className?: string;
}

export const getImage = (src?: string) => {
    if (!src) {
        return '/images/beato.jpg'
    }
    return src
}

export default function Image({
    src,
    alt,
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
                <img src={getImage(src)} alt={alt} className={className} />
            ) : (
                <img
                    ref={ref}
                    src={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIW2NQV1f/DwACYwF11mMyYQAAAABJRU5ErkJggg=='}
                    alt={alt}
                    className={className}
                />
            )}
        </>
    )
}