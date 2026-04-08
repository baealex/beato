import { useStore } from 'badland-react';

import { GridImage, PanelContent } from '~/components/shared';
import * as Icon from '~/icon';

import { panel } from '~/modules/panel';
import { confirm } from '~/modules/confirm';
import { prompt } from '~/modules/prompt';

import { PlaylistListener } from '~/socket';

import { musicStore } from '~/store/music';
import { playlistStore } from '~/store/playlist';

interface PlaylistActionPanelContentProps {
    id: string;
    onPlaylistClick?: () => void;
}

export default function PlaylistActionPanelContent({
    id,
    onPlaylistClick
}: PlaylistActionPanelContentProps) {
    const [{ musicMap }] = useStore(musicStore);
    const [{ playlists }] = useStore(playlistStore);

    const playlist = playlists.find(playlist => playlist.id === id);

    if (!playlist) {
        return null;
    }

    return (
        <PanelContent
            header={onPlaylistClick && (
                <button
                    className="panel-album clickable linkable"
                    onClick={() => {
                        panel.close();
                        setTimeout(onPlaylistClick, 100);
                    }}>
                    <GridImage
                        className="album-cover-grid"
                        images={playlist.headerMusics.map(music => musicMap.get(music.id)?.album.cover ?? '')}
                    />
                    <div>
                        <div className="panel-sub-title">
                            {playlist.musicCount} songs
                        </div>
                        <div className="panel-sub-content">
                            {playlist.name}
                        </div>
                    </div>
                </button>

            )}
            items={[
                {
                    icon: <Icon.Pencil />,
                    text: 'Rename',
                    onClick: async () => {
                        const name = await prompt({
                            title: 'Rename playlist',
                            placeholder: 'Playlist name',
                            confirmLabel: 'Rename'
                        }, playlist.name);
                        if (name) {
                            PlaylistListener.update(id, name);
                        }
                        panel.close();
                    }
                },
                {
                    icon: <Icon.TrashCan />,
                    text: 'Delete',
                    onClick: async () => {
                        if (!(await confirm({
                            title: 'Delete playlist?',
                            description: `“${playlist.name}” will be removed from your library.`,
                            confirmLabel: 'Delete playlist',
                            tone: 'danger'
                        }))) {
                            return;
                        }
                        PlaylistListener.delete(id);
                        panel.close();
                    }
                }
            ]}
        />
    );
}
