import { useStore } from 'badland-react';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import {
    ItemSortPanelContent,
    Loading,
    Button,
    StickyHeader,
    SearchField
} from '~/components/shared';
import { ArtistListItem } from '~/components/artist';

import * as Icon from '~/icon';

import { panel } from '~/modules/panel';

import { artistStore } from '~/store/artist';

const RENDER_LIMIT = 150;

export default function ArtistList() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const [{ artists, loaded }] = useStore(artistStore);
    const [renderLimit, setRenderLimit] = useState(Number(searchParams.get('l')) || RENDER_LIMIT);
    const query = searchParams.get('q') || '';

    const handleReadMore = () => {
        const nextRenderLimit = renderLimit + RENDER_LIMIT;
        const nextSearchParams = new URLSearchParams(searchParams);

        setRenderLimit(nextRenderLimit);
        nextSearchParams.set('l', nextRenderLimit.toString());
        setSearchParams(nextSearchParams, { replace: true });
    };

    const handleSearchChange = (value: string) => {
        const nextSearchParams = new URLSearchParams(searchParams);

        if (value.trim()) {
            nextSearchParams.set('q', value);
        } else {
            nextSearchParams.delete('q');
        }

        setSearchParams(nextSearchParams, { replace: true });
    };

    const filteredArtists = artists
        ?.filter(artist =>
            artist.name.toLowerCase().includes(query.toLowerCase())
        );

    return (
        <>
            <StickyHeader>
                <SearchField
                    value={query}
                    placeholder="Search artists"
                    ariaLabel="Search artists"
                    onChange={handleSearchChange}
                />
                <Button
                    onClick={() => panel.open({
                        title: 'Artist Sort',
                        content: (
                            <ItemSortPanelContent items={artistStore.sortItems} />
                        )
                    })}>
                    <Icon.Sort /> Sort
                </Button>
            </StickyHeader>
            {!loaded && (
                <Loading />
            )}
            {loaded && filteredArtists.slice(0, renderLimit).map((artist) => (
                <ArtistListItem
                    key={artist.id}
                    artistName={artist.name}
                    artistCover={artist.latestAlbum?.cover || ''}
                    musicCount={artist.musicCount}
                    albumCount={artist.albumCount}
                    onClick={() => navigate(`/artist/${artist.id}`)}
                />
            ))}
            {loaded && filteredArtists.length > renderLimit && (
                <div
                    style={{ padding: '0 16px 16px' }}>
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
