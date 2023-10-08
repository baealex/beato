import { useQuery } from 'react-query'
import { useStore } from 'badland-react'
import { useParams } from 'react-router-dom'

import { MusicItem } from '~/components'

import { getPlaylist } from '~/api'

import { musicStore } from '~/store/music'

export default function PlaylistDetail() {
    const { id } = useParams<{ id: string }>()

    const { data: playlist } = useQuery(['playlist', id], () => getPlaylist(id!).then(res => res.data.playlist), {
        enabled: !!id,
    })

    const [{ musicMap }] = useStore(musicStore)

    if (!playlist) return null

    return (
        <>
            {playlist.musics.map(({ id }) => {
                const music = musicMap.get(id)

                if (!music) return null

                return (
                    <MusicItem
                        key={music.id}
                        albumName={music.album.name}
                        albumCover={music.album.cover}
                        artistName={music.artist.name}
                        musicName={music.name}
                        musicCodec={music.codec}
                        isLiked={music.isLiked}
                        onClick={() => { }}
                        onLongPress={() => { }}
                    />
                )
            })}
        </>
    )
}
