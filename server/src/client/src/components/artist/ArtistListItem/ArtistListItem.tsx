import styles from './ArtistListItem.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

import Image from '~/components/shared/Image';
import Text from '~/components/shared/Text';

interface ArtistListItemProps {
    artistName: string;
    artistCover: string;
    albumCount: number;
    musicCount: number;
    onClick: () => void;
}

const ArtistListItem = ({
    artistName,
    artistCover,
    albumCount,
    musicCount,
    onClick
}: ArtistListItemProps) => {
    return (
        <div className={cx('ArtistListItem')} onClick={onClick}>
            <div className={cx('image-container')}>
                <Image
                    className={cx('image')}
                    src={artistCover}
                    alt={artistName}
                />
            </div>
            <div className={cx('info')}>
                <Text as="div" size="md" weight="semibold" truncate>
                    {artistName}
                </Text>
                <div className={cx('count')}>
                    <Text size="xs" variant="tertiary">{albumCount} {albumCount === 1 ? 'album' : 'albums'}</Text>
                    <Text size="xs" variant="muted">·</Text>
                    <Text size="xs" variant="tertiary">{musicCount} {musicCount === 1 ? 'song' : 'songs'}</Text>
                </div>
            </div>
        </div>
    );
};

export default ArtistListItem;
