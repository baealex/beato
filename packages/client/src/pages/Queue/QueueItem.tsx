import type {
    ButtonHTMLAttributes,
    CSSProperties
} from 'react';

import classNames from 'classnames';
const cx = classNames;

import { Image, Text } from '~/components/shared';
import * as Icon from '~/icon';

import type { Music } from '~/models/type';

import type { QueueTone } from './QueueDndItem';

interface QueueItemProps {
    className?: string;
    music: Music;
    index: number;
    tone: QueueTone;
    isSelectMode: boolean;
    isSelected: boolean;
    onSelect: () => void;
    onClick: () => void;
    onOpenActions: () => void;
    onReorderPointerDown?: ButtonHTMLAttributes<HTMLButtonElement>['onPointerDown'];
    style?: CSSProperties;
}

export default function QueueItem({
    className,
    music,
    index,
    tone,
    isSelectMode,
    isSelected,
    onSelect,
    onClick,
    onOpenActions,
    onReorderPointerDown,
    style
}: QueueItemProps) {
    return (
        <li
            data-queue-index={index}
            style={style}
            className={cx('ow-queue-dnd-item-item', `ow-queue-dnd-item-${tone}`, className, { 'ow-queue-dnd-item-selected': isSelected })}>
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
                    onPointerDown={onReorderPointerDown}>
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
                    loading="eager"
                    icon={<Icon.Disc />}
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
