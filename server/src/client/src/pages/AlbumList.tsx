import { prompt } from '@baejino/ui'
import styled from '@emotion/styled'
import { useStore } from 'badland-react'
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { AlbumItem, ItemSortPanelContent, Loading, SecondaryButton, StickyHeader } from '~/components'
import * as Icon from '~/icon'

import { panel } from '~/modules/panel'

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

const RENDER_LIMIT = 100

export default function Album() {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()

    const [{ albums, loaded }] = useStore(albumStore)
    const [renderLimit, setRenderLimit] = useState(Number(searchParams.get('l')) || RENDER_LIMIT)

    const handleSearch = async () => {
        const q = await prompt('Search keyword', searchParams.get('q') || '')
        setSearchParams({ q })
    }

    const handleReadMore = () => {
        setRenderLimit(renderLimit + RENDER_LIMIT)
        searchParams.set('l', (renderLimit + RENDER_LIMIT).toString())
        setSearchParams(searchParams, { replace: true })
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
                <SecondaryButton onClick={() => panel.open({
                    title: 'Album Sort',
                    content: (
                        <ItemSortPanelContent items={albumStore.sortItems} />
                    )
                })}>
                    <Icon.Sort /> Sort
                </SecondaryButton>
            </StickyHeader>
            {!loaded && (
                <Loading />
            )}
            <Grid>
                {loaded && filteredAlbums.slice(0, renderLimit).map((album) => (
                    <AlbumItem
                        key={album.id}
                        albumName={album.name}
                        albumCover={album.cover}
                        artistName={album.artist.name}
                        onClick={() => navigate(`/album/${album.id}`)}
                    />
                ))}
            </Grid>
            {loaded && filteredAlbums.length > renderLimit && (
                <div style={{ padding: '0 16px 16px' }}>
                    <SecondaryButton style={{ width: '100%', justifyContent: 'center' }} onClick={handleReadMore}>
                        Load More
                    </SecondaryButton>
                </div>
            )}
        </>
    )
}
