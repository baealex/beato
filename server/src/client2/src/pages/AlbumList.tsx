import { prompt } from '@baejino/ui'
import styled from '@emotion/styled'
import { useStore } from 'badland-react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { AlbumItem, SecondaryButton, StickyHeader } from '~/components'

import { albumStore } from '~/store/album'

const Grid = styled.div`
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    padding: 1rem;
    list-style: none;

    @media (max-width: 600px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
`

export default function Album() {
    const navigate = useNavigate()

    const [{ albums }] = useStore(albumStore)

    const [searchParams, setSearchParams] = useSearchParams()

    const handleSearch = async () => {
        const q = await prompt('Search keyword', searchParams.get('q') || '')
        setSearchParams({ q })
    }

    const filteredAlbums = albums
        ?.filter(album =>
            album.name.toLowerCase().includes(searchParams.get('q')?.toLowerCase() || '') ||
            album.artist.name.toLowerCase().includes(searchParams.get('q')?.toLowerCase() || '')
        )

    return (
        <>
            <StickyHeader>
                <SecondaryButton style={{ width: '160px' }} onClick={handleSearch}>
                    {searchParams.get('q') || 'Search'}
                </SecondaryButton>
            </StickyHeader>
            <Grid>
                {filteredAlbums.map((album) => (
                    <AlbumItem
                        key={album.id}
                        albumName={album.name}
                        albumCover={album.cover}
                        artistName={album.artist.name}
                        onClick={() => navigate(`/album/${album.id}`)}
                    />
                ))}
            </Grid>
        </>
    )
}
