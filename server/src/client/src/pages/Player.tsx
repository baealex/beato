import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { useStore } from 'badland-react';
import type { HTMLMotionProps } from 'framer-motion';
import { motion } from 'framer-motion';

import { MusicActionPanelContent } from '~/components/music';
import * as Icon from '~/icon';

import { panel } from '~/modules/panel';
import { getImage } from '~/modules/image';
import { makePlayTime } from '~/modules/time';

import { musicStore } from '~/store/music';
import { queueStore } from '~/store/queue';
import { Image } from '~/components/shared';

const Container = styled.div<HTMLMotionProps<'div'>>`
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
            color: #888;
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
        color: white;
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
            background-color: #fff;
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

        &.cd-shape {
            box-shadow: 0 0 0 8px rgba(255, 255, 255, 0.18);
            border-radius: 50%;

            &::before,
            &::after {
                content: "";
                position: absolute;
                z-index: 1;
                top: 50%;
                left: 50%;
                border-radius: 50%;
                transform: translate(-50%, -50%);
                width: 48px;
                height: 48px;
                background-color: rgba(255, 255, 255, 0.18);
            }

            &::after {
                width: 32px;
                height: 32px;
                background-color: #000000;
            }
        }

        .foreground-wrapper {
            overflow: hidden;
            aspect-ratio: 1/1;
        }

        .foreground {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 50%;
            transition: border-radius 1s
                cubic-bezier(0.175, 0.885, 0.32, 1.275);

            @keyframes rotate {
                0% {
                    transform: rotate(0deg);
                }
                100% {
                    transform: rotate(360deg);
                }
            }

            &.rotate {
                animation: rotate 3s linear infinite;
                animation-play-state: paused;
            }

            &.rotate.playing {
                animation-play-state: running;
            }
        }

        .background {
            position: absolute;
            top: 48px;
            left: 0;
            width: 100%;
            height: 100%;
            transform: scale(0.88);
            object-fit: cover;
            border-radius: 50%;
            opacity: 0.5;
            z-index: -1;
            filter: blur(48px);
            transition: border-radius 1s
                cubic-bezier(0.175, 0.885, 0.32, 1.275);
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
                color: #888;
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
        background-color: #333;
        border-radius: 5px;
        overflow: hidden;

        .bar {
            width: 100%;
            height: 100%;
            transform: translateX(-100%);
            background-color: #a076f1;
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
                color: #a076f1;
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

            @media (min-width: 1024px) {
                &:hover {
                    background-color: rgba(255, 255, 255, 0.2);
                }
            }
        }
    }
`;

export default function PlayerDetail() {
    const navigate = useNavigate();

    const [state] = useStore(queueStore);
    const [{ musicMap }] = useStore(musicStore);

    const [borderRadius, setBorderRadius] = useState('50%');

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

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout> | null = null;

        if (!state.isPlaying) {
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
    }, [state.isPlaying]);

    return (
        <Container
            as={motion.div}
            animate="in"
            exit="out"
            initial="out"
            variants={{
                in: {
                    opacity: 1,
                    y: 0
                },
                out: {
                    opacity: 0,
                    y: 50
                }
            }}
            transition={{ duration: 0.25 }}>
            <div className="between">
                <div className="content">
                    <div className="album-art">
                        <img
                            className="background"
                            style={{ borderRadius }}
                            src={getImage(currentMusic?.album.cover)}
                            alt={currentMusic?.album.name}
                        />
                        <div className="foreground-wrapper">
                            <Image
                                className="foreground"
                                style={{ borderRadius }}
                                src={getImage(
                                    currentMusic?.album.cover.replace('/resized', '')
                                )}
                                alt={currentMusic?.album.name}
                            />
                        </div>
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
                    <button className="icon-button" onClick={() => history.back()}>
                        <Icon.Left />
                    </button>
                </div>
            </div>
        </Container>
    );
}
