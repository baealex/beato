import styled from '@emotion/styled'
import { useStore } from 'badland-react'
import { HTMLMotionProps, motion } from 'framer-motion'

import { MusicItem } from '~/components'
import { CheckBox, Cross } from '~/icon'

import { musicStore } from '~/store/music'
import { queueStore } from '~/store/queue'

const Container = styled.div<HTMLMotionProps<'div'>>`
    display: flex;
    flex-direction: column;
    height: 100%;

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 60px;
        padding: 0 1rem;
        border-bottom: 1px solid #333;

        .actions {
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        button {
            width: auto;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            color: #eee;
            font-size: 0.8rem;

            .link {
                width: 0;
                height: 0;
                border-top: 0.3rem solid transparent;
                border-bottom: 0.3rem solid transparent;
                border-left: 0.3rem solid currentColor;
                transform: rotate(90deg);
            }

            &.active {
                color: $PRIMARY_COLOR;
            }

            svg {
                width: 1rem;
                height: 1rem;
            }
        }
    }

    .action {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.5rem;

        .buttons {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .button {
            border: none;
            background: none;
            color: #a076f1;
            font-size: 1rem;
            font-weight: 600;
            padding: 0.5rem;
            border-radius: 0.5rem;
        }
    }

    .select-actions {
        position: sticky;
        bottom: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.5rem 0;
        background-color: $PRIMARY_COLOR;

        button {
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
            font-size: 0.75rem;
            font-weight: bold;
            gap: 0.25rem;

            svg {
                width: 1.25rem;
                height: 1.25rem;
            }
        }
    }

    ul {
        margin: 0;
        padding: 0;
        width: 100%;
        list-style: none;

        li {
            position: relative;
            display: flex;
            align-items: center;

            .checkbox {
                margin-left: 1rem;
            }

            @keyframes breathing {
                0% {
                    opacity: 0.15;
                }
                50% {
                    opacity: 0.25;
                }
                100% {
                    opacity: 0.15;
                }
            }

            &.active {
                &::before {
                    content: "";
                    position: absolute;
                    left: 0;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    background-color: #735af2;
                    animation: breathing 3s ease infinite;
                    z-index: -1;
                    pointer-events: none;
                }
            }
        }
    }
`

export default function Queue() {
    const [{ items, selected }] = useStore(queueStore)
    const [{ musicMap }] = useStore(musicStore)

    return (
        <Container
            as={motion.div}
            animate="in"
            exit="out"
            initial="out"
            variants={{
                in: {
                    opacity: 1,
                    y: 0,
                },
                out: {
                    opacity: 0,
                    y: 50,
                },
            }}
            transition={{
                duration: 0.25,
            }}
        >
            <div className="header">
                <div className="actions">
                    <button className="clickable" onClick={() => { }}>
                        <CheckBox /> {items.length} musics
                    </button>
                </div>
                <button className="clickable title">
                    Queue Title <span className="link" />
                </button>
            </div>
            <ul className="container">
                {items?.map((id, idx) => {
                    const music = musicMap.get(id)

                    if (!music) return null

                    return (
                        <li className={idx === selected ? 'active' : ''}>
                            <MusicItem
                                key={music.id}
                                musicName={music?.name}
                                artistName={music?.artist.name}
                                albumName={music?.album.name}
                                albumCover={music?.album.cover}
                                onClick={() => queueStore.select(idx)}
                            />
                        </li>
                    )
                })}
            </ul>
            <div className="action">
                <div className="buttons">
                </div>
                <button className="icon-button" onClick={() => history.back()}>
                    <Cross />
                </button>
            </div>
        </Container >
    )
}
