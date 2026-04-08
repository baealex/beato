import { useStore } from 'badland-react';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import {
    Button,
    StickyHeader,
    Loading,
    ItemSortPanelContent,
    SearchField
} from '~/components/shared';
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

    const filteredMusics = musics
        ?.filter(music =>
            !music.isHated && music.isLiked && (
                music.name.toLowerCase().includes(query.toLowerCase()) ||
                music.artist.name.toLowerCase().includes(query.toLowerCase()) ||
                music.album.name.toLowerCase().includes(query.toLowerCase())
            )
        );

    return (
        <>
            <StickyHeader>
                <SearchField
                    value={query}
                    placeholder="Search liked music"
                    ariaLabel="Search favorite music"
                    onChange={handleSearchChange}
                />
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
            {loaded && filteredMusics.slice(0, renderLimit).map((music) => (
                <MusicListItem
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
