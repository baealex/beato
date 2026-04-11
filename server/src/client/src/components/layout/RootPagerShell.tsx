import styles from './RootPagerShell.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

import { useDrag } from '@use-gesture/react';
import {
    animate,
    motion,
    useMotionValue,
    useTransform
} from 'motion/react';
import {
    Suspense,
    startTransition,
    useLayoutEffect,
    useMemo,
    useRef,
    useState
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Loading from '../shared/Loading';
import { ROOT_PAGER_PAGE_COMPONENTS } from './root-pager-pages';
import {
    ROOT_PAGER_PAGES,
    resolveRootPagerCommitIndex,
    resolveRootPagerPageIndex
} from '~/modules/root-pager';

const ROOT_PAGER_SNAP_STIFFNESS = 420;
const ROOT_PAGER_SNAP_DAMPING = 42;
const ROOT_PAGER_SNAP_MASS = 0.62;
const ROOT_PAGER_EDGE_RESISTANCE = 0.22;
const ROOT_PAGER_AXIS_THRESHOLD_PX = 10;
const ROOT_PAGER_GESTURE_THRESHOLD_PX = 4;

interface RootPagerPanelProps {
    currentIndex: number;
    offsetX: ReturnType<typeof useMotionValue<number>>;
    pageWidth: number;
    path: string;
    scrollerRefs: React.MutableRefObject<Map<string, HTMLDivElement>>;
    scrollPositionsRef: React.MutableRefObject<Record<string, number>>;
}

const shouldIgnoreGestureStart = (target: EventTarget | null) => {
    if (!(target instanceof HTMLElement)) {
        return false;
    }

    return Boolean(target.closest('input, textarea, select, [contenteditable="true"]'));
};

const RootPagerPanel = ({
    currentIndex,
    offsetX,
    pageWidth,
    path,
    scrollerRefs,
    scrollPositionsRef
}: RootPagerPanelProps) => {
    const pageIndex = resolveRootPagerPageIndex(path);
    const PageComponent = ROOT_PAGER_PAGE_COMPONENTS[path];
    const transform = useTransform(offsetX, (value) => {
        const baseOffset = (pageIndex - currentIndex) * pageWidth;

        return `translate3d(${baseOffset + value}px, 0, 0)`;
    });

    return (
        <motion.div className={cx('panel')} style={{ transform }}>
            <div
                ref={(node) => {
                    if (node) {
                        scrollerRefs.current.set(path, node);
                        node.scrollTop = scrollPositionsRef.current[path] ?? 0;
                    } else {
                        scrollerRefs.current.delete(path);
                    }
                }}
                className={cx('panelScroller', 'main-container')}
                onScroll={(event) => {
                    scrollPositionsRef.current[path] = event.currentTarget.scrollTop;
                }}>
                <Suspense fallback={<Loading />}>
                    <PageComponent />
                </Suspense>
            </div>
        </motion.div>
    );
};

export default function RootPagerShell({
    obscured = false,
    obscuredMode = 'desktop'
}: {
    obscured?: boolean;
    obscuredMode?: 'desktop' | 'always';
}) {
    const location = useLocation();
    const navigate = useNavigate();

    const routeIndex = resolveRootPagerPageIndex(location.pathname);
    const [visualIndex, setVisualIndex] = useState(routeIndex);
    const visiblePages = useMemo(() => {
        if (visualIndex < 0) {
            return [];
        }

        return ROOT_PAGER_PAGES.filter((_, index) => Math.abs(index - visualIndex) <= 1);
    }, [visualIndex]);

    const shellRef = useRef<HTMLDivElement>(null);
    const scrollerRefs = useRef(new Map<string, HTMLDivElement>());
    const scrollPositionsRef = useRef<Record<string, number>>({});
    const snapAnimationRef = useRef<ReturnType<typeof animate> | null>(null);
    const previousRouteIndexRef = useRef(routeIndex);
    const offsetX = useMotionValue(0);
    const [pageWidth, setPageWidth] = useState(0);
    const [phase, setPhase] = useState<'idle' | 'dragging' | 'settling'>('idle');

    useLayoutEffect(() => {
        const shell = shellRef.current;

        if (!shell) {
            return;
        }

        const syncWidth = () => {
            setPageWidth(shell.clientWidth || window.innerWidth || 0);
        };

        syncWidth();

        const resizeObserver = new ResizeObserver(() => {
            syncWidth();
        });

        resizeObserver.observe(shell);

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    useLayoutEffect(() => {
        if (routeIndex < 0) {
            return;
        }

        const previousRouteIndex = previousRouteIndexRef.current;
        previousRouteIndexRef.current = routeIndex;

        if (previousRouteIndex === routeIndex) {
            return;
        }

        snapAnimationRef.current?.stop();
        snapAnimationRef.current = null;
        offsetX.set(0);
        setPhase('idle');
        setVisualIndex(routeIndex);
    }, [offsetX, routeIndex]);

    useLayoutEffect(() => {
        visiblePages.forEach((page) => {
            const scroller = scrollerRefs.current.get(page.path);

            if (!scroller) {
                return;
            }

            scroller.scrollTop = scrollPositionsRef.current[page.path] ?? 0;
        });
    }, [visiblePages]);

    useLayoutEffect(() => {
        return () => {
            snapAnimationRef.current?.stop();
        };
    }, []);

    const bind = useDrag((state) => {
        if (visualIndex < 0 || pageWidth <= 0) {
            return;
        }

        if (shouldIgnoreGestureStart(state.target)) {
            state.cancel();
            return;
        }

        const [movementX] = state.movement;
        const directionX = state.direction[0] || Math.sign(movementX) || 0;
        const velocityPxPerMs = state.velocity[0] * directionX;
        const hasPreviousPage = visualIndex > 0;
        const hasNextPage = visualIndex < ROOT_PAGER_PAGES.length - 1;

        if (state.first) {
            snapAnimationRef.current?.stop();
            snapAnimationRef.current = null;
            setPhase('dragging');
        }

        if (state.axis === 'y') {
            state.cancel();
            return;
        }

        if (!state.intentional && !state.last) {
            return;
        }

        if (state.event.cancelable) {
            state.event.preventDefault();
        }

        let boundedOffset = movementX;

        if ((movementX > 0 && !hasPreviousPage) || (movementX < 0 && !hasNextPage)) {
            boundedOffset *= ROOT_PAGER_EDGE_RESISTANCE;
        }

        offsetX.set(boundedOffset);

        if (!state.last) {
            return;
        }

        const targetIndex = resolveRootPagerCommitIndex({
            currentIndex: visualIndex,
            maxIndex: ROOT_PAGER_PAGES.length - 1,
            offset: boundedOffset,
            width: pageWidth,
            velocityPxPerMs
        });

        setPhase('settling');

        if (targetIndex !== visualIndex) {
            const rebasedOffset = boundedOffset + (targetIndex - visualIndex) * pageWidth;
            offsetX.set(rebasedOffset);
            setVisualIndex(targetIndex);
        }

        snapAnimationRef.current = animate(offsetX, 0, {
            type: 'spring',
            stiffness: ROOT_PAGER_SNAP_STIFFNESS,
            damping: ROOT_PAGER_SNAP_DAMPING,
            mass: ROOT_PAGER_SNAP_MASS,
            velocity: velocityPxPerMs * 1000,
            restDelta: 0.5,
            restSpeed: 5,
            onComplete: () => {
                snapAnimationRef.current = null;

                if (targetIndex === visualIndex) {
                    setPhase('idle');
                    return;
                }

                setPhase('idle');

                requestAnimationFrame(() => {
                    startTransition(() => {
                        navigate(ROOT_PAGER_PAGES[targetIndex].path);
                    });
                });
            }
        });
    }, {
        axis: 'lock',
        threshold: ROOT_PAGER_GESTURE_THRESHOLD_PX,
        axisThreshold: { touch: ROOT_PAGER_AXIS_THRESHOLD_PX },
        pointer: {
            touch: true,
            capture: false
        },
        filterTaps: true,
        preventDefault: true
    });

    if (visualIndex < 0) {
        return null;
    }

    return (
        <div
            {...bind()}
            ref={shellRef}
            className={cx('RootPagerShell', {
                isAlwaysObscured: obscured && obscuredMode === 'always',
                isObscured: obscured,
                isDragging: phase === 'dragging',
                isSettling: phase === 'settling'
            })}
            aria-hidden={obscured}>
            {visiblePages.map((page) => (
                <RootPagerPanel
                    key={page.path}
                    currentIndex={visualIndex}
                    offsetX={offsetX}
                    pageWidth={pageWidth}
                    path={page.path}
                    scrollerRefs={scrollerRefs}
                    scrollPositionsRef={scrollPositionsRef}
                />
            ))}
        </div>
    );
}
