import classNames from 'classnames';
const cx = classNames;

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { Image, Text } from '~/components/shared';
import * as Icon from '~/icon';

import type { Music } from '~/models/type';

export type QueueTone = 'current' | 'past' | 'upcoming';

interface QueueDndItemProps {
    music: Music;
    index: number;
    tone: QueueTone;
    isSelectMode: boolean;
    isSelected: boolean;
    onSelect: () => void;
    onClick: () => void;
    onOpenActions: () => void;
}

export default function QueueDndItem({
    music,
    index,
    tone,
    isSelectMode,
    isSelected,
    onSelect,
    onClick,
    onOpenActions
}: QueueDndItemProps) {
    const {
        attributes, listeners, setNodeRef, transform, transition
    } = useSortable({ id: music.id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };

    return (
        <li
            ref={setNodeRef}
            data-queue-index={index}
            style={style}
            className={cx('ow-queue-dnd-item-item', `ow-queue-dnd-item-${tone}`, { 'ow-queue-dnd-item-selected': isSelected })}>
            {isSelectMode ? (
                <button
                    type="button"
                    className={cx('ow-queue-dnd-item-leading-button', { 'ow-queue-dnd-item-active': isSelected })}
                    aria-label={isSelected ? `Unselect ${music.name}` : `Select ${music.name}`}
                    aria-pressed={isSelected}
                    onClick={onSelect}>
                    <Icon.CheckBox />
                </button>
            ) : (
                <button
                    type="button"
                    className={cx('ow-queue-dnd-item-leading-button', 'ow-queue-dnd-item-drag-handle')}
                    aria-label={`Reorder ${music.name}`}
                    {...attributes}
                    {...listeners}>
                    <Icon.Menu />
                </button>
            )}

            <button
                type="button"
                className={cx('ow-queue-dnd-item-row-button')}
                onClick={isSelectMode ? onSelect : onClick}
                onContextMenu={(e) => {
                    e.preventDefault();

                    if (!isSelectMode) {
                        onOpenActions();
                    }
                }}>
                <Image
                    className={cx('ow-queue-dnd-item-cover')}
                    src={music.album.cover}
                    alt={music.album.name}
                />

                <div className={cx('ow-queue-dnd-item-copy')}>
                    <div className={cx('ow-queue-dnd-item-title-line')}>
                        <Text
                            as="span"
                            size="sm"
                            weight="medium"
                            className={cx('ow-queue-dnd-item-title')}>
                            {music.name}
                        </Text>
                        {tone === 'current' && (
                            <span className={cx('ow-queue-dnd-item-current-pill')}>Now</span>
                        )}
                    </div>

                    <Text as="span" variant="secondary" size="sm" className={cx('ow-queue-dnd-item-meta')}>
                        {music.artist.name}
                    </Text>
                </div>
            </button>

            {!isSelectMode && (
                <button
                    type="button"
                    className={cx('ow-queue-dnd-item-row-action')}
                    aria-label={`Open actions for ${music.name}`}
                    onClick={onOpenActions}>
                    <Icon.VerticalDots />
                </button>
            )}
        </li>
    );
}
