import styles from './MusicListItem.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

import { Image } from '~/components/shared';
import { Heart, MoreVerticalFill } from '~/icon';

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
    onClick,
    onLongPress,
}: MusicListItemProps) => {
    return (
        <div
            className={cx(
                'MusicListItem',
                {
                    isHated
                },
                {
                    hasMenu: typeof onLongPress === 'function'
                },
                {
                    hasAlbumCover: typeof onLongPress === 'function'
                },
            )}
            onClick={onClick}
            onContextMenu={(e) => {
                e.preventDefault();
                onLongPress?.();
            }}>
            {typeof albumCover === 'string' && (
                <Image className={cx('album-art')} src={albumCover} alt={albumName} />
            )}
            <div className={cx('row')}>
                <div className={cx('info')}>
                    <div className={cx('title')}>
                        {!!trackNumber && (
                            <span className={cx('track-number')}>{trackNumber}.</span>
                        )}
                        {musicName}
                        {musicCodec && musicCodec.toLocaleLowerCase() === 'flac' && (
                            <span className={cx('codec')}>{musicCodec}</span>
                        )}
                    </div>
                    <div className={cx('artist')}>
                        {artistName}
                    </div>
                </div>
                {onLongPress && (
                    <button
                        className={cx('icon-button', {
                            isLiked
                        })}
                        onClick={(e) => {
                            e.stopPropagation();
                            onLongPress?.();
                        }}>
                        {isLiked ? (
                            <Heart />
                        ) : (
                            <MoreVerticalFill />
                        )}
                    </button>
                )}
            </div>
        </div>
    );
};

export default MusicListItem;
