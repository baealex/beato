import classNames from 'classnames';
const cx = classNames;

import Image from '~/components/shared/Image';
import Text from '~/components/shared/Text';
import { User } from '~/icon';

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
        <div className={cx('ow-artist-list-item-ArtistListItem')} onClick={onClick}>
            <div className={cx('ow-artist-list-item-image-container')}>
                <span className={cx('ow-artist-list-item-halo')} aria-hidden="true" />
                <Image
                    className={cx('ow-artist-list-item-image')}
                    src={artistCover}
                    alt={artistName}
                    loading="eager"
                    icon={<User />}
                />
            </div>
            <div className={cx('ow-artist-list-item-info')}>
                <Text as="div" size="sm" weight="medium" truncate>
                    {artistName}
                </Text>
                <div className={cx('ow-artist-list-item-count')}>
                    <Text size="xs" variant="tertiary">{albumCount} {albumCount === 1 ? 'album' : 'albums'}</Text>
                    <Text size="xs" variant="muted">·</Text>
                    <Text size="xs" variant="tertiary">{musicCount} {musicCount === 1 ? 'song' : 'songs'}</Text>
                </div>
            </div>
        </div>
    );
};

export default ArtistListItem;
