import styles from './ArtistSummary.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

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
        <div className={cx('ArtistSummary')}>
            <div className={cx('cover')}>
                <div className={cx('cover-inner')}>
                    <Image className={cx('cover-img')} src={cover} alt={name} icon={<User />} />
                </div>
            </div>
            <Text as="h1" size="xl" weight="bold" className={cx('name')}>
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
