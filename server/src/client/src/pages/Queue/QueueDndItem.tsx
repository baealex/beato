import styles from './QueueDndItem.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

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
            className={cx('item', tone, { selected: isSelected })}>
            {isSelectMode ? (
                <button
                    type="button"
                    className={cx('leading-button', { active: isSelected })}
                    aria-label={isSelected ? `Unselect ${music.name}` : `Select ${music.name}`}
                    aria-pressed={isSelected}
                    onClick={onSelect}>
                    <Icon.CheckBox />
                </button>
            ) : (
                <button
                    type="button"
                    className={cx('leading-button', 'drag-handle')}
                    aria-label={`Reorder ${music.name}`}
                    style={{
                        cursor: 'grab',
                        touchAction: 'none'
                    }}
                    {...attributes}
                    {...listeners}>
                    <Icon.Menu />
                </button>
            )}

            <button
                type="button"
                className={cx('row-button')}
                onClick={isSelectMode ? onSelect : onClick}
                onContextMenu={(e) => {
                    e.preventDefault();

                    if (!isSelectMode) {
                        onOpenActions();
                    }
                }}>
                <Image
                    className={cx('cover')}
                    src={music.album.cover}
                    alt={music.album.name}
                />

                <div className={cx('copy')}>
                    <div className={cx('title-line')}>
                        <Text
                            as="span"
                            size="md"
                            weight={tone === 'current' ? 'semibold' : 'medium'}
                            className={cx('title')}>
                            {music.name}
                        </Text>
                        {tone === 'current' && (
                            <span className={cx('current-pill')}>Now</span>
                        )}
                    </div>

                    <Text as="span" variant="secondary" size="sm" className={cx('meta')}>
                        {music.artist.name}
                    </Text>

                    <Text as="span" variant="tertiary" size="sm" className={cx('submeta')}>
                        {music.album.name}
                    </Text>
                </div>
            </button>

            {!isSelectMode && (
                <button
                    type="button"
                    className={cx('row-action')}
                    aria-label={`Open actions for ${music.name}`}
                    onClick={onOpenActions}>
                    <Icon.VerticalDots />
                </button>
            )}
        </li>
    );
}
