import styles from './AlbumSummary.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

import { Link } from 'react-router-dom';

import { Image, SummaryTitle } from '~/components/shared';

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
                <div>
                    <Image src={cover.replace('/resized', '') || ''} alt={artist.name} />
                </div>
            </div>
            <SummaryTitle as="h1">
                {name}
            </SummaryTitle>
            <div className={cx('row')}>
                <Link className={cx('artist')} to={`/artist/${artist.id}`}>
                    {artist.name}
                </Link>
                -
                <span className={cx('year')}>
                    {publishedYear}
                </span>
            </div>
        </div>
    );
};

export default AlbumSummary;
