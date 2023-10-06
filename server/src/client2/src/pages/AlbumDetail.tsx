import { Music } from '~/models/type'
import { useQuery } from 'react-query'
import { getMusics } from '~/api'
import MusicItem from '~/components/MusicItem'

export default function AlbumDetail() {
    const { data: musics } = useQuery('musics', async () => {
        return (await getMusics()).data.allMusics
    });

    return (
        <>
            {musics?.map((music: Music) => (
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
