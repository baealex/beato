import styles from './AlbumListItem.module.scss'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)

import { Image } from '~/components/shared'

interface AlbumListItemProps {
    albumCover: string;
    albumName: string;
    artistName: string;
    onClick: () => void;
}

const AlbumListItem = ({ albumCover, albumName, artistName, onClick  }: AlbumListItemProps) => {
    return (
        <div className={cx('AlbumListItem')} onClick={onClick}>
            <Image className={cx('cover')} src={albumCover} alt={albumName} />
            <span className={cx('title')}>{albumName}</span>
            <span className={cx('artist')}>{artistName}</span>
        </div>
    )
}

export default AlbumListItem
