import { useEffect, useRef } from 'react'
import { Outlet, useSearchParams } from 'react-router-dom'
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

    const [searchParams, setSearchParams] = useSearchParams()

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

        ref.current.scrollTop = parseInt(searchParams.get('py') || '0')

        let timer: ReturnType<typeof setTimeout> | null = null

        const handleScroll = () => {
            if (timer) {
                clearTimeout(timer)
            }

            timer = setTimeout(() => {
                if (ref.current !== null) {
                    const q = searchParams.get('q')
                    if (q) {
                        setSearchParams({
                            q,
                            py: ref.current.scrollTop.toString(),
                        }, { replace: true })
                        return
                    }
                    setSearchParams({
                        py: ref.current.scrollTop.toString(),
                    }, { replace: true })
                }
            }, 50)
        }

        ref.current.addEventListener('scroll', handleScroll)

        return () => {
            if (timer) {
                clearTimeout(timer)
            }

            ref.current?.removeEventListener('scroll', handleScroll)
        }
    }, [ref, searchParams, setSearchParams])

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