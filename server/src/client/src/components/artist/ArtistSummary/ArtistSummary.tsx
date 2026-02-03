import styles from './ArtistSummary.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

import { Image, Text } from '~/components/shared';

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
                    <Image src={cover} alt={name} />
                </div>
            </div>
            <Text as="h1" size="2xl" weight="bold" className={cx('name')}>
                {name}
            </Text>
            <Text variant="tertiary" size="sm">
                You have listened to songs by this artist {listenedCount} times.
            </Text>
        </div>
    );
};

export default ArtistSummary;
