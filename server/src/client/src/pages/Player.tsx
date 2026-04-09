import type { KeyboardEvent } from 'react';

import styles from './Player.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

import { useNavigate } from 'react-router-dom';
import { useStore } from 'badland-react';

import { MusicPlayerDiskStyle, MusicPlayerFluffyStyle, MusicPlayerVisualizerStyle } from '~/components/music';
import { Text } from '~/components/shared';
import * as Icon from '~/icon';

import { useBack, useStoreValue } from '~/hooks';

import { getImage } from '~/modules/image';
import { makePlayTime } from '~/modules/time';

import { musicStore } from '~/store/music';
import { queueStore } from '~/store/queue';
import { themeStore } from '~/store/theme';

export default function PlayerDetail() {
    const back = useBack();
    const navigate = useNavigate();

    const [currentTrackId] = useStoreValue(queueStore, 'currentTrackId');
    const [selected] = useStoreValue(queueStore, 'selected');
    const [queueLength] = useStoreValue(queueStore, 'queueLength');
    const [currentTime] = useStoreValue(queueStore, 'currentTime');
    const [progress] = useStoreValue(queueStore, 'progress');
    const [isPlaying] = useStoreValue(queueStore, 'isPlaying');
    const [repeatMode] = useStoreValue(queueStore, 'repeatMode');
    const [shuffle] = useStoreValue(queueStore, 'shuffle');
    const [{ playerAlbumArtStyle }] = useStore(themeStore);
    const [{ musicMap }] = useStore(musicStore);

    const currentMusic = currentTrackId
        ? musicMap.get(currentTrackId)
        : null;
    const duration = currentMusic?.duration || 0;
    const queuePosition = selected !== null ? selected + 1 : null;
    const publishedYear = currentMusic?.album?.publishedYear?.trim() || '';

    // TODO: Fix type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleClickProgress = (e: any) => {
        const { width, left, right } = (e.currentTarget as HTMLDivElement).getBoundingClientRect();

        let x = e.touches ? e.touches[0].clientX : e.clientX;
        x = x < left ? left : x > right ? right : x;
        const percent = (x - left) / width;

        if (duration <= 0) {
            return;
        }

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

    const handleKeyDownProgress = (e: KeyboardEvent<HTMLDivElement>) => {
        if (duration <= 0) {
            return;
        }

        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            queueStore.seek(Math.max(0, currentTime - 5));
        }

        if (e.key === 'ArrowRight') {
            e.preventDefault();
            queueStore.seek(Math.min(duration, currentTime + 5));
        }

        if (e.key === 'Home') {
            e.preventDefault();
            queueStore.seek(0);
        }

        if (e.key === 'End') {
            e.preventDefault();
            queueStore.seek(duration);
        }
    };

    const showBackground = playerAlbumArtStyle.includes('visualizer');

    return (
        <div className={cx('Player')}>
            {currentMusic && showBackground && (
                <div className={cx('background')}>
                    <img src={getImage(currentMusic.album.cover)} alt="" aria-hidden="true" />
                    <div className={cx('overlay')} />
                </div>
            )}

            <div className={cx('container')}>
                <div className={cx('top-bar')}>
                    <button
                        type="button"
                        className={cx('utility-button')}
                        aria-label="Go back"
                        onClick={back}>
                        <Icon.ChevronLeft />
                    </button>
                </div>

                {currentMusic ? (
                    <div className={cx('content')}>
                        <div className={cx('art-wrap')}>
                            <div className={cx('album-art', { framed: showBackground })}>
                                {playerAlbumArtStyle === '' && (
                                    <MusicPlayerFluffyStyle
                                        isPlaying={isPlaying}
                                        src={getImage(currentMusic.album.cover)}
                                        alt={currentMusic.album.name}
                                    />
                                )}
                                {playerAlbumArtStyle === 'disk' && (
                                    <MusicPlayerDiskStyle
                                        isPlaying={isPlaying}
                                        src={getImage(currentMusic.album.cover)}
                                        alt={currentMusic.album.name}
                                    />
                                )}
                                {playerAlbumArtStyle.includes('visualizer') && (
                                    <MusicPlayerVisualizerStyle
                                        type={playerAlbumArtStyle.split(':')[1] || 'round'}
                                        isPlaying={isPlaying}
                                        src={getImage(currentMusic.album.cover)}
                                        alt={currentMusic.album.name}
                                    />
                                )}
                            </div>
                        </div>

                        <div className={cx('title-block')}>
                            <Text
                                as="span"
                                variant="muted"
                                size="xs"
                                weight="medium"
                                className={cx('eyebrow')}>
                                Now playing
                            </Text>
                            <Text as="h1" size="2xl" weight="bold" className={cx('title')}>
                                {currentMusic.name}
                            </Text>

                            <Text as="p" variant="secondary" size="lg" weight="medium">
                                {currentMusic.artist.name}
                            </Text>

                            <div className={cx('album-line')}>
                                <Text as="span" variant="tertiary" size="sm" weight="medium">
                                    {currentMusic.album.name}
                                </Text>

                                {publishedYear && (
                                    <Text as="span" variant="muted" size="sm">
                                        {publishedYear}
                                    </Text>
                                )}
                            </div>
                        </div>

                        <div className={cx('progress-section')}>
                            <div
                                className={cx('progress')}
                                role="slider"
                                tabIndex={duration > 0 ? 0 : -1}
                                aria-label="Seek playback position"
                                aria-valuenow={Math.round(currentTime)}
                                aria-valuemin={0}
                                aria-valuemax={Math.round(duration)}
                                aria-valuetext={`${makePlayTime(currentTime)} of ${makePlayTime(duration)}`}
                                onClick={handleClickProgress}
                                onKeyDown={handleKeyDownProgress}
                                onMouseMove={handleMoveProgress}
                                onTouchMove={handleMoveProgress}>
                                <div
                                    className={cx('bar')}
                                    style={{ transform: `scaleX(${progress / 100})` }}
                                />
                                <div
                                    className={cx('thumb')}
                                    style={{ left: `${progress}%` }}
                                />
                            </div>
                            <div className={cx('time-info')}>
                                <Text variant="tertiary" size="sm">
                                    {makePlayTime(currentTime)}
                                </Text>
                                <Text variant="tertiary" size="sm">
                                    {makePlayTime(duration)}
                                </Text>
                            </div>
                        </div>

                        <div className={cx('controls')}>
                            <button
                                type="button"
                                className={cx('control-button', { active: shuffle })}
                                aria-label={shuffle ? 'Disable shuffle' : 'Enable shuffle'}
                                onClick={() => queueStore.toggleShuffle()}>
                                <Icon.Shuffle />
                            </button>

                            <button
                                type="button"
                                className={cx('control-button')}
                                aria-label="Previous track"
                                onClick={() => queueStore.prev()}>
                                <Icon.SkipBack />
                            </button>

                            <button
                                type="button"
                                className={cx('play-button')}
                                aria-label={isPlaying ? 'Pause playback' : 'Resume playback'}
                                onClick={() => isPlaying ? queueStore.pause() : queueStore.play()}>
                                {isPlaying ? <Icon.Pause /> : <Icon.Play />}
                            </button>

                            <button
                                type="button"
                                className={cx('control-button')}
                                aria-label="Next track"
                                onClick={() => queueStore.next()}>
                                <Icon.SkipForward />
                            </button>

                            <button
                                type="button"
                                className={cx('control-button')}
                                aria-label={`Repeat mode ${repeatMode}`}
                                onClick={() => queueStore.changeRepeatMode()}>
                                {repeatMode === 'all' && <Icon.Repeat />}
                                {repeatMode === 'one' && <Icon.Infinite />}
                                {repeatMode === 'none' && <Icon.RightLeft />}
                            </button>
                        </div>

                        <div className={cx('secondary-actions')}>
                            <button
                                type="button"
                                className={cx('secondary-action')}
                                onClick={() => navigate(`/artist/${currentMusic.artist.id}`)}>
                                <Icon.Music />
                                <span>Artist</span>
                            </button>
                            <button
                                type="button"
                                className={cx('secondary-action')}
                                onClick={() => navigate(`/album/${currentMusic.album.id}`)}>
                                <Icon.Disc />
                                <span>Album</span>
                            </button>
                            {queuePosition !== null && (
                                <button
                                    type="button"
                                    className={cx('secondary-action')}
                                    onClick={() => navigate('/queue')}>
                                    <Icon.ListMusic />
                                    <span>Queue {queuePosition}/{queueLength}</span>
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className={cx('empty-state')}>
                        <div className={cx('empty-icon')}>
                            <Icon.Music />
                        </div>

                        <div className={cx('empty-copy')}>
                            <Text as="h1" size="2xl" weight="bold">
                                Nothing is playing.
                            </Text>
                            <Text as="p" variant="secondary" size="md">
                                Start something from your library or queue to return here.
                            </Text>
                        </div>

                        <div className={cx('empty-actions')}>
                            <button
                                type="button"
                                className={cx('empty-button', 'empty-button-primary')}
                                onClick={() => navigate('/')}>
                                <Icon.Music />
                                <span>Open library</span>
                            </button>
                            <button
                                type="button"
                                className={cx('empty-button')}
                                onClick={() => navigate('/queue')}>
                                <Icon.ListMusic />
                                <span>Open queue</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
