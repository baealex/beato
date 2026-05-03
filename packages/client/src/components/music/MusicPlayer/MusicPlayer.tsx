import classNames from 'classnames';
const cx = classNames;

import { useAppStore as useStore } from '~/store/base-store';
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
        <div className={cx('ow-music-player-MusicPlayer')}>
            <div
                className={cx('ow-music-player-progress')}
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
                onClick={handleClickProgress}
                onMouseMove={handleMoveProgress}
                onTouchMove={handleMoveProgress}>
                <div
                    className={cx('ow-music-player-bar')}
                    style={{ transform: `translateX(-${100 - progress}%)` }}
                />
            </div>
            <div className={cx('ow-music-player-content')}>
                <button
                    className={cx('ow-music-player-trackInfo')}
                    onClick={() => currentMusic && navigate('/player')}>
                    <div className={cx('ow-music-player-albumArt')}>
                        <Image
                            className={cx('ow-music-player-art')}
                            src={currentMusic?.album.cover}
                            alt={currentMusic?.album.name ?? ''}
                            loading="eager"
                            icon={<Icon.Disc />}
                        />
                    </div>
                    <div className={cx('ow-music-player-meta')}>
                        <span className={cx('ow-music-player-title')}>
                            {currentMusic?.name ?? 'No music'}
                        </span>
                        <span className={cx('ow-music-player-artist')}>
                            {currentMusic?.artist.name ?? ''}
                        </span>
                    </div>
                </button>
                <div className={cx('ow-music-player-controls')}>
                    <button
                        className={cx('ow-music-player-controlButton', 'ow-music-player-secondary')}
                        onClick={() => queueStore.changeRepeatMode()}>
                        {repeatMode === 'all' && <Icon.Repeat />}
                        {repeatMode === 'one' && <Icon.Infinite />}
                        {repeatMode === 'none' && <Icon.RightLeft />}
                    </button>
                    <button
                        className={cx('ow-music-player-controlButton', 'ow-music-player-secondary')}
                        onClick={() => queueStore.prev()}>
                        <Icon.SkipBack />
                    </button>
                    <button
                        className={cx('ow-music-player-controlButton', 'ow-music-player-primary')}
                        onClick={() => isPlaying ? queueStore.pause() : queueStore.play()}>
                        {isPlaying ? <Icon.Pause /> : <Icon.Play />}
                    </button>
                    <button
                        className={cx('ow-music-player-controlButton', 'ow-music-player-secondary')}
                        onClick={() => queueStore.next()}>
                        <Icon.SkipForward />
                    </button>
                    <button
                        className={cx('ow-music-player-controlButton', 'ow-music-player-secondary', { 'ow-music-player-active': shuffle })}
                        onClick={() => queueStore.toggleShuffle()}>
                        <Icon.Shuffle />
                    </button>
                    <button
                        className={cx('ow-music-player-controlButton', 'ow-music-player-secondary', 'ow-music-player-queue')}
                        onClick={() => navigate('/queue')}>
                        <Icon.ListMusic />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MusicPlayer;
