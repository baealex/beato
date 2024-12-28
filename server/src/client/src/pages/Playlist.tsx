
import { prompt } from '@baejino/ui';
import { useStore } from 'badland-react';
import { useNavigate } from 'react-router-dom';

import type { DragEndEvent } from '@dnd-kit/core';
import { arrayMove, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import {
    Loading,
    Button,
    StickyHeader,
    VerticalSortable,
    Flex
} from '~/components/shared';
import { PlaylistActionPanelContent, PlaylistItem } from '~/components/playlist';
import { Menu } from '~/icon';

import type { Playlist as PlaylistModel } from '~/models/type';

import { PlaylistListener } from '~/socket';

import { playlistStore } from '~/store/playlist';
import { panel } from '~/modules/panel';

function PlaylistDndItem({
    playlist,
    onClick,
    onLongPress
}: {
    playlist: PlaylistModel;
    onClick: () => void;
    onLongPress: () => void;
}) {
    const {
        attributes, listeners, setNodeRef, transform, transition
    } = useSortable({ id: playlist.id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };

    return (
        <Flex
            ref={setNodeRef}
            direction="row"
            align="center"
            style={style}
            {...attributes}>
            <div
                className="icon-button"
                {...listeners}
                style={{
                    cursor: 'grab',
                    touchAction: 'none',
                    marginLeft: '16px'
                }}>
                <Menu style={{ width: '16px' }} />
            </div>
            <div
                style={{
                    flex: 1,
                    maxWidth: 'calc(100% - 64px)'
                }}>
                <PlaylistItem
                    key={playlist.id}
                    {...playlist}
                    onClick={onClick}
                    onLongPress={onLongPress}
                />
            </div>
        </Flex>
    );
}

export default function Playlist() {
    const navigate = useNavigate();

    const [{ playlists, loaded }, setState] = useStore(playlistStore);

    const handleCreate = async () => {
        const name = await prompt('Enter playlist name');
        PlaylistListener.create(name);
    };

    const handleDragEnd = (e: DragEndEvent) => {
        const { active, over } = e;

        if (over && active.id !== over.id) {
            const oldIndex = playlists.findIndex((playlist) => playlist.id === active.id);
            const newIndex = playlists.findIndex((playlist) => playlist.id === over.id);
            const newPlaylists = arrayMove(playlists, oldIndex, newIndex);
            PlaylistListener.changeOrder(newPlaylists.map((playlist) => playlist.id));

            setState((state) => ({
                ...state,
                playlists: newPlaylists
            }));
        }
    };

    return (
        <>
            <StickyHeader>
                <div />
                <Button onClick={handleCreate}>
                    Create
                </Button>
            </StickyHeader>
            <VerticalSortable items={playlists.map((playlist) => playlist.id)} onDragEnd={handleDragEnd}>
                {!loaded && (
                    <Loading />
                )}
                {loaded && playlists?.map((playlist) => (
                    <PlaylistDndItem
                        key={playlist.id}
                        playlist={playlist}
                        onClick={() => navigate(`/playlist/${playlist.id}`)}
                        onLongPress={() => panel.open({
                            content: (
                                <PlaylistActionPanelContent
                                    id={playlist.id}
                                    onPlaylistClick={() => navigate(`/playlist/${playlist.id}`)}
                                />
                            )
                        })}
                    />
                ))}
            </VerticalSortable>
        </>
    );
}
