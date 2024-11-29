import { Suspense, useEffect, useRef } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';

import SiteHeader from '../shared/SiteHeader';
import SubPageHeader from '../shared/SubPageHeader';
import MusicPlayer from '../music/MusicPlayer';
import Loading from '../shared/Loading';

interface SiteLayoutProps {
    isSubPage?: boolean;
    disablePlayer?: boolean;
}

export default function SiteLayout({
    isSubPage,
    disablePlayer = false
}: SiteLayoutProps) {
    const [searchParams, setSearchParams] = useSearchParams();

    const containerRef = useRef<HTMLDivElement>(null);
    const shouldBeScroll = useRef(true);

    useEffect(() => {
        if (containerRef.current && shouldBeScroll.current) {
            containerRef.current.scrollTop = parseInt(searchParams.get('py') || '0');
            shouldBeScroll.current = false;
        }
        return () => {
            shouldBeScroll.current = true;
        };
    }, [containerRef, shouldBeScroll, location.pathname]);

    useEffect(() => {
        if (!containerRef.current) {
            return;
        }

        let timer: ReturnType<typeof setTimeout> | null = null;

        const handleScroll = () => {
            if (timer) {
                clearTimeout(timer);
            }

            timer = setTimeout(() => {
                searchParams.set('py', containerRef.current?.scrollTop.toString() || '0');
                setSearchParams(searchParams, { replace: true });
            }, 50);
        };

        containerRef.current.addEventListener('scroll', handleScroll);

        return () => {
            if (timer) {
                clearTimeout(timer);
            }
            containerRef.current?.removeEventListener('scroll', handleScroll);
        };
    }, [location.pathname, containerRef, searchParams, setSearchParams]);

    return (
        <main>
            {isSubPage ? <SubPageHeader /> : <SiteHeader />}
            <div ref={containerRef} className="container">
                <Suspense fallback={<Loading />}>
                    <Outlet />
                </Suspense>
            </div>
            {!disablePlayer && <MusicPlayer />}
        </main>
    );
}
