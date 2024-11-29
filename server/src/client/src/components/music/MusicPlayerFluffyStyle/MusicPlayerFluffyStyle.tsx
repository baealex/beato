import styles from './MusicPlayerFluffyStyle.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

import { useEffect, useState } from 'react';
import { Image } from '~/components/shared';

interface MusicPlayerFluffyStyleProps {
    isPlaying: boolean;
    src: string;
    alt: string;
}

const MusicPlayerFluffyStyle = ({ isPlaying, src, alt }: MusicPlayerFluffyStyleProps) => {
    const [borderRadius, setBorderRadius] = useState('50%');

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout> | null = null;

        if (!isPlaying) {
            setBorderRadius('50%');
            return;
        }

        const setRandomBorderRadius = () => {
            const makeRandom = () => {
                return Math.floor(Math.random() * 90 + 10) + '%';
            };
            setBorderRadius(`${makeRandom()} ${makeRandom()} ${makeRandom()} ${makeRandom()}`);
            timer = setTimeout(setRandomBorderRadius, 1000);
        };
        setRandomBorderRadius();

        return () => {
            setBorderRadius('50%');
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [isPlaying]);

    return (
        <div className={cx('MusicPlayerFluffyStyle')}>
            <img
                className={cx('background')}
                style={{ borderRadius }}
                src={src}
                alt={alt}
            />
            <div className={cx('foreground-wrapper')}>
                <Image
                    className={cx('foreground')}
                    style={{ borderRadius }}
                    src={src.replace('/resized', '')}
                    alt={alt}
                />
            </div>
        </div>
    );
};

export default MusicPlayerFluffyStyle;
