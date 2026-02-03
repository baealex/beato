import styles from './Player.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

import { useNavigate } from 'react-router-dom';
import { useStore } from 'badland-react';

import { MusicActionPanelContent, MusicPlayerDiskStyle, MusicPlayerFluffyStyle, MusicPlayerVisualizerStyle } from '~/components/music';
import { Text } from '~/components/shared';
import * as Icon from '~/icon';

import { useBack } from '~/hooks';

import { panel } from '~/modules/panel';
import { getImage } from '~/modules/image';
import { makePlayTime } from '~/modules/time';

import { musicStore } from '~/store/music';
import { queueStore } from '~/store/queue';
import { themeStore } from '~/store/theme';

export default function PlayerDetail() {
    const back = useBack();
    const navigate = useNavigate();

    const [state] = useStore(queueStore);
    const [{ playerAlbumArtStyle }] = useStore(themeStore);
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
                <div className={cx('content')}>
                    <div className={cx('album-art', { framed: showBackground })}>
                        {playerAlbumArtStyle === '' && (
                            <MusicPlayerFluffyStyle
                                isPlaying={state.isPlaying}
                                src={getImage(currentMusic?.album.cover)}
                                alt={currentMusic?.album.name || ''}
                            />
                        )}
                        {playerAlbumArtStyle === 'disk' && (
                            <MusicPlayerDiskStyle
                                isPlaying={state.isPlaying}
                                src={getImage(currentMusic?.album.cover)}
                                alt={currentMusic?.album.name || ''}
                            />
                        )}
                        {playerAlbumArtStyle.includes('visualizer') && (
                            <MusicPlayerVisualizerStyle
                                type={playerAlbumArtStyle.split(':')[1] || 'round'}
                                isPlaying={state.isPlaying}
                                src={getImage(currentMusic?.album.cover)}
                                alt={currentMusic?.album.name || ''}
                            />
                        )}
                    </div>

                    <button
                        className={cx('title-info')}
                        onClick={() => currentMusic && panel.open({
                            title: 'Related to this music',
                            content: (
                                <MusicActionPanelContent
                                    id={currentMusic.id}
                                    onAlbumClick={() => navigate(`/album/${currentMusic.album.id}`)}
                                    onArtistClick={() => navigate(`/artist/${currentMusic.artist.id}`)}
                                />
                            )
                        })}>
                        <Text as="div" size="xl" weight="semibold" className={cx('name')}>
                            {currentMusic?.name}
                        </Text>
                        <Text as="div" variant="secondary" size="md">
                            {currentMusic?.artist.name}
                        </Text>
                    </button>

                    <div className={cx('progress-section')}>
                        <div
                            className={cx('progress')}
                            role="slider"
                            tabIndex={0}
                            aria-valuenow={state.progress}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            onClick={handleClickProgress}
                            onMouseMove={handleMoveProgress}
                            onTouchMove={handleMoveProgress}>
                            <div
                                className={cx('bar')}
                                style={{ transform: `scaleX(${state.progress / 100})` }}
                            />
                            <div
                                className={cx('thumb')}
                                style={{ left: `${state.progress}%` }}
                            />
                        </div>
                        <div className={cx('time-info')}>
                            <Text variant="tertiary" size="sm">
                                {makePlayTime(state.currentTime)}
                            </Text>
                            <Text variant="tertiary" size="sm">
                                {makePlayTime(currentMusic?.duration || 0)}
                            </Text>
                        </div>
                    </div>

                    <div className={cx('controls')}>
                        <button
                            className={cx('control-button', { active: state.shuffle })}
                            onClick={() => queueStore.toggleShuffle()}>
                            <Icon.Shuffle />
                        </button>

                        <button
                            className={cx('control-button')}
                            onClick={() => queueStore.prev()}>
                            <Icon.SkipBack />
                        </button>

                        <button
                            className={cx('play-button')}
                            onClick={() => state.isPlaying ? queueStore.pause() : queueStore.play()}>
                            {state.isPlaying ? <Icon.Pause /> : <Icon.Play />}
                        </button>

                        <button
                            className={cx('control-button')}
                            onClick={() => queueStore.next()}>
                            <Icon.SkipForward />
                        </button>

                        <button
                            className={cx('control-button')}
                            onClick={() => queueStore.changeRepeatMode()}>
                            {state.repeatMode === 'all' && <Icon.Repeat />}
                            {state.repeatMode === 'one' && <Icon.Infinite />}
                            {state.repeatMode === 'none' && <Icon.RightLeft />}
                        </button>
                    </div>
                </div>

                <button className={cx('back-button')} onClick={back}>
                    <Icon.ChevronLeft />
                </button>
            </div>
        </div>
    );
}
