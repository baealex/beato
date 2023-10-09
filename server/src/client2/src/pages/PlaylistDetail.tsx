import styled from '@emotion/styled'
import { useQuery, useQueryClient } from 'react-query'
import { useStore } from 'badland-react'
import { useParams } from 'react-router-dom'

import { CSS } from '@dnd-kit/utilities'
import { DragEndEvent } from '@dnd-kit/core'
import { arrayMove, useSortable } from '@dnd-kit/sortable'

import { MusicItem, VerticalSortable } from '~/components'
import { Menu } from '~/icon'

import { Music } from '~/models/type'

import { getPlaylist } from '~/api'
import { PlaylistListener } from '~/socket'

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
`

function PlaylistDndMusicItem({
    music,
    onClick,
    onLongPress,
}: {
    music: Music
    onClick: () => void
    onLongPress: () => void
}) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: music.id })
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <Item ref={setNodeRef} style={style} {...attributes}>
            <div className="icon-button" {...listeners}>
                <Menu />
            </div>
            <MusicItem
                albumName={music.album.name}
                albumCover={music.album.cover}
                artistName={music.artist.name}
                musicName={music.name}
                musicCodec={music.codec}
                isLiked={music.isLiked}
                onClick={onClick}
                onLongPress={onLongPress}
            />
        </Item>
    )
}

export default function PlaylistDetail() {
    const { id } = useParams<{ id: string }>()

    const queryClient = useQueryClient()

    const { data: playlist } = useQuery(['playlist', id], () => getPlaylist(id!).then(res => res.data.playlist), {
        enabled: !!id,
    })

    const [{ musicMap }] = useStore(musicStore)

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

    if (!playlist) return null

    return (
        <VerticalSortable items={playlist.musics.map(({ id }) => id)} onDragEnd={handleDragEnd}>
            {playlist.musics.map(({ id }) => {
                const music = musicMap.get(id)

                if (!music) return null

                return (
                    <PlaylistDndMusicItem
                        key={music.id}
                        music={music}
                        onClick={() => queueStore.add(music.id)}
                        onLongPress={() => { }}
                    />
                )
            })}
        </VerticalSortable>
    )
}
