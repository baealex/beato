import styled from '@emotion/styled'
import { useStore } from 'badland-react'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'

import { getArtist } from '~/api'
import { AlbumItem, Image, MusicItem, SecondaryButton } from '~/components'
import { Play } from '~/icon'
import { musicStore } from '~/store/music'

const Container = styled.section`
    .artist-name {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 1.25rem;
        font-weight: bold;
        margin: 3rem 0;

        img {
            width: 150px;
            height: 150px;
            object-fit: cover;
            border-radius: 50%;
            margin-bottom: 1rem;
        }
    }

    .section-title {
        padding: 1rem;
        font-size: 1.25rem;
        font-weight: bold;
        border-bottom: 1px solid #222;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .albums {
        padding: 1rem;
        margin-bottom: 3rem;
        display: grid;
        grid-gap: 1rem;
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));

        @media (max-width: 600px) {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }

    .musics {
        margin: 0;
        padding: 0;
        list-style: none;
    }
`

export default function ArtistDetail() {
    const navigate = useNavigate()

    const { id } = useParams<{ id: string }>()

    const { data: artist } = useQuery(['album', id], () => getArtist(id!).then(res => res.data.artist), {
        enabled: !!id,
    })

    const [{ musicMap }] = useStore(musicStore)

    if (!artist) return null

    return (
        <Container>
            <div className="artist-name">
                <Image src={artist.latestAlbum?.cover || ""} alt={artist.name} />
                {artist.name}
            </div>
            <div className="section-title">
                Albums ({artist.albums.length})
            </div>
            <div className="albums">
                {artist.albums.map(album => (
                    <AlbumItem
                        key={album.id}
                        albumCover={album.cover}
                        albumName={album.name}
                        artistName={album.publishedYear}
                        onClick={() => navigate(`/album/${album.id}`)}
                    />
                ))}
            </div>

            <div className="section-title">
                Songs ({artist.musics.length})
                <SecondaryButton>
                    <Play /> Play
                </SecondaryButton>
            </div>
            <div className="musics">
                {artist.musics.map(({ id }) => {
                    const music = musicMap.get(id)

                    if (!music) return null

                    return (
                        <MusicItem
                            key={music.id}
                            artistName={music.album.name}
                            albumCover={music.album.cover}
                            albumName={music.album.name}
                            musicName={music.name}
                            musicCodec={music.codec}
                            isLiked={music.isLiked}
                            onClick={() => { }}
                            onLongPress={() => {

                            }}
                        />
                    )
                })}
            </div>
        </Container>
    )
}
