import styles from './MusicPlayer.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

import { useStore } from 'badland-react';
import { useNavigate } from 'react-router-dom';

import MusicListItem from '../MusicListItem';
import * as Icon from '~/icon';

import { musicStore } from '~/store/music';
import { queueStore } from '~/store/queue';

const MusicPlayer = () => {
    const navigate = useNavigate();

    const [state] = useStore(queueStore);
    const [{ musicMap }] = useStore(musicStore);

    const currentMusic = state.selected !== null
        ? musicMap.get(state.items[state.selected])
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
                aria-valuenow={state.progress}
                aria-valuemin={0}
                aria-valuemax={100}
                onClick={handleClickProgress}
                onMouseMove={handleMoveProgress}
                onTouchMove={handleMoveProgress}>
                <div
                    className={cx('bar')}
                    style={{
                        transform: `translate(-${(100 - state.progress)}%, 0)`
                    }}
                />
            </div>
            <div className={cx('player')}>
                <div className={cx('music')}>
                    <MusicListItem
                        albumName={currentMusic?.album.name ?? ''}
                        albumCover={currentMusic?.album.cover ?? ''}
                        musicName={currentMusic?.name ?? 'No music'}
                        artistName={currentMusic?.artist.name ?? ''}
                        onClick={() => currentMusic && navigate('/player')}
                    />
                </div>
                <div className={cx('action')}>
                    <button className={cx('icon-button', 'mode')} onClick={() => queueStore.changeRepeatMode()}>
                        {state.repeatMode === 'all' && <Icon.Repeat />}
                        {state.repeatMode === 'one' && <Icon.Infinite />}
                        {state.repeatMode === 'none' && <Icon.RightLeft />}
                    </button>
                    <button className={cx('icon-button', 'skip-back')} onClick={() => queueStore.prev()}>
                        <Icon.Play />
                    </button>
                    <button className={cx('icon-button', 'play')} onClick={() => state.isPlaying ? queueStore.pause() : queueStore.play()}>
                        {state.isPlaying ? <Icon.Pause /> : <Icon.Play />}
                    </button>
                    <button className={cx('icon-button', 'skip-forward')} onClick={() => queueStore.next()}>
                        <Icon.Play />
                    </button>
                    <button
                        className={cx('icon-button', 'shuffle', {
                            'active': state.shuffle
                        })}
                        onClick={() => queueStore.toggleShuffle()}>
                        <Icon.Shuffle />
                    </button>
                    <button className={cx('icon-button', 'queue')} onClick={() => navigate('/queue')}>
                        <Icon.Menu />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MusicPlayer;
