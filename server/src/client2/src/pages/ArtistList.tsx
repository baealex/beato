import { prompt } from '@baejino/ui'
import { useStore } from 'badland-react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { ArtistItem, SecondaryButton, StickyHeader } from '~/components'

import { artistStore } from '~/store/artist'

export default function ArtistList() {
    const navigate = useNavigate()

    const [{ artists }] = useStore(artistStore)

    const [searchParams, setSearchParams] = useSearchParams()

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
            {filteredArtists.map((artist) => (
                <ArtistItem
                    key={artist.id}
                    artistName={artist.name}
                    artistCover={artist.latestAlbum?.cover || ''}
                    musicCount={artist.musicCount}
                    albumCount={artist.albumCount}
                    onClick={() => navigate(`/artist/${artist.id}`)}
                />
            ))}
        </>
    )
}
