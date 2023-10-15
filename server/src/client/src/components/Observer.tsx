import { useEffect, useRef } from 'react'

interface ObserverProps {
    onIntersect: () => void
}

export default function Observer({
    onIntersect,
}: ObserverProps) {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                onIntersect()
            }
        })

        const { current } = ref

        if (current) {
            observer.observe(current)
        }

        return () => {
            if (current) {
                observer.unobserve(current)
            }
        }
    }, [ref, onIntersect])

    return (
        <div ref={ref} style={{ height: '1px', width: '1px' }} />
    )
}