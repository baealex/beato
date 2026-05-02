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
        <div className={cx('MusicPlayerDiskStyle', { isPlaying })}>
            <div className={cx('disc')}>
                <div className={cx('label')}>
                    <Image
                        className={cx('labelImage')}
                        src={getOriginalImage(src)}
                        alt={alt}
                        loading="eager"
                    />
                </div>
                <span className={cx('center')} />
            </div>
        </div>
    );
};

export default MusicPlayerDiskStyle;
