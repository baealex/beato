import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

import SiteHeader from './SiteHeader'
import SubPageHeader from './SubPageHeader'
import MusicPlayer from './MusicPlayer'

interface SiteLayoutProps {
    isSubPage?: boolean
    disablePlayer?: boolean
    animationDirection?: 'RightToLeft' | 'BottomToTop'
}

export default function SiteLayout({
    isSubPage,
    disablePlayer = false,
    animationDirection = 'RightToLeft',
}: SiteLayoutProps) {
    const ref = useRef<HTMLDivElement>(null)

    const location = useLocation()

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
        if (!ref.current) {
            return
        }

        ref.current.scrollTop = parseInt(new URLSearchParams(location.search).get('py') || '0')

        let timer: ReturnType<typeof setTimeout> | null = null

        const handleScroll = () => {
            if (timer) {
                clearTimeout(timer)
            }

            timer = setTimeout(() => {
                window.history.replaceState(null, '', `?py=${ref.current?.scrollTop}`)
            }, 100)
        }

        ref.current.addEventListener('scroll', handleScroll)

        return () => {
            if (timer) {
                clearTimeout(timer)
            }
            ref.current?.removeEventListener('scroll', handleScroll)
        }
    }, [ref, location])

    return (
        <main>
            {isSubPage ? <SubPageHeader /> : <SiteHeader />}
            <motion.div
                ref={ref}
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
                <Outlet />
            </motion.div>
            {!disablePlayer &&
                <MusicPlayer />
            }
        </main>
    )
}