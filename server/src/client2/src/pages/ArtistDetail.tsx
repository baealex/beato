import styled from '@emotion/styled'
import { useStore } from 'badland-react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

import { getArtist } from '~/api'
import { AlbumItem, Image, MusicItem } from '~/components'
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

        ul {
            display: grid;
            grid-gap: 1rem;
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
            padding: 0;
            list-style: none;

            @media (max-width: 600px) {
                grid-template-columns: repeat(2, minmax(0, 1fr));
            }
        }
    }

    .musics {
        ul {
            margin: 0;
            padding: 0;
            list-style: none;
        }
    }

    .play-all {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.75rem;
    }
`

export default function ArtistDetail() {
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
                <ul>
                    {artist.albums.map(album => (
                        <li>
                            <AlbumItem
                                albumCover={album.cover}
                                albumName={album.name}
                                artistName={album.publishedYear}
                                onClick={() => { }}
                            />
                        </li>
                    ))}
                </ul>
            </div>

            <div className="section-title">
                Songs ({artist.musics.length})
                <div className="play-all">
                    <button
                        className="gray-button"
                    >
                        <Play />
                        Play
                    </button>
                </div>
            </div>
            <div className="musics">
                <ul>
                    {artist.musics.map(({ id }) => {
                        const music = musicMap.get(id)

                        if (!music) return null

                        return (
                            <li>
                                <MusicItem
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
                            </li>
                        )
                    })}
                </ul>
            </div>
        </Container>
    )
}
