import styles from './Queue.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

import { useStore } from 'badland-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

import { VerticalSortable } from '~/components/shared';
import { Image, Text } from '~/components/shared';
import { MusicActionPanelContent } from '~/components/music';
import { PlaylistPanelContent } from '~/components/playlist';
import * as Icon from '~/icon';

import { panel } from '~/modules/panel';
import { toast } from '~/modules/toast';

import type { Music } from '~/models/type';

import { PlaylistListener } from '~/socket';

import { musicStore } from '~/store/music';
import { queueStore } from '~/store/queue';
import { useBack } from '~/hooks';
import QueueDndItem, { type QueueTone } from './Queue/QueueDndItem';

export default function Queue() {
    const back = useBack();
    const navigate = useNavigate();

    const [{ items, selected }, setState] = useStore(queueStore);
    const [{ musicMap }] = useStore(musicStore);

    const listRef = useRef<HTMLDivElement>(null);
    const [isSelectMode, setIsSelectMode] = useState(false);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const currentIndex = selected ?? -1;
    const currentMusic = currentIndex >= 0
        ? musicMap.get(items[currentIndex]) ?? null
        : null;
    const nextMusic = currentIndex >= 0
        ? currentIndex + 1 < items.length
            ? musicMap.get(items[currentIndex + 1]) ?? null
            : null
        : items.length > 0
            ? musicMap.get(items[0]) ?? null
            : null;

    const previousEntries = currentIndex > 0
        ? items.slice(0, currentIndex).map((id, index) => ({
            id,
            index
        }))
        : [];
    const currentEntry = currentIndex >= 0
        ? {
            id: items[currentIndex],
            index: currentIndex
        }
        : null;
    const upcomingStart = currentIndex >= 0 ? currentIndex + 1 : 0;
    const upcomingEntries = items
        .slice(upcomingStart)
        .map((id, offset) => ({
            id,
            index: upcomingStart + offset
        }));

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over || active.id === over.id) {
            return;
        }

        setState((prevState) => {
            const prevSelectedItem = prevState.selected !== null
                ? prevState.items[prevState.selected]
                : null;
            const oldIndex = prevState.items.indexOf(active.id.toString());
            const newIndex = prevState.items.indexOf(over.id.toString());
            const newItems = arrayMove(prevState.items, oldIndex, newIndex);

            if (prevSelectedItem) {
                return {
                    ...prevState,
                    items: newItems,
                    selected: newItems.indexOf(prevSelectedItem)
                };
            }

            return {
                ...prevState,
                items: newItems
            };
        });
    };

    useEffect(() => {
        setSelectedItems([]);
    }, [isSelectMode]);

    useEffect(() => {
        setSelectedItems((prev) => prev.filter((id) => items.includes(id)));
    }, [items]);

    useEffect(() => {
        if (selected === null || !listRef.current) {
            return;
        }

        const targetElement = listRef.current.querySelector<HTMLElement>(`[data-queue-index="${selected}"]`);

        if (!targetElement) {
            return;
        }

        listRef.current.scrollTo({
            top: Math.max(0, targetElement.offsetTop - 80),
            behavior: 'smooth'
        });
    }, [selected]);

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

    const toggleSelectedItem = (id: string) => {
        setSelectedItems((prev) => prev.includes(id)
            ? prev.filter((item) => item !== id)
            : [...prev, id]);
    };

    const renderQueueItem = (id: string, index: number, tone: QueueTone) => {
        const music = musicMap.get(id);

        if (!music) {
            return null;
        }

        return (
            <QueueDndItem
                key={id}
                music={music}
                index={index}
                tone={tone}
                isSelectMode={isSelectMode}
                isSelected={selectedItems.includes(id)}
                onSelect={() => toggleSelectedItem(id)}
                onClick={() => {
                    queueStore.select(index);
                }}
                onOpenActions={() => openMusicActions(music)}
            />
        );
    };

    return (
        <div className={cx('Queue')}>
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
                        <Text as="h1" size="lg" weight="semibold">
                            Queue
                        </Text>
                        <Text as="p" variant="muted" size="xs">
                            {isSelectMode
                                ? `${selectedItems.length} selected`
                                : `${items.length} tracks in session`}
                        </Text>
                    </div>

                    {items.length > 0 ? (
                        <button
                            type="button"
                            className={cx('edit-button', { active: isSelectMode })}
                            onClick={() => setIsSelectMode((prev) => !prev)}>
                            {isSelectMode ? 'Done' : 'Edit'}
                        </button>
                    ) : (
                        <div className={cx('top-bar-spacer')} />
                    )}
                </div>

                {items.length > 0 ? (
                    <>
                        <section className={cx('overview')}>
                            <div className={cx('overview-header')}>
                                <Text
                                    as="span"
                                    variant="muted"
                                    size="xs"
                                    weight="medium"
                                    className={cx('eyebrow')}>
                                    {currentMusic ? 'Now playing' : 'Queue overview'}
                                </Text>
                                <div className={cx('overview-stats')}>
                                    <span>{currentMusic ? `${currentIndex + 1} / ${items.length}` : `${items.length} queued`}</span>
                                    <span>{currentMusic ? `${Math.max(items.length - currentIndex - 1, 0)} up next` : 'Ready to start'}</span>
                                </div>
                            </div>

                            {currentMusic ? (
                                <div className={cx('overview-track')}>
                                    <Image
                                        className={cx('overview-art')}
                                        src={currentMusic.album.cover}
                                        alt={currentMusic.album.name}
                                        loading="eager"
                                    />
                                    <div className={cx('overview-copy')}>
                                        <Text as="h2" size="xl" weight="bold" className={cx('overview-title')}>
                                            {currentMusic.name}
                                        </Text>
                                        <Text as="p" variant="secondary" size="md">
                                            {currentMusic.artist.name}
                                        </Text>
                                        <Text as="p" variant="tertiary" size="sm">
                                            {currentMusic.album.name}
                                        </Text>
                                    </div>
                                </div>
                            ) : nextMusic ? (
                                <div className={cx('overview-track')}>
                                    <Image
                                        className={cx('overview-art')}
                                        src={nextMusic.album.cover}
                                        alt={nextMusic.album.name}
                                        loading="eager"
                                    />
                                    <div className={cx('overview-copy')}>
                                        <Text as="h2" size="xl" weight="bold" className={cx('overview-title')}>
                                            {nextMusic.name}
                                        </Text>
                                        <Text as="p" variant="secondary" size="md">
                                            {nextMusic.artist.name}
                                        </Text>
                                        <Text as="p" variant="tertiary" size="sm">
                                            Waiting at the front of the queue
                                        </Text>
                                    </div>
                                </div>
                            ) : null}

                            <Text as="p" variant="secondary" size="sm" className={cx('overview-note')}>
                                {nextMusic && currentMusic
                                    ? `Up next: ${nextMusic.name} by ${nextMusic.artist.name}`
                                    : currentMusic
                                        ? 'This is the last track in the current session.'
                                        : nextMusic
                                            ? `${nextMusic.name} is first in line.`
                                            : 'Choose a track from your library to begin listening.'}
                            </Text>

                            {isSelectMode && (
                                <div className={cx('selection-summary')}>
                                    <Text as="span" variant="secondary" size="sm">
                                        Select tracks to save or remove them together.
                                    </Text>
                                    <button
                                        type="button"
                                        className={cx('summary-action')}
                                        disabled={selectedItems.length === items.length}
                                        onClick={() => setSelectedItems(items)}>
                                        Select all
                                    </button>
                                </div>
                            )}
                        </section>

                        <div className={cx('list-shell')} ref={listRef}>
                            <ul className={cx('list')}>
                                <VerticalSortable items={items} onDragEnd={handleDragEnd}>
                                    {previousEntries.length > 0 && (
                                        <li className={cx('section-label')}>Earlier</li>
                                    )}
                                    {previousEntries.map(({ id, index }) => renderQueueItem(id, index, 'past'))}

                                    {currentEntry && (
                                        <li className={cx('section-label', 'section-label-current')}>
                                            Now playing
                                        </li>
                                    )}
                                    {currentEntry && renderQueueItem(currentEntry.id, currentEntry.index, 'current')}

                                    {upcomingEntries.length > 0 && (
                                        <li className={cx('section-label')}>
                                            {currentEntry ? 'Up next' : 'Queue'}
                                        </li>
                                    )}
                                    {upcomingEntries.map(({ id, index }) => renderQueueItem(id, index, 'upcoming'))}
                                </VerticalSortable>
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
