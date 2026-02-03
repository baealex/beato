import styles from './AlbumListItem.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

import { Image } from '~/components/shared';

interface AlbumListItemProps {
    albumCover: string;
    albumName: string;
    artistName: string;
    onClick: () => void;
}

const AlbumListItem = ({ albumCover, albumName, artistName, onClick }: AlbumListItemProps) => {
    return (
        <div className={cx('AlbumListItem')} onClick={onClick}>
            <div className={cx('cover-wrapper')}>
                <Image className={cx('cover')} src={albumCover} alt={albumName} />
            </div>
            <div className={cx('info')}>
                <span className={cx('title')}>{albumName}</span>
                <span className={cx('artist')}>{artistName}</span>
            </div>
        </div>
    );
};

export default AlbumListItem;
