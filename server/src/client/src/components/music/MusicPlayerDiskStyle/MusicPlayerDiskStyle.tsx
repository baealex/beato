import styles from './MusicPlayerDiskStyle.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

import { Image } from '~/components/shared';
import { getOriginalImage } from '~/modules/image';

interface MusicPlayerDiskStyleProps {
    isPlaying: boolean;
    src: string;
    alt: string;
}

const MusicPlayerDiskStyle = ({ isPlaying, src, alt }: MusicPlayerDiskStyleProps) => {
    return (
        <div className={cx('MusicPlayerDiskStyle')}>
            <Image
                className={cx('background')}
                src={src}
                alt={alt}
                loading="eager"
            />
            <div className={cx('foreground-wrapper')}>
                <Image
                    className={cx('foreground', { isPlaying })}
                    src={getOriginalImage(src)}
                    alt={alt}
                />
            </div>
        </div>
    );
};

export default MusicPlayerDiskStyle;
