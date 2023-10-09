import styled from '@emotion/styled'
import { prompt } from '@baejino/ui'
import { useStore } from 'badland-react'
import { useNavigate } from 'react-router-dom'

import { DragEndEvent } from '@dnd-kit/core'
import { arrayMove, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { PlaylistItem, SecondaryButton, StickyHeader, VerticalSortable } from '~/components'
import { Menu } from '~/icon'

import { Playlist as PlaylistModel } from '~/models/type'

import { PlaylistListener } from '~/socket'

import { playlistStore } from '~/store/playlist'

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

function PlaylistDndItem({
    playlist,
    onClick,
}: {
    playlist: PlaylistModel
    onClick: () => void
}) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: playlist.id })
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <Item ref={setNodeRef} style={style} {...attributes}>
            <div className="icon-button" {...listeners}>
                <Menu />
            </div>
            <PlaylistItem
                key={playlist.id}
                {...playlist}
                onClick={onClick}
            />
        </Item>
    )
}


export default function Playlist() {
    const navigate = useNavigate()

    const [{ playlists }, setState] = useStore(playlistStore)

    const handleCreate = async () => {
        const name = await prompt('Enter playlist name')
        PlaylistListener.create(name)
    }

    const handleDragEnd = (e: DragEndEvent) => {
        const { active, over } = e

        if (over && active.id !== over.id) {
            const oldIndex = playlists.findIndex((playlist) => playlist.id === active.id)
            const newIndex = playlists.findIndex((playlist) => playlist.id === over.id)
            const newPlaylists = arrayMove(playlists, oldIndex, newIndex)
            PlaylistListener.changeOrder(newPlaylists.map((playlist) => playlist.id))

            setState((state) => ({
                ...state,
                playlists: newPlaylists,
            }))
        }
    }

    return (
        <>
            <StickyHeader>
                <div />
                <SecondaryButton onClick={handleCreate}>
                    New Playlist
                </SecondaryButton>
            </StickyHeader>
            <VerticalSortable items={playlists.map((playlist) => playlist.id)} onDragEnd={handleDragEnd}>
                {playlists?.map((playlist) => (
                    <PlaylistDndItem
                        key={playlist.id}
                        playlist={playlist}
                        onClick={() => navigate(`/playlist/${playlist.id}`)}
                    />
                ))}
            </VerticalSortable>
        </>
    )
}
