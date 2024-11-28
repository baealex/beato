import { prompt } from '@baejino/ui';
import { useStore } from 'badland-react';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Button, StickyHeader, ItemSortPanelContent, Loading } from '~/components/shared';
import { MusicListItem, MusicActionPanelContent } from '~/components/music';
import * as Icon from '~/icon';

import { panel } from '~/modules/panel';

import { musicStore } from '~/store/music';
import { queueStore } from '~/store/queue';

const RENDER_LIMIT = 200;

export default function Music() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const [{ musics, loaded }] = useStore(musicStore);
    const [renderLimit, setRenderLimit] = useState(Number(searchParams.get('l')) || RENDER_LIMIT);

    const handleSearch = async () => {
        const query = await prompt('Search keyword', searchParams.get('q') || '');
        searchParams.set('q', query);
        setSearchParams(searchParams, { replace: true });
    };

    const handleReadMore = () => {
        setRenderLimit(renderLimit + RENDER_LIMIT);
        searchParams.set('l', (renderLimit + RENDER_LIMIT).toString());
        setSearchParams(searchParams, { replace: true });
    };

    const filteredMusics = musics
        ?.filter(music =>
            !music.isHated && (
                music.name.toLowerCase().includes(searchParams.get('q')?.toLowerCase() || '') ||
                music.artist.name.toLowerCase().includes(searchParams.get('q')?.toLowerCase() || '') ||
                music.album.name.toLowerCase().includes(searchParams.get('q')?.toLowerCase() || '')
            )
        );

    return (
        <>
            <StickyHeader>
                <Button
                    style={{ width: '160px' }}
                    onClick={handleSearch}>
                    {searchParams.get('q') || 'Search'}
                </Button>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '8px'
                    }}>
                    <Button onClick={() => queueStore.reset(filteredMusics.map(music => music.id))}>
                        <Icon.Play /> Play
                    </Button>
                    <Button
                        onClick={() => panel.open({
                            title: 'Music Sort',
                            content: (
                                <ItemSortPanelContent items={musicStore.sortItems} />
                            )
                        })}>
                        <Icon.Sort /> Sort
                    </Button>
                </div>
            </StickyHeader>
            {!loaded && (
                <Loading />
            )}
            {loaded && filteredMusics.slice(0, renderLimit).map(music => (
                <MusicListItem
                    key={music.id}
                    albumName={music.album.name}
                    albumCover={music.album.cover}
                    artistName={music.artist.name}
                    musicName={music.name}
                    musicCodec={music.codec}
                    isLiked={music.isLiked}
                    isHated={music.isHated}
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
