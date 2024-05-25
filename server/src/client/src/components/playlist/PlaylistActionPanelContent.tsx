import { confirm, prompt } from '@baejino/ui';
import { useStore } from 'badland-react';

import { GridImage, PanelContent } from '~/components/shared';
import * as Icon from '~/icon';

import { panel } from '~/modules/panel';

import { PlaylistListener } from '~/socket';

import { musicStore } from '~/store/music';
import { playlistStore } from '~/store/playlist';

interface PlaylistActionPanelContentProps {
    id: string;
    onPlaylistClick?: () => void;
}

export default function PlaylistActionPanelContent({
    id,
    onPlaylistClick,
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
                        const name = await prompt('Rename playlist', playlist.name);
                        if (name) {
                            PlaylistListener.update(id, name);
                        }
                        panel.close();
                    },
                },
                {
                    icon: <Icon.TrashBin />,
                    text: 'Delete',
                    onClick: async () => {
                        if (!(await confirm('Are you sure you want to delete this playlist?'))) {
                            return;
                        }
                        PlaylistListener.delete(id);
                        panel.close();
                    },
                },
            ]}
        />
    );
}
