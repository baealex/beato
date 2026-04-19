import type {
    ButtonHTMLAttributes,
    CSSProperties
} from 'react';

import styles from './QueueDndItem.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

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
            className={cx('item', tone, className, { selected: isSelected })}>
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
                    onPointerDown={onReorderPointerDown}>
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
                    loading="eager"
                    icon={<Icon.Disc />}
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
