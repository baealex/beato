import { useEffect, useRef } from 'react'

interface ObserverProps {
    onIntersect: () => void
}

export default function Observer({
    onIntersect,
}: ObserverProps) {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                onIntersect()
            }
        })

        const { current } = ref

        if (current) {
            observer.observe(current)
        }

        return () => {
            if (current) {
                console.log('unobserve')
                observer.unobserve(current)
            }
        }
    }, [ref, onIntersect])

    return (
        <div ref={ref} style={{ minHeight: '1px', minWidth: '1px' }} />
    )
}