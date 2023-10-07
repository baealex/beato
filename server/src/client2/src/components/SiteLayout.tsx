import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import SiteHeader from './SiteHeader'
import SubPageHeader from './SubPageHeader'

interface SiteLayoutProps {
    isSubPage?: boolean
}

export default function SiteLayout({ isSubPage }: SiteLayoutProps) {
    const ref = useRef<HTMLDivElement>(null)

    const location = useLocation()

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
            <div ref={ref} className="container">
                <Outlet />
            </div>
        </main>
    )
}