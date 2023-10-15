import { prompt } from '@baejino/ui'
import { useStore } from 'badland-react'
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { ArtistItem, Loading, Observer, SecondaryButton, StickyHeader } from '~/components'

import { artistStore } from '~/store/artist'

const RENDER_LIMIT = 150

export default function ArtistList() {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()

    const [{ artists, loaded }] = useStore(artistStore)
    const [renderLimit, setRenderLimit] = useState(Number(searchParams.get('l')) || RENDER_LIMIT)

    const handleSearch = async () => {
        const q = await prompt('Search keyword', searchParams.get('q') || '')
        setSearchParams({ q })
    }

    const filteredArtists = artists
        ?.filter(artist =>
            artist.name.toLowerCase().includes(searchParams.get('q')?.toLowerCase() || '')
        )

    return (
        <>
            <StickyHeader>
                <SecondaryButton style={{ width: '160px' }} onClick={handleSearch}>
                    {searchParams.get('q') || 'Search'}
                </SecondaryButton>
            </StickyHeader>
            {!loaded && (
                <Loading />
            )}
            {loaded && filteredArtists.slice(0, renderLimit).map((artist) => (
                <ArtistItem
                    key={artist.id}
                    artistName={artist.name}
                    artistCover={artist.latestAlbum?.cover || ''}
                    musicCount={artist.musicCount}
                    albumCount={artist.albumCount}
                    onClick={() => navigate(`/artist/${artist.id}`)}
                />
            ))}
            {loaded && filteredArtists.length > renderLimit && (
                <Observer onIntersect={() => {
                    setRenderLimit(renderLimit + RENDER_LIMIT)
                    searchParams.set('l', (renderLimit + RENDER_LIMIT).toString())
                    setSearchParams(searchParams, { replace: true })
                }} />
            )}
        </>
    )
}
