import classNames from 'classnames';
const cx = classNames;

import { Image, Text } from '~/components/shared';
import { Disc } from '~/icon';

interface AlbumListItemProps {
    albumCover: string;
    albumName: string;
    artistName: string;
    musicCount?: number;
    publishedYear?: string;
    onClick: () => void;
}

const AlbumListItem = ({
    albumCover,
    albumName,
    artistName,
    musicCount,
    publishedYear,
    onClick
}: AlbumListItemProps) => {
    return (
        <button
            type="button"
            className={cx('ow-album-list-item-AlbumListItem')}
            onClick={onClick}>
            <span className={cx('ow-album-list-item-artStack')}>
                <span className={cx('ow-album-list-item-disc')} aria-hidden="true" />
                <Image className={cx('ow-album-list-item-cover')} src={albumCover} alt={albumName} loading="eager" icon={<Disc />} />
            </span>
            <div className={cx('ow-album-list-item-info')}>
                <Text as="span" size="sm" weight="medium" truncate>{albumName}</Text>
                <Text as="span" variant="tertiary" size="xs" truncate>{artistName}</Text>
            </div>
            <div className={cx('ow-album-list-item-meta')}>
                {publishedYear && (
                    <span>{publishedYear}</span>
                )}
                {typeof musicCount === 'number' && (
                    <span>{musicCount} tracks</span>
                )}
            </div>
        </button>
    );
};

export default AlbumListItem;
