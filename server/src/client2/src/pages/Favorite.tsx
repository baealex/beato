import { useStore } from 'badland-react'

import MusicItem from '~/components/MusicItem'

import { musicStore } from '~/store/music'
import { queueStore } from '~/store/queue'

export default function Music() {
    const [{ musics }] = useStore(musicStore)

    return (
        <>
            {musics?.filter(music => music.isLiked).map((music) => (
                <MusicItem
                    key={music.id}
                    albumName={music.album.name}
                    albumCover={music.album.cover}
                    artistName={music.artist.name}
                    musicName={music.name}
                    musicCodec={music.codec}
                    isLiked={music.isLiked}
                    onClick={() => queueStore.add(music.id)}
                    onLongPress={() => { }}
                />
            ))}
        </>
    )
}
