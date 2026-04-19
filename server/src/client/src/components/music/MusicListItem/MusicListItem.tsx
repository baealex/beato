import styles from './MusicListItem.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

import { IconButton, Image, Text } from '~/components/shared';
import { Disc, Heart, VerticalDots } from '~/icon';

interface MusicListItemProps {
    id?: number;
    albumName: string;
    albumCover?: string;
    artistName: string;
    trackNumber?: number;
    musicName: string;
    musicCodec?: string;
    isLiked?: boolean;
    isHated?: boolean;
    hideAlbumArt?: boolean;
    onClick?: () => void;
    onLongPress?: () => void;
}

const MusicListItem = ({
    albumName,
    albumCover,
    artistName,
    trackNumber,
    musicName,
    musicCodec,
    isLiked,
    isHated,
    hideAlbumArt,
    onClick,
    onLongPress
}: MusicListItemProps) => {
    return (
        <div
            className={cx('MusicListItem', { isHated })}
            onClick={onClick}
            onContextMenu={(e) => {
                e.preventDefault();
                onLongPress?.();
            }}>
            {hideAlbumArt ? (
                <Text as="span" size="sm" variant="muted" className={cx('track-number-col')}>
                    {trackNumber ?? '·'}
                </Text>
            ) : (
                <Image
                    className={cx('album-art')}
                    src={albumCover}
                    alt={albumName}
                    loading="eager"
                    icon={<Disc />}
                />
            )}
            <div className={cx('row')}>
                <div className={cx('info', { hasMenu: typeof onLongPress === 'function' })}>
                    <div className={cx('title')}>
                        {!!trackNumber && !hideAlbumArt && (
                            <span className={cx('track-number')}>{trackNumber}.</span>
                        )}
                        <Text as="span" size="sm" truncate>{musicName}</Text>
                        {musicCodec && musicCodec.toLowerCase() === 'flac' && (
                            <span className={cx('codec')}>{musicCodec}</span>
                        )}
                    </div>
                    <Text as="div" size="sm" variant="tertiary" truncate className={cx('artist')}>
                        {artistName}
                    </Text>
                </div>
                {onLongPress && (
                    <IconButton
                        aria-label={`Open actions for ${musicName}`}
                        active={isLiked}
                        className={cx('icon-button')}
                        onClick={(e) => {
                            e.stopPropagation();
                            onLongPress?.();
                        }}>
                        {isLiked ? <Heart /> : <VerticalDots />}
                    </IconButton>
                )}
            </div>
        </div>
    );
};

export default MusicListItem;
