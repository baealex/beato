import { prompt } from '@baejino/ui'
import { useStore } from 'badland-react'
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { MusicItem, SecondaryButton, StickyHeader, MusicActionPanelContent } from '~/components'
import * as Icon from '~/icon'

import { panel } from '~/modules/panel'

import { musicStore } from '~/store/music'
import { queueStore } from '~/store/queue'

const RENDER_LIMIT = 200

export default function Music() {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()

    const [{ musics }] = useStore(musicStore)
    const [renderLimit, setRenderLimit] = useState(Number(searchParams.get('l')) || RENDER_LIMIT)

    const handleSearch = async () => {
        const query = await prompt('Search keyword', searchParams.get('q') || '')
        searchParams.set('q', query)
        setSearchParams(searchParams, { replace: true })
    }

    const handleReadMore = () => {
        setRenderLimit(renderLimit + RENDER_LIMIT)
        searchParams.set('l', (renderLimit + RENDER_LIMIT).toString())
        setSearchParams(searchParams, { replace: true })
    }

    const filteredMusics = musics
        ?.filter(music =>
            music.name.toLowerCase().includes(searchParams.get('q')?.toLowerCase() || '') ||
            music.artist.name.toLowerCase().includes(searchParams.get('q')?.toLowerCase() || '') ||
            music.album.name.toLowerCase().includes(searchParams.get('q')?.toLowerCase() || '')
        )

    return (
        <>
            <StickyHeader>
                <SecondaryButton style={{ width: '160px' }} onClick={handleSearch}>
                    {searchParams.get('q') || 'Search'}
                </SecondaryButton>
                <SecondaryButton onClick={() => queueStore.reset(filteredMusics.map(music => music.id))}>
                    <Icon.Play /> Play
                </SecondaryButton>
            </StickyHeader>
            {filteredMusics.slice(0, renderLimit).map(music => (
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
            {filteredMusics.length > renderLimit && (
                <div style={{ padding: '0 16px 16px' }}>
                    <SecondaryButton style={{ width: '100%', justifyContent: 'center' }} onClick={handleReadMore}>
                        Load More
                    </SecondaryButton>
                </div>
            )}
        </>
    )
}
