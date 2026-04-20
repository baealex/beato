import styles from './Queue.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

import type {
    CSSProperties,
    PointerEvent as ReactPointerEvent
} from 'react';
import { useStore } from 'badland-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Text } from '~/components/shared';
import { MusicActionPanelContent } from '~/components/music';
import { PlaylistPanelContent } from '~/components/playlist';
import * as Icon from '~/icon';

import { panel } from '~/modules/panel';
import { toast } from '~/modules/toast';
import {
    QUEUE_TRACK_CARD_HEIGHT,
    QUEUE_TRACK_ROW_GAP,
    QUEUE_VIRTUAL_OVERSCAN_PX,
    buildQueueVirtualLayout,
    findQueueDropSlot,
    getQueueDropIndicatorTop,
    getQueueTrackRows,
    findQueueTrackRow,
    getVisibleQueueVirtualRows,
    resolveQueueDropIndex
} from '~/modules/queue-virtual-rows';

import type { Music } from '~/models/type';

import { PlaylistListener } from '~/socket';

import { musicStore } from '~/store/music';
import { queueStore } from '~/store/queue';
import { useBack, useStoreValue } from '~/hooks';
import type { QueueTone } from './Queue/QueueDndItem';
import QueueItem from './Queue/QueueItem';

interface QueueDragState {
    activeId: string;
    activeIndex: number;
    dropSlot: number;
    grabOffsetY: number;
    music: Music;
    pointerClientY: number;
    pointerContentY: number;
    tone: QueueTone;
}

export default function Queue() {
    const back = useBack();
    const navigate = useNavigate();

    const [items] = useStoreValue(queueStore, 'items');
    const [selected] = useStoreValue(queueStore, 'selected');
    const [{ musicMap }] = useStore(musicStore);

    const scrollRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const [isSelectMode, setIsSelectMode] = useState(false);
    const [listViewport, setListViewport] = useState({
        scrollTop: 0,
        height: 0
    });
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [dragState, setDragState] = useState<QueueDragState | null>(null);
    const dragStateRef = useRef<QueueDragState | null>(null);
    const dragListenersCleanupRef = useRef<(() => void) | null>(null);

    const currentIndex = selected ?? -1;
    const queueSummary = currentIndex >= 0
        ? `${currentIndex + 1} of ${items.length} · ${Math.max(items.length - currentIndex - 1, 0)} up next`
        : `${items.length} tracks in session`;

    const virtualLayout = useMemo(() => {
        return buildQueueVirtualLayout(items, currentIndex);
    }, [currentIndex, items]);
    const trackRows = useMemo(() => {
        return getQueueTrackRows(virtualLayout.rows);
    }, [virtualLayout.rows]);
    const virtualRowsRef = useRef(virtualLayout.rows);
    const trackRowsRef = useRef(trackRows);
    const visibleVirtualRows = useMemo(() => {
        return getVisibleQueueVirtualRows(
            virtualLayout.rows,
            listViewport.scrollTop,
            listViewport.height,
            QUEUE_VIRTUAL_OVERSCAN_PX
        );
    }, [listViewport.height, listViewport.scrollTop, virtualLayout.rows]);
    const selectedVirtualRow = useMemo(() => {
        if (selected === null) {
            return null;
        }

        return findQueueTrackRow(virtualLayout.rows, selected);
    }, [selected, virtualLayout.rows]);
    const dragIndicatorTop = dragState
        ? getQueueDropIndicatorTop(virtualLayout.rows, dragState.dropSlot)
        : null;
    const dragOverlayTop = dragState
        ? dragState.pointerContentY - dragState.grabOffsetY
        : null;

    const cleanupDragSession = () => {
        dragListenersCleanupRef.current?.();
        dragListenersCleanupRef.current = null;
        dragStateRef.current = null;
        setDragState(null);
    };

    const syncDragPointer = (
        pointerClientY: number,
        meta: Pick<QueueDragState, 'activeId' | 'activeIndex' | 'grabOffsetY' | 'music' | 'tone'>
    ) => {
        const listNode = listRef.current;

        if (!listNode) {
            return;
        }

        const pointerContentY = pointerClientY - listNode.getBoundingClientRect().top;
        const dragCenterY = pointerContentY - meta.grabOffsetY + QUEUE_TRACK_CARD_HEIGHT / 2;
        const nextDragState = {
            ...meta,
            pointerClientY,
            pointerContentY,
            dropSlot: findQueueDropSlot(virtualRowsRef.current, dragCenterY)
        } satisfies QueueDragState;

        dragStateRef.current = nextDragState;
        setDragState(nextDragState);
    };

    useEffect(() => {
        setSelectedItems([]);
    }, [isSelectMode]);

    useEffect(() => {
        virtualRowsRef.current = virtualLayout.rows;
        trackRowsRef.current = trackRows;
    }, [trackRows, virtualLayout.rows]);

    useEffect(() => {
        dragStateRef.current = dragState;
    }, [dragState]);

    useEffect(() => {
        setSelectedItems((prev) => prev.filter((id) => items.includes(id)));
    }, [items]);

    useEffect(() => {
        if (isSelectMode) {
            cleanupDragSession();
        }
    }, [isSelectMode]);

    useEffect(() => {
        return () => {
            dragListenersCleanupRef.current?.();
        };
    }, []);

    useEffect(() => {
        const scrollNode = scrollRef.current;
        const listNode = listRef.current;

        if (!scrollNode || !listNode) {
            return;
        }

        let animationFrameId = 0;

        const updateViewport = () => {
            animationFrameId = 0;

            const containerRect = scrollNode.getBoundingClientRect();
            const listRect = listNode.getBoundingClientRect();
            const visibleTop = Math.max(containerRect.top, listRect.top);
            const visibleBottom = Math.min(containerRect.bottom, listRect.bottom);

            setListViewport({
                scrollTop: Math.max(containerRect.top - listRect.top, 0),
                height: Math.max(visibleBottom - visibleTop, 0)
            });
        };

        const scheduleViewportUpdate = () => {
            if (animationFrameId !== 0) {
                return;
            }

            animationFrameId = window.requestAnimationFrame(updateViewport);
        };

        scheduleViewportUpdate();

        scrollNode.addEventListener('scroll', scheduleViewportUpdate, { passive: true });

        const resizeObserver = new ResizeObserver(() => {
            scheduleViewportUpdate();
        });

        resizeObserver.observe(scrollNode);
        resizeObserver.observe(listNode);

        return () => {
            scrollNode.removeEventListener('scroll', scheduleViewportUpdate);
            resizeObserver.disconnect();

            if (animationFrameId !== 0) {
                window.cancelAnimationFrame(animationFrameId);
            }
        };
    }, [items.length, isSelectMode]);

    useEffect(() => {
        const scrollNode = scrollRef.current;

        if (selected === null || !scrollNode) {
            return;
        }

        const containerRect = scrollNode.getBoundingClientRect();
        const listNode = listRef.current;

        if (!listNode) {
            return;
        }

        if (!selectedVirtualRow) {
            return;
        }

        const listRect = listNode.getBoundingClientRect();
        const nextTop = Math.max(
            0,
            scrollNode.scrollTop + listRect.top - containerRect.top + selectedVirtualRow.top - 80
        );
        const travelDistance = Math.abs(nextTop - scrollNode.scrollTop);
        const behavior = travelDistance > Math.max(containerRect.height * 1.5, 480)
            ? 'auto'
            : 'smooth';

        scrollNode.scrollTo({
            top: nextTop,
            behavior
        });
    }, [selectedVirtualRow?.top]);

    useEffect(() => {
        if (!dragState) {
            return;
        }

        let animationFrameId = 0;
        const scrollNode = scrollRef.current;

        if (!scrollNode) {
            return;
        }

        const stepAutoScroll = () => {
            const activeDragState = dragStateRef.current;

            if (!activeDragState) {
                return;
            }

            const containerRect = scrollNode.getBoundingClientRect();
            const threshold = 72;
            const maxStep = 18;
            let delta = 0;

            if (activeDragState.pointerClientY < containerRect.top + threshold) {
                const progress = 1 - (activeDragState.pointerClientY - containerRect.top) / threshold;
                delta = -Math.ceil(Math.max(progress, 0) * maxStep);
            } else if (activeDragState.pointerClientY > containerRect.bottom - threshold) {
                const progress = 1 - (containerRect.bottom - activeDragState.pointerClientY) / threshold;
                delta = Math.ceil(Math.max(progress, 0) * maxStep);
            }

            if (delta !== 0) {
                const nextScrollTop = Math.min(
                    Math.max(scrollNode.scrollTop + delta, 0),
                    scrollNode.scrollHeight - scrollNode.clientHeight
                );

                if (nextScrollTop !== scrollNode.scrollTop) {
                    scrollNode.scrollTop = nextScrollTop;
                    syncDragPointer(activeDragState.pointerClientY, activeDragState);
                }
            }

            animationFrameId = window.requestAnimationFrame(stepAutoScroll);
        };

        animationFrameId = window.requestAnimationFrame(stepAutoScroll);

        return () => {
            window.cancelAnimationFrame(animationFrameId);
        };
    }, [dragState]);

    const openMusicActions = (music: Music) => {
        panel.open({
            content: (
                <MusicActionPanelContent
                    id={music.id}
                    onAlbumClick={() => navigate(`/album/${music.album.id}`)}
                    onArtistClick={() => navigate(`/artist/${music.artist.id}`)}
                />
            )
        });
    };

    const startReorderDrag = (
        id: string,
        index: number,
        tone: QueueTone,
        music: Music
    ) => (event: ReactPointerEvent<HTMLButtonElement>) => {
        if (isSelectMode || event.button !== 0) {
            return;
        }

        const rowNode = event.currentTarget.closest('[data-queue-index]');

        if (!(rowNode instanceof HTMLElement)) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();

        const rowRect = rowNode.getBoundingClientRect();
        const meta = {
            activeId: id,
            activeIndex: index,
            grabOffsetY: event.clientY - rowRect.top,
            music,
            tone
        };

        syncDragPointer(event.clientY, meta);

        const handlePointerMove = (moveEvent: PointerEvent) => {
            moveEvent.preventDefault();
            syncDragPointer(moveEvent.clientY, meta);
        };

        const finishDrag = () => {
            const activeDragState = dragStateRef.current;

            cleanupDragSession();

            if (!activeDragState) {
                return;
            }

            const targetIndex = resolveQueueDropIndex(
                trackRowsRef.current.length,
                activeDragState.activeIndex,
                activeDragState.dropSlot
            );

            queueStore.reorderToIndex(activeDragState.activeId, targetIndex);
        };

        const cancelDrag = () => {
            cleanupDragSession();
        };

        window.addEventListener('pointermove', handlePointerMove, { passive: false });
        window.addEventListener('pointerup', finishDrag, { once: true });
        window.addEventListener('pointercancel', cancelDrag, { once: true });

        dragListenersCleanupRef.current = () => {
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', finishDrag);
            window.removeEventListener('pointercancel', cancelDrag);
        };
    };

    const toggleSelectedItem = (id: string) => {
        setSelectedItems((prev) => prev.includes(id)
            ? prev.filter((item) => item !== id)
            : [...prev, id]);
    };

    const renderQueueItem = (
        id: string,
        index: number,
        tone: QueueTone,
        options?: {
            className?: string;
            style?: CSSProperties;
        }
    ) => {
        const music = musicMap.get(id);

        if (!music) {
            return null;
        }

        const sharedProps = {
            key: id,
            music,
            index,
            tone,
            isSelectMode,
            className: options?.className,
            isSelected: selectedItems.includes(id),
            onSelect: () => toggleSelectedItem(id),
            onClick: () => {
                queueStore.select(index);
            },
            onOpenActions: () => openMusicActions(music),
            onReorderPointerDown: startReorderDrag(id, index, tone, music),
            style: options?.style
        };

        return (
            <QueueItem
                {...sharedProps}
            />
        );
    };

    const renderVirtualRows = () => {
        return (
            <>
                {visibleVirtualRows.map((row) => {
                    if (row.type === 'section') {
                        return (
                            <li
                                key={row.key}
                                className={cx('virtual-row', 'section-label', { 'section-label-current': row.current })}
                                style={{
                                    top: `${row.top}px`,
                                    height: `${row.height}px`
                                }}>
                                {row.label}
                            </li>
                        );
                    }

                    return renderQueueItem(row.id, row.index, row.tone, {
                        className: cx('virtual-row', { 'drag-source-hidden': dragState?.activeId === row.id }),
                        style: {
                            top: `${row.top + QUEUE_TRACK_ROW_GAP / 2}px`,
                            height: `${QUEUE_TRACK_CARD_HEIGHT}px`
                        }
                    });
                })}
                {dragIndicatorTop !== null && (
                    <li
                        className={cx('drop-indicator')}
                        style={{ top: `${dragIndicatorTop}px` }}
                    />
                )}
                {dragState && dragOverlayTop !== null && (
                    <QueueItem
                        key={`drag-overlay-${dragState.activeId}`}
                        className={cx('virtual-row', 'drag-overlay')}
                        music={dragState.music}
                        index={dragState.activeIndex}
                        tone={dragState.tone}
                        isSelectMode={false}
                        isSelected={false}
                        onSelect={() => {}}
                        onClick={() => {}}
                        onOpenActions={() => {}}
                        style={{
                            top: `${dragOverlayTop}px`,
                            height: `${QUEUE_TRACK_CARD_HEIGHT}px`
                        }}
                    />
                )}
            </>
        );
    };

    return (
        <div className={cx('Queue')} ref={scrollRef}>
            <div className={cx('container')}>
                <div className={cx('top-bar')}>
                    <button
                        type="button"
                        className={cx('utility-button')}
                        aria-label="Go back"
                        onClick={back}>
                        <Icon.ChevronLeft />
                    </button>

                    <div className={cx('page-copy')}>
                        <Text as="h1" size="title" weight="semibold" className={cx('page-title')}>
                            Queue
                        </Text>
                        <Text as="p" variant="muted" size="xs" className={cx('page-summary')}>
                            {isSelectMode
                                ? `${selectedItems.length} selected`
                                : queueSummary}
                        </Text>
                    </div>

                    {items.length > 0 ? (
                        <div className={cx('top-bar-actions')}>
                            {isSelectMode ? (
                                <>
                                    <button
                                        type="button"
                                        className={cx('summary-action')}
                                        disabled={selectedItems.length === items.length}
                                        onClick={() => setSelectedItems(items)}>
                                        Select all
                                    </button>
                                    <button
                                        type="button"
                                        className={cx('edit-button', { active: true })}
                                        onClick={() => setIsSelectMode(false)}>
                                        Done
                                    </button>
                                </>
                            ) : (
                                <button
                                    type="button"
                                    className={cx('edit-button')}
                                    onClick={() => setIsSelectMode(true)}>
                                    Edit
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className={cx('top-bar-spacer')} />
                    )}
                </div>

                {items.length > 0 ? (
                    <>
                        <div className={cx('list-shell')} ref={listRef}>
                            <ul
                                className={cx('virtual-list')}
                                style={{ height: `${virtualLayout.totalHeight}px` }}>
                                {renderVirtualRows()}
                            </ul>
                        </div>
                    </>
                ) : (
                    <div className={cx('empty-state')}>
                        <div className={cx('empty-icon')}>
                            <Icon.ListMusic />
                        </div>

                        <div className={cx('empty-copy')}>
                            <Text as="h1" size="2xl" weight="bold">
                                Queue is empty.
                            </Text>
                            <Text as="p" variant="secondary" size="md">
                                Add music from your library to shape the next listening session.
                            </Text>
                        </div>

                        <div className={cx('empty-actions')}>
                            <button
                                type="button"
                                className={cx('empty-button', 'empty-button-primary')}
                                onClick={() => navigate('/')}>
                                <Icon.Music />
                                <span>Open library</span>
                            </button>
                        </div>
                    </div>
                )}

                {isSelectMode && selectedItems.length > 0 && (
                    <div className={cx('selection-actions')}>
                        <button
                            type="button"
                            className={cx('action-button', 'action-button-primary')}
                            onClick={() => panel.open({
                                title: 'Move to playlist',
                                content: (
                                    <PlaylistPanelContent
                                        onClick={(id) => {
                                            PlaylistListener.addMusic(id, selectedItems);
                                            toast('Added to playlist');
                                            setSelectedItems([]);
                                            setIsSelectMode(false);
                                        }}
                                    />
                                )
                            })}>
                            <Icon.Download />
                            <span>Save</span>
                        </button>

                        <button
                            type="button"
                            className={cx('action-button')}
                            onClick={() => {
                                queueStore.removeItems(selectedItems);
                                setSelectedItems([]);
                                setIsSelectMode(false);
                            }}>
                            <Icon.TrashCan />
                            <span>Delete</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
