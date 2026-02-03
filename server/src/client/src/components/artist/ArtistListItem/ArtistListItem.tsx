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
                <div className={cx('name')}>
                    {artistName}
                </div>
                <div className={cx('count')}>
                    <span>{albumCount} albums</span>
                    <span className={cx('separator')}>/</span>
                    <span>{musicCount} songs</span>
                </div>
            </div>
        </div>
    );
};

export default ArtistListItem;
