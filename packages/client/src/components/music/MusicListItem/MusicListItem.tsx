import classNames from 'classnames';
const cx = classNames;

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
            className={cx('ow-music-list-item-MusicListItem', { 'ow-music-list-item-isHated': isHated })}
            onClick={onClick}
            onContextMenu={(e) => {
                e.preventDefault();
                onLongPress?.();
            }}>
            {hideAlbumArt ? (
                <Text as="span" size="sm" variant="muted" className={cx('ow-music-list-item-track-number-col')}>
                    {trackNumber ?? '·'}
                </Text>
            ) : (
                <span className={cx('ow-music-list-item-artWrap')}>
                    <span className={cx('ow-music-list-item-wave')} aria-hidden="true">
                        <span />
                        <span />
                        <span />
                    </span>
                    <Image
                    className={cx('ow-music-list-item-album-art')}
                    src={albumCover}
                    alt={albumName}
                    loading="eager"
                    icon={<Disc />}
                    />
                </span>
            )}
            <div className={cx('ow-music-list-item-row')}>
                <div className={cx('ow-music-list-item-info', { 'ow-music-list-item-hasMenu': typeof onLongPress === 'function' })}>
                    <div className={cx('ow-music-list-item-title')}>
                        {!!trackNumber && !hideAlbumArt && (
                            <span className={cx('ow-music-list-item-track-number')}>{trackNumber}.</span>
                        )}
                        <Text as="span" size="sm" truncate>{musicName}</Text>
                        {musicCodec && musicCodec.toLowerCase() === 'flac' && (
                            <span className={cx('ow-music-list-item-codec')}>{musicCodec}</span>
                        )}
                    </div>
                    <Text
                        as="div"
                        size="sm"
                        variant="tertiary"
                        truncate
                        className={cx('ow-music-list-item-artist')}>
                        {artistName}
                    </Text>
                </div>
                {onLongPress && (
                    <IconButton
                        aria-label={`Open actions for ${musicName}`}
                        active={isLiked}
                        className={cx('ow-music-list-item-icon-button')}
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
