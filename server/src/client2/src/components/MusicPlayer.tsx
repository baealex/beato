import styled from '@emotion/styled'
import { Menu, Play, Repeat, Shuffle } from '~/icon'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #111;
    transition: transform 0.25s ease-in-out;

    .play,
    .mode,
    .queue,
    .shuffle,
    .skip-back,
    .skip-forward {
        position: relative;
        width: 3rem;
        height: 3rem;
        border-radius: 0.25rem;
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

    .play,
    .queue {
        svg {
            width: 1.5rem;
            height: 1.5rem;
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
            right: calc(50% - 0.5rem);
            transform: translate(-50%, -50%);
            width: 0.1rem;
            height: 0.75rem;
            background-color: #fff;
        }
    }

    .skip-back {
        transform: scaleX(-1);
    }

    .progress {
        width: 100%;
        height: 0.25rem;
        background-color: rgba(255, 255, 255, 0.1);
        transition: height 0.25s ease-in-out;

        @media (min-width: 1024px) {
            &:hover {
                cursor: pointer;
                height: 0.5rem;
            }
        }

        .bar {
            height: 100%;
            width: 100%;
            transform: translate(-100%, 0);
            background-color: #a076f1;
        }
    }

    .player {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem;

        .music {
            cursor: pointer;
            flex: 1 1 auto;
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 0.5rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .info {
            width: calc(100% - 45px - 0.5rem);

            .title {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }

        .action {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 0.25rem;

            .mode,
            .shuffle,
            .volume,
            .skip-back {
                @media (max-width: 768px) {
                    display: none;
                }
            }

            .shuffle.active {
                color: #a076f1;
            }

            .volume {
                -webkit-appearance: none;
                appearance: none;
                width: 100px;
                height: 0.25rem;
                background-color: rgba(255, 255, 255, 0.1);
                border-radius: 0.25rem;
                outline: none;
                transition: background-color 0.25s ease-in-out;

                &::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 0.75rem;
                    height: 0.75rem;
                    background-color: #a076f1;
                    border-radius: 50%;
                    cursor: pointer;
                }

                @media (min-width: 1024px) {
                    &:hover {
                        background-color: rgba(255, 255, 255, 0.2);
                    }
                }
            }
        }
    }
`

export default function MusicPlayer() {
    return (
        <Container>
            <div className="progress">
                <div className="bar"></div>
            </div>
            <div className="player">
                <div className="music">
                    <div className="info">
                        <div className="title">Title</div>
                        <div className="artist">Artist</div>
                    </div>
                </div>
                <div className="action">
                    <div className="mode">
                        <Repeat />
                    </div>
                    <div className="skip-back">
                        <Play />
                    </div>
                    <div className="play">
                        <Play />
                    </div>
                    <div className="skip-forward">
                        <Play />
                    </div>
                    <div className="shuffle">
                        <Shuffle />
                    </div>
                    <input className="volume" type="range" min="0" max="100" />
                    <div className="queue">
                        <Menu />
                    </div>
                </div>
            </div>
        </Container >
    )
}