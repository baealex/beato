import classNames from 'classnames';
const cx = classNames;

import { Image, Text } from '~/components/shared';
import { User } from '~/icon';

interface ArtistSummaryProps {
    name: string;
    cover: string;
    listenedCount: number;
}

const ArtistSummary = ({
    name,
    cover,
    listenedCount
}: ArtistSummaryProps) => {
    return (
        <div className={cx('ow-artist-summary-ArtistSummary')}>
            <div className={cx('ow-artist-summary-cover')}>
                <div className={cx('ow-artist-summary-cover-inner')}>
                    <Image className={cx('ow-artist-summary-cover-img')} src={cover} alt={name} icon={<User />} />
                </div>
            </div>
            <Text as="h1" size="xl" weight="bold" className={cx('ow-artist-summary-name')}>
                {name}
            </Text>
            {listenedCount > 0 && (
                <Text variant="tertiary" size="sm">
                    {listenedCount} plays
                </Text>
            )}
        </div>
    );
};

export default ArtistSummary;
