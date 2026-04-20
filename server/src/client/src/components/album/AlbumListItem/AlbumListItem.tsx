import styles from './AlbumListItem.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

import { Card, Image, Text } from '~/components/shared';
import { Disc } from '~/icon';

interface AlbumListItemProps {
    albumCover: string;
    albumName: string;
    artistName: string;
    onClick: () => void;
}

const AlbumListItem = ({ albumCover, albumName, artistName, onClick }: AlbumListItemProps) => {
    return (
        <Card
            variant="outlined"
            radius="xl"
            padding="none"
            interactive
            overflow
            onClick={onClick}>
            <div className={cx('cover-wrapper')}>
                <Image className={cx('cover')} src={albumCover} alt={albumName} icon={<Disc />} />
            </div>
            <div className={cx('info')}>
                <Text as="span" size="sm" weight="semibold" truncate>{albumName}</Text>
                <Text as="span" variant="secondary" size="xs" truncate>{artistName}</Text>
            </div>
        </Card>
    );
};

export default AlbumListItem;
