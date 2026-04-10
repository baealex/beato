import styles from './AlbumSummary.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

import { Link } from 'react-router-dom';

import { Image, Text } from '~/components/shared';
import { getOriginalImage } from '~/modules/image';

import type { Album } from '~/models/type';

type AlbumSummaryProps = Pick<Album, 'cover' | 'name' | 'artist' | 'publishedYear'>;

const AlbumSummary = ({
    cover,
    name,
    artist,
    publishedYear
}: AlbumSummaryProps) => {
    return (
        <div className={cx('AlbumSummary')}>
            <div className={cx('cover')}>
                <div className={cx('cover-inner')}>
                    <Image src={getOriginalImage(cover)} alt={name} />
                </div>
            </div>
            <Text as="h1" size="2xl" weight="bold" className={cx('title')}>
                {name}
            </Text>
            <div className={cx('meta')}>
                <Link className={cx('artist')} to={`/artist/${artist.id}`}>
                    <Text variant="secondary" size="md">
                        {artist.name}
                    </Text>
                </Link>
                <Text variant="muted" size="md">•</Text>
                <Text variant="tertiary" size="md">
                    {publishedYear}
                </Text>
            </div>
        </div>
    );
};

export default AlbumSummary;
