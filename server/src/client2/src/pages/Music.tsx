import { useQuery } from 'react-query'

import MusicItem from '~/components/MusicItem'

import { getMusics } from '~/api'

export default function Music() {
    const { data: musics } = useQuery('musics', async () => {
        return (await getMusics()).data.allMusics
    });

    return (
        <>
            {musics?.map((music) => (
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
            ))}
        </>
    )
}
