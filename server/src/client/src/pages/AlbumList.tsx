import { useStore } from 'badland-react';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import {
    Grid,
    ItemSortPanelContent,
    Loading,
    Button,
    StickyHeader,
    SearchField
} from '~/components/shared';
import { AlbumListItem } from '~/components/album';
import * as Icon from '~/icon';

import { panel } from '~/modules/panel';

import { albumStore } from '~/store/album';

const RENDER_LIMIT = 100;

export default function Album() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const [{ albums, loaded }] = useStore(albumStore);
    const [renderLimit, setRenderLimit] = useState(Number(searchParams.get('l')) || RENDER_LIMIT);
    const query = searchParams.get('q') || '';

    const handleSearchChange = (value: string) => {
        const nextSearchParams = new URLSearchParams(searchParams);

        if (value.trim()) {
            nextSearchParams.set('q', value);
        } else {
            nextSearchParams.delete('q');
        }

        setSearchParams(nextSearchParams, { replace: true });
    };

    const handleReadMore = () => {
        const nextRenderLimit = renderLimit + RENDER_LIMIT;
        const nextSearchParams = new URLSearchParams(searchParams);

        setRenderLimit(nextRenderLimit);
        nextSearchParams.set('l', nextRenderLimit.toString());
        setSearchParams(nextSearchParams, { replace: true });
    };

    const filteredAlbums = albums
        ?.filter(album =>
            album.name.toLowerCase().includes(query.toLowerCase()) ||
            album.artist.name.toLowerCase().includes(query.toLowerCase())
        );

    return (
        <>
            <StickyHeader>
                <SearchField
                    value={query}
                    placeholder="Search albums or artists"
                    ariaLabel="Search albums"
                    onChange={handleSearchChange}
                />
                <Button
                    onClick={() => panel.open({
                        title: 'Album Sort',
                        content: (
                            <ItemSortPanelContent items={albumStore.sortItems} />
                        )
                    })}>
                    <Icon.Sort /> Sort
                </Button>
            </StickyHeader>
            {!loaded && (
                <Loading />
            )}
            <Grid>
                {loaded && filteredAlbums.slice(0, renderLimit).map((album) => (
                    <AlbumListItem
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
                    <Button
                        style={{
                            width: '100%',
                            justifyContent: 'center'
                        }}
                        onClick={handleReadMore}>
                        Load More
                    </Button>
                </div>
            )}
        </>
    );
}
