import styled from '@emotion/styled'
import { theme } from '@baejino/style'
import { useStore } from 'badland-react'
import { HTMLMotionProps, motion } from 'framer-motion'

import { DndContext, DragEndEvent, KeyboardSensor, PointerSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, arrayMove, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { restrictToFirstScrollableAncestor, restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { CSS } from '@dnd-kit/utilities'

import { MusicItem } from '~/components'
import { CheckBox, Cross, Menu } from '~/icon'

import { musicStore } from '~/store/music'
import { queueStore } from '~/store/queue'
import MusicSelector from '~/components/MusicSelector'
import { useState } from 'react'
import { Music } from '~/models/type'

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
`

const QueueItem = ({
    id,
    music,
    isCurrentMusic,
    isSelectMode,
    isSelected,
    onSelect,
    onClick,
}: {
    id: string
    music: Music
    isCurrentMusic: boolean
    isSelectMode: boolean
    isSelected: boolean
    onSelect: () => void
    onClick: () => void
}) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <Item ref={setNodeRef} {...attributes} style={style} className={isCurrentMusic ? 'active' : ''}>
            {isSelectMode ? (
                <button
                    className={`icon-button checkbox ${isSelected ? 'active' : ''}`}
                    onClick={onSelect}
                >
                    <CheckBox />
                </button>
            ) : (
                <button
                    {...listeners}
                    className="icon-button checkbox"
                    style={{
                        cursor: 'grab',
                        touchAction: 'none'
                    }}
                >
                    <Menu />
                </button>
            )}
            <MusicItem
                key={music.id}
                musicName={music?.name}
                artistName={music?.artist.name}
                albumName={music?.album.name}
                albumCover={music?.album.cover}
                onClick={onClick}
            />
        </Item>
    )
}

export default function Queue() {
    const [{ items, selected }, setState] = useStore(queueStore)
    const [{ musicMap }] = useStore(musicStore)

    const [isSelectMode, setIsSelectMode] = useState(false)
    const [selectedItems, setSelectedItems] = useState<string[]>([])

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    )

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
                    <MusicSelector
                        label={isSelectMode
                            ? `${selectedItems.length} musics`
                            : `${items?.length} musics`}
                        active={isSelectMode}
                        onClick={() => setIsSelectMode(!isSelectMode)}
                        onSelectAll={() => setSelectedItems(items)}
                    />
                </div>
                <button className="clickable title">
                    Queue Title <span className="link" />
                </button>
            </div>
            <ul className="container">
                <DndContext
                    sensors={sensors}
                    modifiers={[
                        restrictToVerticalAxis,
                        restrictToFirstScrollableAncestor,
                    ]}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}>
                    <SortableContext items={items} strategy={verticalListSortingStrategy}>
                        {items?.map((id, idx) => {
                            const music = musicMap.get(id)

                            if (!music) return null

                            return (
                                <QueueItem
                                    key={id}
                                    id={id}
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
                                        if (isSelectMode) {
                                            if (selectedItems.includes(id)) {
                                                setSelectedItems(selectedItems.filter(item => item !== id))
                                            } else {
                                                setSelectedItems([...selectedItems, id])
                                            }
                                        } else {
                                            queueStore.select(idx)
                                        }
                                    }}
                                />
                            )
                        })}
                    </SortableContext>
                </DndContext>
            </ul>
            <div className="footer">
                <div className="buttons">
                </div>
                <button className="icon-button" onClick={() => history.back()}>
                    <Cross />
                </button>
            </div>
        </Container >
    )
}
