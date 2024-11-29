import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { useStore } from 'badland-react';

import { MusicActionPanelContent, MusicPlayerDiskStyle, MusicPlayerFluffyStyle, MusicPlayerPulseStyle } from '~/components/music';
import * as Icon from '~/icon';

import { useBack } from '~/hooks';

import { panel } from '~/modules/panel';
import { getImage } from '~/modules/image';
import { makePlayTime } from '~/modules/time';

import { musicStore } from '~/store/music';
import { queueStore } from '~/store/queue';
import { themeStore } from '~/store/theme';

const Container = styled.div`
    height: 100%;
    display: flex;
    padding: 3rem 1rem;
    position: relative;
    overflow-y: auto;
    
    .between {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        min-height: 100%;
        height: fit-content;
    }

    .content {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .footer {
        position: fixed;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        padding-bottom: 0.5rem;

        svg {
            opacity: 0.7;
            transform: rotate(-90deg) translate(50%, -50%);
        }
    }

    .play,
    .mode,
    .queue,
    .shuffle,
    .skip-back,
    .skip-forward {
        position: relative;
        width: 3rem;
        height: 3rem;
        border-radius: .25rem;
        background-color: transparent;
        border: none;
        cursor: pointer;
        font-weight: bold;
        text-transform: uppercase;
        transition: background-color 0.25s ease-in-out;

        svg {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 1rem;
            height: 1rem;
        }
    }

    .skip-back,
    .skip-forward {
        svg {
            transform: translate(-70%, -50%);
        }

        &::after {
            content: "";
            position: absolute;
            display: block;
            top: 50%;
            right: calc(50% - .5rem);
            transform: translate(-50%, -50%);
            width: .1rem;
            height: .75rem;
            background-color: var(--b-color-text);
        }
    }

    .skip-back {
        transform: scaleX(-1);
    }

    .album-art {
        position: relative;
        max-width: 100%;
        width: 300px;
        height: 300px;

        @media (max-width: 332px) {
            height: calc(100vw - 2rem);
        }
    }

    .title-info {
        margin-top: 3rem;
        width: 500px;
        max-width: 100%;
        text-align: center;

        .title {
            .name {
                margin-bottom: .5rem;
                font-weight: bold;
            }

            .artist {
                font-size: .875rem;
                opacity: 0.6;
            }
        }
    }

    .time-info {
        margin-top: 3rem;
        display: flex;
        justify-content: space-between;
        width: 500px;
        max-width: 90%;
        margin-bottom: .5rem;
    }

    .progress {
        width: 500px;
        max-width: 90%;
        height: 20px;
        background-color: var(--b-color-background-layer-1);
        border-radius: 5px;
        overflow: hidden;

        .bar {
            width: 100%;
            height: 100%;
            transform: translateX(-100%);
            background-color: var(--b-color-point);
            animation: progress 3s infinite ease-in-out;
        }
    }

    .action {
        margin-top: 2rem;
        width: 500px;
        max-width: 90%;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: space-between;

        .playback {
            display: flex;
            justify-content: space-between;
        }

        .shuffle.active {
            svg {
                color: var(--b-color-point);
            }
        }

        @media (max-width: 400px) {
            .playback {
                width: 100%;
                order: -1;
                margin-bottom: 1rem;
            }
        }

        button {
            width: 4rem;
            height: 4rem;
            border-radius: 50%;
            background-color: transparent;
            border: none;
            cursor: pointer;
            transition: background-color 0.25s ease-in-out;
        }
    }
`;

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

    return (
        <Container>
            <div className="between">
                <div className="content">
                    <div className="album-art">
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
                        {playerAlbumArtStyle === 'visualizer' && (
                            <MusicPlayerPulseStyle
                                isPlaying={state.isPlaying}
                                src={getImage(currentMusic?.album.cover)}
                                alt={currentMusic?.album.name || ''}
                            />
                        )}
                    </div>
                    <div className="title-info">
                        <button
                            className="clickable title"
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
                            <div className="name">
                                {currentMusic?.name}
                            </div>
                            <div className="artist">
                                {currentMusic?.artist.name}
                            </div>
                        </button>
                    </div>
                    <div className="time-info">
                        <div className="current-time">
                            {makePlayTime(state.currentTime)}
                        </div>
                        <div className="total-time">
                            {makePlayTime(currentMusic?.duration || 0)}
                        </div>
                    </div>
                    <div
                        className="progress"
                        role="slider"
                        tabIndex={0}
                        aria-valuenow={state.progress}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        onClick={handleClickProgress}
                        onMouseMove={handleMoveProgress}
                        onTouchMove={handleMoveProgress}>
                        <div
                            className="bar"
                            style={{ transform: `translate(-${(100 - state.progress)}%, 0)` }}
                        />
                    </div>
                    <div className="action">
                        <button className="icon-button mode" onClick={() => queueStore.changeRepeatMode()}>
                            {state.repeatMode === 'all' && <Icon.Repeat />}
                            {state.repeatMode === 'one' && <Icon.Infinite />}
                            {state.repeatMode === 'none' && <Icon.RightLeft />}
                        </button>
                        <div className="playback">
                            <button
                                className="icon-button skip-back"
                                onClick={() => queueStore.prev()}>
                                <Icon.Play />
                            </button>
                            <button
                                className="icon-button"
                                onClick={() => state.isPlaying ? queueStore.pause() : queueStore.play()}>
                                {state.isPlaying ? <Icon.Pause /> : <Icon.Play />}
                            </button>
                            <button
                                className="icon-button skip-forward"
                                onClick={() => queueStore.next()}>
                                <Icon.Play />
                            </button>
                        </div>
                        <button
                            className={`icon-button shuffle ${state.shuffle ? 'active' : ''}`}
                            onClick={() => queueStore.toggleShuffle()}>
                            <Icon.Shuffle />
                        </button>
                    </div>
                </div>
                <div className="footer">
                    <button className="icon-button" onClick={back}>
                        <Icon.Left />
                    </button>
                </div>
            </div>
        </Container>
    );
}
