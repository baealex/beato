import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useStore } from 'badland-react';
import { useNavigate, useParams } from 'react-router-dom';

import type { DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

import {
    ActionBar,
    ActionBarButton,
    Button,
    IconButton,
    SortableItem,
    StickyHeader,
    VerticalSortable
} from '~/components/shared';
import { MusicActionPanelContent, MusicListItem, MusicSelector } from '~/components/music';
import { PlaylistPanelContent, PlaylistSummary } from '~/components/playlist';
import * as Icon from '~/icon';

import { panel } from '~/modules/panel';
import { useResetQueue } from '~/hooks';

import { getPlaylist } from '~/api';
import { queryKeys } from '~/api/query-keys';
import { toast } from '~/modules/toast';
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
import styles from './PlaylistDetail.module.scss';

export default function PlaylistDetail() {
    const navigate = useNavigate();
    const resetQueue = useResetQueue();

    const { id } = useParams<{ id: string }>();

    const queryClient = useQueryClient();

    const playlistQueryKey = queryKeys.playlists.detail(id);

    const { data: playlist } = useQuery({
        queryKey: playlistQueryKey,
        queryFn: () => getPlaylist(id!).then(res => res.data.playlist),
        enabled: !!id
    });

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

            queryClient.setQueryData(playlistQueryKey, () => {
                return {
                    ...playlist,
                    musics: newMusics
                };
            });
        }
    };

    useEffect(() => {
        const invalidateQueries = () => {
            if (!id) {
                return;
            }

            queryClient.invalidateQueries({
                queryKey: queryKeys.playlists.detail(id),
                exact: true
            });
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
                <div className={styles.headerControl}>
                    <MusicSelector
                        active={isSelectMode}
                        label={isSelectMode ? `${selectedItems.length} selected` : `${playlist.musics.length} musics`}
                        onClick={() => setIsSelectMode(!isSelectMode)}
                        onSelectAll={() => setSelectedItems(playlist.musics.map(({ id }) => id))}
                    />
                </div>
                <Button onClick={() => void resetQueue(playlist.musics.map(({ id }) => id))}>
                    <Icon.Play /> Play
                </Button>
            </StickyHeader >
            <div className={styles.listContent}>
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
                                    <div className={styles.item}>
                                        {isSelectMode ? (
                                            <IconButton
                                                aria-label={isSelected ? `Unselect ${music.name}` : `Select ${music.name}`}
                                                aria-pressed={isSelected}
                                                active={isSelected}
                                                className={styles.rowControl}
                                                onClick={() => {
                                                    if (selectedItems.includes(music.id)) {
                                                        setSelectedItems(selectedItems.filter(item => item !== music.id));
                                                    } else {
                                                        setSelectedItems([...selectedItems, music.id]);
                                                    }
                                                }}>
                                                <Icon.CheckBox />
                                            </IconButton>
                                        ) : (
                                            <IconButton
                                                aria-label={`Reorder ${music.name}`}
                                                className={`${styles.rowControl} ${styles.dragControl}`}
                                                {...listeners}>
                                                <Icon.Menu />
                                            </IconButton>
                                        )}
                                        <div className={styles.musicItemShell}>
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
                                    </div>
                                )}
                            />
                        );
                    })}
                </VerticalSortable>
            </div>
            {isSelectMode && selectedItems.length > 0 && (
                <ActionBar>
                    <ActionBarButton
                        onClick={() => {
                            selectedItems.forEach(id => queueStore.add(id));
                            setIsSelectMode(false);
                        }}>
                        <Icon.Play />
                        <span>Play</span>
                    </ActionBarButton>
                    <ActionBarButton
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
                    </ActionBarButton>
                    <ActionBarButton
                        onClick={async () => {
                            PlaylistListener.removeMusic(playlist.id, selectedItems);
                            setIsSelectMode(false);
                        }}>
                        <Icon.TrashCan />
                        <span>Delete</span>
                    </ActionBarButton>
                </ActionBar>
            )}
        </TwoToneLayout>
    );
}
