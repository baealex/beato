import { useAppStore as useStore } from '~/store/base-store';
import { useDeferredValue } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import {
    Button,
    FixedVirtualList,
    StickyHeader,
    StickyHeaderActions,
    ItemSortPanelContent,
    Loading,
    SearchField
} from '~/components/shared';
import { MusicListItem, MusicActionPanelContent } from '~/components/music';
import * as Icon from '~/icon';

import { panel } from '~/modules/panel';
import { useResetQueue } from '~/hooks';

import { musicStore } from '~/store/music';
import { queueStore } from '~/store/queue';

const MUSIC_LIST_ROW_HEIGHT = 80;

export default function Music() {
    const navigate = useNavigate();
    const resetQueue = useResetQueue();
    const [searchParams, setSearchParams] = useSearchParams();

    const [{ musics, loaded }] = useStore(musicStore);
    const query = searchParams.get('q') || '';
    const deferredQuery = useDeferredValue(query.trim().toLowerCase());

    const handleSearchChange = (value: string) => {
        const nextSearchParams = new URLSearchParams(searchParams);

        if (value.trim()) {
            nextSearchParams.set('q', value);
        } else {
            nextSearchParams.delete('q');
        }

        setSearchParams(nextSearchParams, { replace: true });
    };

    const filteredMusics = (musics
        ?.filter(music =>
            !music.isHated && (
                music.name.toLowerCase().includes(deferredQuery) ||
                music.artist.name.toLowerCase().includes(deferredQuery) ||
                music.album.name.toLowerCase().includes(deferredQuery)
            )
        )) ?? [];

    return (
        <>
            <StickyHeader>
                <SearchField
                    value={query}
                    placeholder="Search music, artist, album"
                    ariaLabel="Search music"
                    onChange={handleSearchChange}
                />
                <StickyHeaderActions>
                    <Button onClick={() => void resetQueue(filteredMusics.map(music => music.id))}>
                        <Icon.Play /> Play
                    </Button>
                    <Button
                        size="sm"
                        onClick={() => panel.open({
                            title: 'Music Sort',
                            content: (
                                <ItemSortPanelContent items={musicStore.sortItems} />
                            )
                        })}>
                        <Icon.Sort />
                    </Button>
                </StickyHeaderActions>
            </StickyHeader>
            {!loaded && (
                <Loading />
            )}
            {loaded && (
                <FixedVirtualList
                    items={filteredMusics}
                    rowHeight={MUSIC_LIST_ROW_HEIGHT}
                    overscanPx={MUSIC_LIST_ROW_HEIGHT * 6}
                    getKey={(music) => music.id}
                    renderItem={(music) => (
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
                    )}
                />
            )}
        </>
    );
}
