import styled from '@emotion/styled'
import { useStore } from 'badland-react'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HTMLMotionProps, motion } from 'framer-motion'
import { theme } from '@baejino/style'
import { toast } from '@baejino/ui'

import { DragEndEvent } from '@dnd-kit/core'
import { arrayMove, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { MusicActionPanelContent, MusicItem, MusicSelector, PlaylistPanelContent, VerticalSortable } from '~/components'
import * as Icon from '~/icon'

import { panel } from '~/modules/panel'

import { Music } from '~/models/type'

import { PlaylistListener } from '~/socket'

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
                color: ${theme.COLOR_PURPLE_PROMINENT};
            }

            svg {
                width: 1rem;
                height: 1rem;
            }
        }
    }

    .footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.75rem 0.5rem;

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
        background-color: ${theme.COLOR_PURPLE_PROMINENT};

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
    }
`

const Item = styled.li`
    position: relative;
    display: flex;
    align-items: center;

    .checkbox {
        margin-left: 1rem;

        svg {
            width: 1rem;
            height: 1rem;
        }

        &.active {
            svg {
                color: #ccc;
                fill: ${theme.COLOR_PURPLE_PROMINENT};
            }
        }
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

    &.now-playing {
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
`

const QueueDndItem = ({
    music,
    isCurrentMusic,
    isSelectMode,
    isSelected,
    onSelect,
    onClick,
    onLongPress,
}: {
    music: Music
    isCurrentMusic: boolean
    isSelectMode: boolean
    isSelected: boolean
    onSelect: () => void
    onClick: () => void
    onLongPress: () => void
}) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: music.id })
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <Item ref={setNodeRef} {...attributes} style={style} className={isCurrentMusic ? 'now-playing' : ''}>
            {isSelectMode ? (
                <button
                    className={`icon-button checkbox ${isSelected ? 'active' : ''}`}
                    onClick={onSelect}
                >
                    <Icon.CheckBox />
                </button>
            ) : (
                <button
                    {...listeners}
                    className="icon-button checkbox"
                    style={{ cursor: 'grab', touchAction: 'none' }}
                >
                    <Icon.Menu />
                </button>
            )}
            <div style={{ flex: 1, maxWidth: 'calc(100% - 4rem)' }}>
                <MusicItem
                    key={music.id}
                    musicName={music.name}
                    artistName={music.artist.name}
                    albumName={music.album.name}
                    albumCover={music.album.cover}
                    isLiked={music.isLiked}
                    isHated={music.isHated}
                    onClick={isSelectMode ? onSelect : onClick}
                    onLongPress={onLongPress}
                />
            </div>
        </Item>
    )
}

export default function Queue() {
    const navigate = useNavigate()

    const [{ items, selected }, setState] = useStore(queueStore)
    const [{ musicMap }] = useStore(musicStore)

    const ref = useRef<HTMLUListElement>(null)
    const [isSelectMode, setIsSelectMode] = useState(false)
    const [selectedItems, setSelectedItems] = useState<string[]>([])

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event

        if (over) {
            if (active.id === over.id) return

            setState((prevState) => {
                const prevSelectedItem = prevState.items[prevState.selected!]

                const oldIndex = prevState.items.indexOf(active.id.toString())
                const newIndex = prevState.items.indexOf(over.id.toString())
                const newItems = arrayMove(prevState.items, oldIndex, newIndex)

                if (prevSelectedItem) {
                    return {
                        ...prevState,
                        items: newItems,
                        selected: newItems.indexOf(prevSelectedItem)
                    }
                }

                return {
                    ...prevState,
                    items: newItems
                }
            })
        }
    }

    useEffect(() => {
        setSelectedItems([])
    }, [isSelectMode])

    useEffect(() => {
        if (ref.current) {
            const targetElement = ref.current.children.item(
                selected || 0
            ) as HTMLElement

            if (!targetElement) return

            ref.current.scrollTo({
                top: targetElement.offsetTop - 60,
                behavior: 'smooth',
            })
        }
    }, [ref, selected])

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
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <MusicSelector
                        label={isSelectMode
                            ? `${selectedItems.length} selected`
                            : `${items?.length} musics`}
                        active={isSelectMode}
                        onClick={() => setIsSelectMode(!isSelectMode)}
                        onSelectAll={() => setSelectedItems(items)}
                    />
                </div>
            </div>
            <ul className="container" ref={ref}>
                <VerticalSortable items={items} onDragEnd={handleDragEnd}>
                    {items?.map((id, idx) => {
                        const music = musicMap.get(id)

                        if (!music) return null

                        return (
                            <QueueDndItem
                                key={id}
                                music={music}
                                isCurrentMusic={selected === idx}
                                isSelectMode={isSelectMode}
                                isSelected={selectedItems.includes(id)}
                                onSelect={() => {
                                    if (selectedItems.includes(id)) {
                                        setSelectedItems(selectedItems.filter(item => item !== id))
                                    } else {
                                        setSelectedItems([...selectedItems, id])
                                    }
                                }}
                                onClick={() => {
                                    queueStore.select(idx)
                                }}
                                onLongPress={() => panel.open({
                                    content: (
                                        <MusicActionPanelContent
                                            id={music.id}
                                            onAlbumClick={() => navigate(`/album/${music.album.id}`)}
                                            onArtistClick={() => navigate(`/artist/${music.artist.id}`)}
                                        />
                                    )
                                })}
                            />
                        )
                    })}
                </VerticalSortable>
            </ul>
            {isSelectMode && selectedItems.length > 0 && (
                <div className="select-actions">
                    <button className="clickable" onClick={() => panel.open({
                        title: 'Move to playlist',
                        content: (
                            <PlaylistPanelContent onClick={(id) => {
                                PlaylistListener.addMusic(id, selectedItems)
                                toast('Added to playlist')
                                setIsSelectMode(false)
                            }} />
                        )
                    })}>
                        <Icon.Data />
                        <span>Save</span>
                    </button>
                    <button className="clickable" onClick={() => {
                        queueStore.removeItems(selectedItems)
                        setIsSelectMode(false)
                    }}>
                        <Icon.TrashBin />
                        <span>Delete</span>
                    </button>
                </div>
            )}
            <div className="footer">
                <div />
                <button className="icon-button" onClick={() => history.back()}>
                    <Icon.Cross />
                </button>
            </div>
        </Container >
    )
}
