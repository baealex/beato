import styles from './ArtistListItem.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

import Image from '~/components/shared/Image';

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
    onClick,
}: ArtistListItemProps) => {
    return (
        <div className={cx('ArtistListItem', 'clickable', 'linkable')} onClick={onClick}>
            <Image
                src={artistCover}
                alt={artistName}
            />
            <div className={cx('info')}>
                <div className={cx('name')}>
                    {artistName}
                </div>
                <div className={cx('count')}>
                    <div className={cx('album')}>
                        {albumCount} albums
                    </div>
                    <span>/</span>
                    <div className={cx('music')}>
                        {musicCount} songs
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArtistListItem;
