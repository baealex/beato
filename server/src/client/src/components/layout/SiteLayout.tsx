import styles from './SiteLayout.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

import { Suspense, useEffect, useRef } from 'react';
import { Outlet, useLocation, useSearchParams } from 'react-router-dom';

import SiteHeader from '../shared/SiteHeader';
import SubPageHeader from '../shared/SubPageHeader';
import MusicPlayer from '../music/MusicPlayer';
import Loading from '../shared/Loading';
import {
    isSubPagePath,
    resolveSubPagePresentation,
    shouldHideMiniPlayer,
    shouldRenderSubPageHeader
} from '~/modules/sub-page-presentation';

interface SiteLayoutProps {
    disablePlayer?: boolean;
}

export default function SiteLayout({ disablePlayer = false }: SiteLayoutProps) {
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();

    const containerRef = useRef<HTMLDivElement>(null);
    const shouldBeScroll = useRef(true);
    const searchParamsRef = useRef(searchParams);
    const setSearchParamsRef = useRef(setSearchParams);
    const isSubPage = isSubPagePath(location.pathname);
    const subPagePresentation = resolveSubPagePresentation(location.pathname);
    const hasSubPageHeader = shouldRenderSubPageHeader(location.pathname);
    const hideMiniPlayer = shouldHideMiniPlayer(location.pathname);

    useEffect(() => {
        searchParamsRef.current = searchParams;
        setSearchParamsRef.current = setSearchParams;
    });

    useEffect(() => {
        if (containerRef.current && shouldBeScroll.current) {
            containerRef.current.scrollTop = parseInt(searchParams.get('py') || '0');
            shouldBeScroll.current = false;
        }
        return () => {
            shouldBeScroll.current = true;
        };
    }, [containerRef, isSubPage, shouldBeScroll, location.pathname, searchParams]);

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
                const params = searchParamsRef.current;
                params.set('py', containerRef.current?.scrollTop.toString() || '0');
                setSearchParamsRef.current(params, { replace: true });
            }, 200);
        };

        containerRef.current.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            if (timer) {
                clearTimeout(timer);
            }
            containerRef.current?.removeEventListener('scroll', handleScroll);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [containerRef, isSubPage, location.pathname]);

    return (
        <main>
            {!isSubPage && <SiteHeader />}
            <div className={cx('contentFrame', { hasSubPage: isSubPage })}>
                {!isSubPage && (
                    <div ref={containerRef} className={cx('pageContent', 'main-container')}>
                        <Suspense fallback={<Loading />}>
                            <Outlet />
                        </Suspense>
                    </div>
                )}
                {isSubPage && (
                    <div
                        className={cx('subPageFrame', subPagePresentation)}>
                        <div className={cx('subPageBackdrop')} />
                        <div
                            key={location.pathname}
                            className={cx('subPageSurface', subPagePresentation)}>
                            {hasSubPageHeader ? (
                                <>
                                    <SubPageHeader />
                                    <div
                                        ref={containerRef}
                                        className={cx('subPageContent', 'main-container', subPagePresentation)}>
                                        <Suspense fallback={<Loading />}>
                                            <Outlet />
                                        </Suspense>
                                    </div>
                                </>
                            ) : (
                                <div className={cx('subPageContent', subPagePresentation)}>
                                    <Suspense fallback={<Loading />}>
                                        <Outlet />
                                    </Suspense>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            {!disablePlayer && !hideMiniPlayer && <MusicPlayer />}
        </main>
    );
}
