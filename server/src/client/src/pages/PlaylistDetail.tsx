import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useQuery, useQueryClient } from 'react-query';
import { useStore } from 'badland-react';
import { useNavigate, useParams } from 'react-router-dom';
import { theme } from '@baejino/style';
import { toast } from '@baejino/ui';

import type { DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

import {
    ActionBar,
    Button,
    SortableItem,
    StickyHeader,
    VerticalSortable
} from '~/components/shared';
import { MusicActionPanelContent, MusicListItem, MusicSelector } from '~/components/music';
import { PlaylistPanelContent, PlaylistSummary } from '~/components/playlist';
import * as Icon from '~/icon';

import { panel } from '~/modules/panel';

import { getPlaylist } from '~/api';
import {
    PLAYLIST_CHANGE_MUSIC_ORDER,
    PLAYLIST_MOVE_MUSIC,
    PLAYLIST_REMOVE_MUSIC,
    PlaylistListener,
    socket
} from '~/socket';

import { musicStore } from '~/store/music';
import { queueStore } from '~/store/queue';
import { TwoToneLayout } from '~/components/layout';

const Item = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    .checkbox {
        margin-left: 1rem;

        svg {
            width: 1rem;
            height: 1rem;
        }

        &.active svg {
            color: #ccc;
            fill: ${theme.COLOR_PURPLE_PROMINENT};
        }
    }
`;

export default function PlaylistDetail() {
    const navigate = useNavigate();

    const { id } = useParams<{ id: string }>();

    const queryClient = useQueryClient();

    const { data: playlist } = useQuery(['playlist', id], () => getPlaylist(id!).then(res => res.data.playlist), { enabled: !!id });

    const [{ musicMap }] = useStore(musicStore);

    const [isSelectMode, setIsSelectMode] = useState(false);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (playlist && over && active.id !== over.id) {
            const oldIndex = playlist.musics.findIndex(({ id }) => id === active.id);
            const newIndex = playlist.musics.findIndex(({ id }) => id === over.id);
            const newMusics = arrayMove(playlist.musics, oldIndex, newIndex);
            PlaylistListener.changeMusicOrder(playlist.id, newMusics.map(({ id }) => id));

            queryClient.setQueryData(['playlist', id], () => {
                return {
                    ...playlist,
                    musics: newMusics
                };
            });
        }
    };

    useEffect(() => {
        const invalidateQueries = () => {
            queryClient.invalidateQueries(['playlist', id]);
        };

        socket.on(PLAYLIST_MOVE_MUSIC, invalidateQueries);
        socket.on(PLAYLIST_REMOVE_MUSIC, invalidateQueries);
        socket.on(PLAYLIST_CHANGE_MUSIC_ORDER, invalidateQueries);

        return () => {
            socket.off(PLAYLIST_MOVE_MUSIC, invalidateQueries);
            socket.off(PLAYLIST_REMOVE_MUSIC, invalidateQueries);
            socket.off(PLAYLIST_CHANGE_MUSIC_ORDER, invalidateQueries);
        };
    }, [id, queryClient]);

    useEffect(() => {
        setSelectedItems([]);
    }, [isSelectMode]);

    if (!playlist) {
        return null;
    }

    return (
        <TwoToneLayout
            header={(
                <PlaylistSummary {...playlist} />
            )}>
            <StickyHeader>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem'
                    }}>
                    <MusicSelector
                        active={isSelectMode}
                        label={isSelectMode ? `${selectedItems.length} selected` : `${playlist.musics.length} musics`}
                        onClick={() => setIsSelectMode(!isSelectMode)}
                        onSelectAll={() => setSelectedItems(playlist.musics.map(({ id }) => id))}
                    />
                </div>
                <Button onClick={() => queueStore.reset(playlist.musics.map(({ id }) => id))}>
                    <Icon.Play /> Play
                </Button>
            </StickyHeader >
            <div style={{ flex: 1 }}>
                <VerticalSortable items={playlist.musics.map(({ id }) => id)} onDragEnd={handleDragEnd}>
                    {playlist.musics.map(({ id }) => {
                        const music = musicMap.get(id);

                        if (!music) return null;

                        const isSelected = selectedItems.includes(music.id);

                        const onClick = () => {
                            queueStore.add(music.id);
                        };

                        const onSelect = () => {
                            if (selectedItems.includes(music.id)) {
                                setSelectedItems(selectedItems.filter(item => item !== music.id));
                            } else {
                                setSelectedItems([...selectedItems, music.id]);
                            }
                        };

                        return (
                            <SortableItem
                                id={music.id}
                                key={music.id}
                                render={({ listeners }) => (
                                    <Item>
                                        {isSelectMode ? (
                                            <button
                                                className={`icon-button checkbox ${isSelected ? 'active' : ''} `}
                                                onClick={() => {
                                                    if (selectedItems.includes(music.id)) {
                                                        setSelectedItems(selectedItems.filter(item => item !== music.id));
                                                    } else {
                                                        setSelectedItems([...selectedItems, music.id]);
                                                    }
                                                }}>
                                                <Icon.CheckBox />
                                            </button>
                                        ) : (
                                            <div
                                                className="icon-button checkbox"
                                                {...listeners}
                                                style={{
                                                    cursor: 'grab',
                                                    touchAction: 'none'
                                                }}>
                                                <Icon.Menu />
                                            </div>
                                        )}
                                        <div
                                            style={{
                                                flex: 1,
                                                maxWidth: 'calc(100% - 4rem)'
                                            }}>
                                            <MusicListItem
                                                albumName={music.album.name}
                                                albumCover={music.album.cover}
                                                artistName={music.artist.name}
                                                musicName={music.name}
                                                musicCodec={music.codec}
                                                isLiked={music.isLiked}
                                                isHated={music.isHated}
                                                onClick={isSelectMode ? onSelect : onClick}
                                                onLongPress={() => panel.open({
                                                    content: (
                                                        <MusicActionPanelContent
                                                            id={music.id}
                                                            onAlbumClick={() => navigate(`/album/${music.album.id}`)}
                                                            onArtistClick={() => navigate(`/artist/${music.artist.id}`)}
                                                        />
                                                    )
                                                })}
                                            />
                                        </div>
                                    </Item>
                                )}
                            />
                        );
                    })}
                </VerticalSortable>
            </div>
            {isSelectMode && selectedItems.length > 0 && (
                <ActionBar>
                    <button
                        className="clickable"
                        onClick={() => {
                            selectedItems.forEach(id => queueStore.add(id));
                            setIsSelectMode(false);
                        }}>
                        <Icon.Play />
                        <span>Play</span>
                    </button>
                    <button
                        className="clickable"
                        onClick={() => panel.open({
                            title: 'Move to playlist',
                            content: (
                                <PlaylistPanelContent
                                    onClick={(id) => {
                                        PlaylistListener.moveMusic(playlist.id, id, selectedItems);
                                        toast('Moved to playlist');
                                        setIsSelectMode(false);
                                    }}
                                />
                            )
                        })}>
                        <Icon.Download />
                        <span>Move</span>
                    </button>
                    <button
                        className="clickable"
                        onClick={async () => {
                            PlaylistListener.removeMusic(playlist.id, selectedItems);
                            setIsSelectMode(false);
                        }}>
                        <Icon.TrashCan />
                        <span>Delete</span>
                    </button>
                </ActionBar>
            )}
        </TwoToneLayout>
    );
}
