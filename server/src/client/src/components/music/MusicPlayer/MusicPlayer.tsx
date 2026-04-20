import styles from './MusicPlayer.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

import { useStore } from 'badland-react';
import { useNavigate } from 'react-router-dom';

import { Image } from '~/components/shared';
import * as Icon from '~/icon';

import { useStoreValue } from '~/hooks';
import { musicStore } from '~/store/music';
import { queueStore } from '~/store/queue';

const MusicPlayer = () => {
    const navigate = useNavigate();

    const [currentTrackId] = useStoreValue(queueStore, 'currentTrackId');
    const [progress] = useStoreValue(queueStore, 'progress');
    const [isPlaying] = useStoreValue(queueStore, 'isPlaying');
    const [repeatMode] = useStoreValue(queueStore, 'repeatMode');
    const [shuffle] = useStoreValue(queueStore, 'shuffle');
    const [{ musicMap }] = useStore(musicStore);

    const currentMusic = currentTrackId
        ? musicMap.get(currentTrackId)
        : null;

    // TODO: Fix type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleClickProgress = (e: any) => {
        const { width, left, right } = (e.currentTarget as HTMLDivElement).getBoundingClientRect();

        let x = e.touches ? e.touches[0].clientX : e.clientX;
        x = x < left ? left : x > right ? right : x;
        const percent = (x - left) / width;
        const duration = currentMusic?.duration || 1;

        queueStore.seek(duration * percent);
    };

    // TODO: Fix type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleMoveProgress = (e: any) => {
        if (e.buttons === 1) {
            handleClickProgress(e);
            return;
        }

        if (e.touches?.length === 1) {
            handleClickProgress(e);
        }
    };

    return (
        <div className={cx('MusicPlayer')}>
            <div
                className={cx('progress')}
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
                onClick={handleClickProgress}
                onMouseMove={handleMoveProgress}
                onTouchMove={handleMoveProgress}>
                <div
                    className={cx('bar')}
                    style={{ transform: `translateX(-${100 - progress}%)` }}
                />
            </div>
            <div className={cx('content')}>
                <button
                    className={cx('trackInfo')}
                    onClick={() => currentMusic && navigate('/player')}>
                    <div className={cx('albumArt')}>
                        <Image
                            className={cx('art')}
                            src={currentMusic?.album.cover}
                            alt={currentMusic?.album.name ?? ''}
                            loading="eager"
                            icon={<Icon.Disc />}
                        />
                    </div>
                    <div className={cx('meta')}>
                        <span className={cx('title')}>
                            {currentMusic?.name ?? 'No music'}
                        </span>
                        <span className={cx('artist')}>
                            {currentMusic?.artist.name ?? ''}
                        </span>
                    </div>
                </button>
                <div className={cx('controls')}>
                    <button
                        className={cx('controlButton', 'secondary')}
                        onClick={() => queueStore.changeRepeatMode()}>
                        {repeatMode === 'all' && <Icon.Repeat />}
                        {repeatMode === 'one' && <Icon.Infinite />}
                        {repeatMode === 'none' && <Icon.RightLeft />}
                    </button>
                    <button
                        className={cx('controlButton', 'secondary')}
                        onClick={() => queueStore.prev()}>
                        <Icon.SkipBack />
                    </button>
                    <button
                        className={cx('controlButton', 'primary')}
                        onClick={() => isPlaying ? queueStore.pause() : queueStore.play()}>
                        {isPlaying ? <Icon.Pause /> : <Icon.Play />}
                    </button>
                    <button
                        className={cx('controlButton', 'secondary')}
                        onClick={() => queueStore.next()}>
                        <Icon.SkipForward />
                    </button>
                    <button
                        className={cx('controlButton', 'secondary', { active: shuffle })}
                        onClick={() => queueStore.toggleShuffle()}>
                        <Icon.Shuffle />
                    </button>
                    <button
                        className={cx('controlButton', 'secondary', 'queue')}
                        onClick={() => navigate('/queue')}>
                        <Icon.ListMusic />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MusicPlayer;
