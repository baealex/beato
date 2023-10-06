import styled from '@emotion/styled'
import { useStore } from 'badland-react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

import { MusicItem } from '~/components'

import { getAlbum } from '~/api'

import { musicStore } from '~/store/music'

const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 2rem 1rem;
    background-color: #111;
    border-radius: 0.5rem;

    .album-cover {
        width: 100%;
        max-width: 300px;
        border-radius: 0.5rem;
        margin-bottom: 1rem;
    }

    .album-title {
        max-width: 450px;
        text-align: center;
        font-size: 1.25rem;
        font-weight: bold;
    }

    .row {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .album-artist {
        font-size: 0.875rem;
        color: #aaa;
    }

    .album-year {
        font-size: 0.875rem;
        color: #555;
    }

    .play-all {
        position: absolute;
        bottom: 0;
        right: 0.5rem;
        transform: translateY(50%);

        button {
            border-radius: 100%;
            width: 4rem;
            height: 4rem;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #1c1c1c;
            border: 4px solid #000;
            color: #ccc;
            transition: background-color 0.2s;

            svg {
                width: 1.5rem;
                height: 1.5rem;
            }

            @media (min-width: 1024px) {
                &:hover {
                    background-color: #2a2a2a;
                }
            }
        }
    }
`

const List = styled.ul`
    margin-top: 2rem;
    padding: 0;
    list-style: none;
`

export default function AlbumDetail() {
    const { id } = useParams<{ id: string }>()

    const { data: album } = useQuery(['album', id], () => getAlbum(id!).then(res => res.data.album), {
        enabled: !!id,
    })

    const [{ musicMap }] = useStore(musicStore)

    return (
        <>
            <Container>
                <img className="album-cover" src={album?.cover} alt={album?.name} />
                <div className="album-title">{album?.name}</div>
                <div className="row">
                    <span className="album-artist">{album?.artist.name}</span>
                    -
                    <span className="album-year">{album?.publishedYear}</span>
                </div>
                <div className="play-all">
                    <button>
                        <svg viewBox="0 0 24 24">
                            <path d="M3 22v-20l18 10-18 10z" />
                        </svg>
                    </button>
                </div>
            </Container>

            <List>
                {album?.musics.map(({ id }) => {
                    const music = musicMap.get(id)

                    if (!music) {
                        return null
                    }

                    return (
                        <MusicItem
                            key={music.id}
                            albumName={music.album.name}
                            artistName={music.artist.name}
                            trackNumber={music.trackNumber}
                            musicName={music.name}
                            musicCodec={music.codec}
                            isLiked={music.isLiked}
                            onClick={() => { }}
                            onLongPress={() => { }}
                        />
                    )
                })}
            </List>
        </>
    )
}
