import classNames from 'classnames';
const cx = classNames;

import { Link } from 'react-router-dom';

import { Image, Text } from '~/components/shared';
import { Disc } from '~/icon';
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
        <div className={cx('ow-album-summary-AlbumSummary')}>
            <div className={cx('ow-album-summary-cover')}>
                <div className={cx('ow-album-summary-cover-inner')}>
                    <Image className={cx('ow-album-summary-cover-img')} src={getOriginalImage(cover)} alt={name} icon={<Disc />} />
                </div>
            </div>
            <Text as="h1" size="xl" weight="bold" className={cx('ow-album-summary-title')}>
                {name}
            </Text>
            <div className={cx('ow-album-summary-meta')}>
                <Link className={cx('ow-album-summary-artist')} to={`/artist/${artist.id}`}>
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
