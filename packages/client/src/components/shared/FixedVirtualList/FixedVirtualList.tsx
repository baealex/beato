import {
    type ReactNode,
    useEffect,
    useLayoutEffect,
    useRef,
    useState
} from 'react';

import {
    DEFAULT_FIXED_VIRTUAL_OVERSCAN_PX,
    resolveFixedVirtualItemTop,
    resolveFixedVirtualRange
} from '~/modules/fixed-virtual-list';

interface FixedVirtualListProps<T> {
    items: T[];
    rowHeight: number;
    overscanPx?: number;
    getKey: (item: T, index: number) => string | number;
    renderItem: (item: T, index: number) => ReactNode;
    emptyState?: ReactNode;
}

export default function FixedVirtualList<T>({
    items,
    rowHeight,
    overscanPx = DEFAULT_FIXED_VIRTUAL_OVERSCAN_PX,
    getKey,
    renderItem,
    emptyState = null
}: FixedVirtualListProps<T>) {
    const listRef = useRef<HTMLDivElement>(null);
    const scrollRootRef = useRef<HTMLElement | null>(null);
    const listOffsetTopRef = useRef(0);
    const [visibleRange, setVisibleRange] = useState(() => resolveFixedVirtualRange({
        count: items.length,
        rowHeight,
        scrollTop: 0,
        viewportHeight: typeof window === 'undefined'
            ? rowHeight * 8
            : window.innerHeight,
        overscanPx
    }));

    useLayoutEffect(() => {
        scrollRootRef.current = listRef.current?.closest('.main-container') as HTMLElement | null;
    }, []);

    useEffect(() => {
        const listNode = listRef.current;
        const scrollRootNode = scrollRootRef.current;

        if (!listNode || !scrollRootNode) {
            return;
        }

        let animationFrameId = 0;

        const commitVisibleRange = (scrollTop: number) => {
            const nextRange = resolveFixedVirtualRange({
                count: items.length,
                rowHeight,
                scrollTop: Math.max(scrollTop - listOffsetTopRef.current, 0),
                viewportHeight: scrollRootNode.clientHeight,
                overscanPx
            });

            setVisibleRange((previousRange) => {
                if (
                    previousRange.startIndex === nextRange.startIndex
                    && previousRange.endIndex === nextRange.endIndex
                    && previousRange.totalHeight === nextRange.totalHeight
                ) {
                    return previousRange;
                }

                return nextRange;
            });
        };

        const syncListMetrics = () => {
            const scrollRootRect = scrollRootNode.getBoundingClientRect();
            const listRect = listNode.getBoundingClientRect();
            listOffsetTopRef.current = listRect.top - scrollRootRect.top + scrollRootNode.scrollTop;
            commitVisibleRange(scrollRootNode.scrollTop);
        };

        const updateScrollRange = () => {
            animationFrameId = 0;
            commitVisibleRange(scrollRootNode.scrollTop);
        };

        const scheduleScrollRangeUpdate = () => {
            if (animationFrameId !== 0) {
                return;
            }

            animationFrameId = window.requestAnimationFrame(updateScrollRange);
        };

        syncListMetrics();

        scrollRootNode.addEventListener('scroll', scheduleScrollRangeUpdate, { passive: true });

        const resizeObserver = new ResizeObserver(() => {
            syncListMetrics();
        });

        resizeObserver.observe(scrollRootNode);
        resizeObserver.observe(listNode);

        return () => {
            scrollRootNode.removeEventListener('scroll', scheduleScrollRangeUpdate);
            resizeObserver.disconnect();

            if (animationFrameId !== 0) {
                window.cancelAnimationFrame(animationFrameId);
            }
        };
    }, [items.length, overscanPx, rowHeight]);

    if (items.length === 0) {
        return emptyState;
    }

    return (
        <div
            ref={listRef}
            style={{
                position: 'relative',
                height: `${visibleRange.totalHeight}px`,
                minHeight: `${visibleRange.totalHeight}px`
            }}>
            {items.slice(visibleRange.startIndex, visibleRange.endIndex).map((item, relativeIndex) => {
                const index = visibleRange.startIndex + relativeIndex;
                const top = resolveFixedVirtualItemTop({
                    index,
                    rowHeight
                });

                return (
                    <div
                        key={getKey(item, index)}
                        style={{
                            position: 'absolute',
                            top: `${top}px`,
                            left: 0,
                            right: 0,
                            height: `${rowHeight}px`
                        }}>
                        {renderItem(item, index)}
                    </div>
                );
            })}
        </div>
    );
}
