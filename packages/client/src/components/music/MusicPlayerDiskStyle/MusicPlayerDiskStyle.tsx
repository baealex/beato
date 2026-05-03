import classNames from 'classnames';
const cx = classNames;

import { Image } from '~/components/shared';
import { getOriginalImage } from '~/modules/image';

interface MusicPlayerDiskStyleProps {
    isPlaying: boolean;
    src: string;
    alt: string;
}

const MusicPlayerDiskStyle = ({ isPlaying, src, alt }: MusicPlayerDiskStyleProps) => {
    return (
        <div className={cx('ow-music-player-disk-style-MusicPlayerDiskStyle', { 'ow-music-player-disk-style-isPlaying': isPlaying })}>
            <div className={cx('ow-music-player-disk-style-disc')}>
                <div className={cx('ow-music-player-disk-style-label')}>
                    <Image
                        className={cx('ow-music-player-disk-style-labelImage')}
                        src={getOriginalImage(src)}
                        alt={alt}
                        loading="eager"
                    />
                </div>
                <span className={cx('ow-music-player-disk-style-center')} />
            </div>
        </div>
    );
};

export default MusicPlayerDiskStyle;
