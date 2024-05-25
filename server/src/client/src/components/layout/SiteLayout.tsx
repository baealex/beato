/* eslint-disable react-hooks/exhaustive-deps */
import { Suspense, useEffect, useRef } from 'react'
import { Outlet, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'

import SiteHeader from '../shared/SiteHeader'
import SubPageHeader from '../shared/SubPageHeader'
import MusicPlayer from '../music/MusicPlayer'
import Loading from '../shared/Loading'

interface SiteLayoutProps {
    isSubPage?: boolean
    disablePlayer?: boolean
    animationDirection?: 'None' | 'RightToLeft' | 'BottomToTop'
}

export default function SiteLayout({
    isSubPage,
    disablePlayer = false,
    animationDirection = 'None',
}: SiteLayoutProps) {
    const [searchParams, setSearchParams] = useSearchParams()

    const containerRef = useRef<HTMLDivElement>(null)
    const shouldBeScroll = useRef(true)

    const animationVariants = {
        in: {
            opacity: 1,
            x: 0,
            y: 0,
        },
        out: {
            opacity: 0,
            x: animationDirection === 'RightToLeft' ? 50 : 0,
            y: animationDirection === 'BottomToTop' ? 50 : 0,
        },
    }

    useEffect(() => {
        if (containerRef.current && shouldBeScroll.current) {
            containerRef.current.scrollTop = parseInt(searchParams.get('py') || '0')
            shouldBeScroll.current = false
        }
        return () => {
            shouldBeScroll.current = true
        }
    }, [containerRef, shouldBeScroll, location.pathname])

    useEffect(() => {
        if (!containerRef.current) {
            return
        }

        let timer: ReturnType<typeof setTimeout> | null = null

        const handleScroll = () => {
            if (timer) {
                clearTimeout(timer)
            }

            timer = setTimeout(() => {
                searchParams.set('py', containerRef.current?.scrollTop.toString() || '0')
                setSearchParams(searchParams, { replace: true })
            }, 50)
        }

        containerRef.current.addEventListener('scroll', handleScroll)

        return () => {
            if (timer) {
                clearTimeout(timer)
            }
            containerRef.current?.removeEventListener('scroll', handleScroll)
        }
    }, [location.pathname, containerRef, searchParams, setSearchParams])

    return (
        <main>
            {isSubPage ? <SubPageHeader /> : <SiteHeader />}
            <motion.div
                ref={containerRef}
                key={location.pathname}
                className="container"
                animate="in"
                exit="out"
                initial="out"
                variants={animationVariants}
                transition={{
                    duration: 0.25,
                }}
            >
                <Suspense fallback={<Loading />}>
                    <Outlet />
                </Suspense>
            </motion.div>
            {!disablePlayer &&
                <MusicPlayer />
            }
        </main>
    )
}
