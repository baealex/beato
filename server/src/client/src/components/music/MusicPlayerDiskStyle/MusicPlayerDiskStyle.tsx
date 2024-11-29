import styles from './MusicPlayerDiskStyle.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

import { Image } from '~/components/shared';

interface MusicPlayerDiskStyleProps {
    isPlaying: boolean;
    src: string;
    alt: string;
}

const MusicPlayerDiskStyle = ({ isPlaying, src, alt }: MusicPlayerDiskStyleProps) => {
    return (
        <div className={cx('MusicPlayerDiskStyle')}>
            <img
                className={cx('background')}
                src={src}
                alt={alt}
            />
            <div className={cx('foreground-wrapper')}>
                <Image
                    className={cx('foreground', { isPlaying })}
                    src={src.replace('/resized', '')}
                    alt={alt}
                />
            </div>
        </div>
    );
};

export default MusicPlayerDiskStyle;
