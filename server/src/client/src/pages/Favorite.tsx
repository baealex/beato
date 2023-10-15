import { prompt } from '@baejino/ui'
import { useStore } from 'badland-react'
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { MusicItem, MusicActionPanelContent, SecondaryButton, StickyHeader, Loading, Observer } from '~/components'
import { Play } from '~/icon'

import { panel } from '~/modules/panel'

import { musicStore } from '~/store/music'
import { queueStore } from '~/store/queue'

const RENDER_LIMIT = 200

export default function Music() {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()

    const [{ musics, loaded }] = useStore(musicStore)
    const [renderLimit, setRenderLimit] = useState(Number(searchParams.get('l')) || RENDER_LIMIT)

    const handleSearch = async () => {
        const q = await prompt('Search keyword', searchParams.get('q') || '')
        setSearchParams({ q })
    }

    const filteredMusics = musics
        ?.filter(music =>
            music.isLiked && (
                music.name.toLowerCase().includes(searchParams.get('q')?.toLowerCase() || '') ||
                music.artist.name.toLowerCase().includes(searchParams.get('q')?.toLowerCase() || '') ||
                music.album.name.toLowerCase().includes(searchParams.get('q')?.toLowerCase() || '')
            )
        )

    return (
        <>
            <StickyHeader>
                <SecondaryButton style={{ width: '160px' }} onClick={handleSearch}>
                    {searchParams.get('q') || 'Search'}
                </SecondaryButton>
                <SecondaryButton onClick={() => queueStore.reset(filteredMusics.map(music => music.id))}>
                    <Play /> Play
                </SecondaryButton>
            </StickyHeader>
            {!loaded && (
                <Loading />
            )}
            {loaded && filteredMusics.slice(0, renderLimit).map((music) => (
                <MusicItem
                    key={music.id}
                    albumName={music.album.name}
                    albumCover={music.album.cover}
                    artistName={music.artist.name}
                    musicName={music.name}
                    musicCodec={music.codec}
                    isLiked={music.isLiked}
                    onClick={() => queueStore.add(music.id)}
                    onLongPress={() => panel.open({
                        title: 'Related to this music',
                        content: (
                            <MusicActionPanelContent
                                id={music.id}
                                onAlbumClick={() => navigate(`/album/${music.album.id}`)}
                                onArtistClick={() => navigate(`/artist/${music.artist.id}`)}
                            />
                        )
                    })}
                />
            ))}
            {loaded && filteredMusics.length > renderLimit && (
                <Observer onIntersect={() => {
                    setRenderLimit(renderLimit + RENDER_LIMIT)
                    searchParams.set('l', (renderLimit + RENDER_LIMIT).toString())
                    setSearchParams(searchParams, { replace: true })
                }} />
            )}
        </>
    )
}
