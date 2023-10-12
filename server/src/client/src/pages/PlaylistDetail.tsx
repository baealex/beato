import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { useQuery, useQueryClient } from 'react-query'
import { useStore } from 'badland-react'
import { useParams } from 'react-router-dom'
import { theme } from '@baejino/style'

import { CSS } from '@dnd-kit/utilities'
import { DragEndEvent } from '@dnd-kit/core'
import { arrayMove, useSortable } from '@dnd-kit/sortable'

import { Image, Loading, MusicActionPanelContent, MusicItem, MusicSelector, SecondaryButton, StickyHeader, VerticalSortable } from '~/components'
import { CheckBox, Menu, Play, TrashBin } from '~/icon'

import { panel } from '~/modules/panel'

import { Music } from '~/models/type'

import { getPlaylist } from '~/api'
import {
    PLAYLIST_CHANGE_MUSIC_ORDER,
    PLAYLIST_REMOVE_MUSIC,
    PlaylistListener,
    socket
} from '~/socket'

import { musicStore } from '~/store/music'
import { queueStore } from '~/store/queue'

const Item = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    .icon-button {
        margin-left: 1rem;

        svg {
            width: 1rem;
            height: 1rem;
        }
    }

    .checkbox {
        &.active {
            svg {
                color: #ccc;
                fill: ${theme.COLOR_PURPLE_PROMINENT};
            }
        }
    }
`

const Container = styled.div`
    .header {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        background-color: #111;
        padding: 2rem 1rem;

        .image-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-template-rows: repeat(4, 1fr);
            margin-bottom: 2rem;
            background-color: #000;
            width: 100%;
            max-width: calc(4.5rem * 4);
            height: calc(4.5rem * 4);
            overflow-x: hidden;
            overflow-y: hidden;

            img {
                width: 4.5rem;
                height: 4.5rem;
                object-fit: cover;
            }
        }

        h1 {
            font-size: 1.25rem;
            font-weight: bold;
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
`


function PlaylistDndMusicItem({
    music,
    isSelectMode,
    isSelected,
    onClick,
    onSelect,
    onLongPress,
}: {
    music: Music
    isSelectMode: boolean
    isSelected: boolean
    onClick: () => void
    onSelect: () => void
    onLongPress: () => void
}) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: music.id })
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <Item ref={setNodeRef} style={style} {...attributes}>
            {isSelectMode ? (
                <button
                    className={`icon-button checkbox ${isSelected ? 'active' : ''} `}
                    onClick={onSelect}
                >
                    <CheckBox />
                </button>
            ) : (
                <div className="icon-button" {...listeners} style={{ cursor: 'grab', touchAction: 'none' }}>
                    <Menu />
                </div>
            )}
            <div style={{ flex: 1, maxWidth: 'calc(100% - 4rem)' }}>
                <MusicItem
                    albumName={music.album.name}
                    albumCover={music.album.cover}
                    artistName={music.artist.name}
                    musicName={music.name}
                    musicCodec={music.codec}
                    isLiked={music.isLiked}
                    onClick={isSelectMode ? onSelect : onClick}
                    onLongPress={onLongPress}
                />
            </div>
        </Item>
    )
}

export default function PlaylistDetail() {
    const { id } = useParams<{ id: string }>()

    const queryClient = useQueryClient()

    const { data: playlist, isLoading } = useQuery(['playlist', id], () => getPlaylist(id!).then(res => res.data.playlist), {
        enabled: !!id,
    })

    const [{ musicMap }] = useStore(musicStore)

    const [isSelectMode, setIsSelectMode] = useState(false)
    const [selectedItems, setSelectedItems] = useState<string[]>([])

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event

        if (playlist && over && active.id !== over.id) {
            const oldIndex = playlist.musics.findIndex(({ id }) => id === active.id)
            const newIndex = playlist.musics.findIndex(({ id }) => id === over.id)
            const newMusics = arrayMove(playlist.musics, oldIndex, newIndex)
            PlaylistListener.changeMusicOrder(playlist.id, newMusics.map(({ id }) => id))

            queryClient.setQueryData(['playlist', id], () => {
                return {
                    ...playlist,
                    musics: newMusics,
                }
            })
        }
    }

    useEffect(() => {
        const changeMusicOrderHandler = () => {
            queryClient.invalidateQueries(['playlist', id])
        }
        const removeMusicHandler = () => {
            queryClient.invalidateQueries(['playlist', id])
        }
        socket.on(PLAYLIST_CHANGE_MUSIC_ORDER, changeMusicOrderHandler)
        socket.on(PLAYLIST_REMOVE_MUSIC, removeMusicHandler)
        return () => {
            socket.off(PLAYLIST_CHANGE_MUSIC_ORDER, changeMusicOrderHandler)
            socket.off(PLAYLIST_REMOVE_MUSIC, removeMusicHandler)
        }
    }, [id, queryClient])

    useEffect(() => {
        setSelectedItems([])
    }, [isSelectMode])

    if (isLoading || !playlist) {
        return (
            <Loading />
        )
    }

    return (
        <Container>
            <div className="header">
                <div className="image-grid">
                    {playlist.musics.slice(0, 16).map(({ id }) => {
                        const music = musicMap.get(id)

                        if (!music) return null

                        return (
                            <Image
                                key={id}
                                src={music.album.cover || ''}
                                alt={music.album.name}
                            />
                        )
                    })}
                </div>
                <h1>{playlist.name}</h1>
            </div>
            <StickyHeader>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <MusicSelector
                        active={isSelectMode}
                        label={isSelectMode ? `${selectedItems.length} selected` : `${playlist.musics.length} musics`}
                        onClick={() => setIsSelectMode(!isSelectMode)}
                        onSelectAll={() => setSelectedItems(playlist.musics.map(({ id }) => id))}
                    />
                </div>
                <SecondaryButton onClick={() => queueStore.reset(playlist.musics.map(({ id }) => id))}>
                    <Play /> Play
                </SecondaryButton>
            </StickyHeader >
            <VerticalSortable items={playlist.musics.map(({ id }) => id)} onDragEnd={handleDragEnd}>
                {playlist.musics.map(({ id }) => {
                    const music = musicMap.get(id)

                    if (!music) return null

                    return (
                        <PlaylistDndMusicItem
                            key={music.id}
                            music={music}
                            isSelectMode={isSelectMode}
                            isSelected={selectedItems.includes(music.id)}
                            onClick={() => queueStore.add(music.id)}
                            onSelect={() => {
                                if (selectedItems.includes(music.id)) {
                                    setSelectedItems(selectedItems.filter(item => item !== music.id))
                                } else {
                                    setSelectedItems([...selectedItems, music.id])
                                }
                            }}
                            onLongPress={() => panel.open({
                                content: (
                                    <MusicActionPanelContent id={music.id} />
                                )
                            })}
                        />
                    )
                })}
            </VerticalSortable>
            {isSelectMode && selectedItems.length > 0 && (
                <div className="select-actions">
                    <button className="clickable" onClick={async () => {
                        PlaylistListener.removeMusic(playlist.id, selectedItems)
                        setIsSelectMode(false)
                    }}>
                        <TrashBin />
                        <span>Delete</span>
                    </button>
                </div>
            )}
        </Container>
    )
}
