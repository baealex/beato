import { toast } from '@baejino/ui';
import { useStore } from 'badland-react';

import { Image, PanelContent } from '~/components/shared';
import { PlaylistPanelContent } from '~/components/playlist';

import * as Icon from '~/icon';

import { panel } from '~/modules/panel';
import { makePlayTime } from '~/modules/time';
import { MusicListener, PlaylistListener } from '~/socket';

import { musicStore } from '~/store/music';
import { queueStore } from '~/store/queue';

interface MusicActionPanelContentProps {
    id: string;
    onArtistClick?: () => void;
    onAlbumClick?: () => void;
}

export default function MusicActionPanelContent({
    id,
    onArtistClick,
    onAlbumClick
}: MusicActionPanelContentProps) {
    const [{ musicMap }] = useStore(musicStore);

    const music = musicMap.get(id);

    if (!music) {
        return null;
    }

    return (
        <PanelContent
            header={(
                <>
                    {onAlbumClick && (
                        <button
                            className="panel-album clickable linkable"
                            onClick={() => {
                                panel.close();
                                setTimeout(onAlbumClick, 100);
                            }}>
                            <Image
                                className="cover"
                                src={music.album.cover}
                                alt={music.album.name}
                            />
                            <div>
                                <div className="panel-sub-title">Album</div>
                                <div className="panel-sub-content">
                                    {music.album.name}
                                </div>
                            </div>
                        </button>
                    )}
                    {onArtistClick && (
                        <button
                            className="panel-artist clickable linkable"
                            onClick={() => {
                                panel.close();
                                setTimeout(onArtistClick, 100);
                            }}>
                            <div>
                                <div className="panel-sub-title">Artist</div>
                                <div className="panel-sub-content">
                                    {music.artist.name}
                                </div>
                            </div>
                        </button>
                    )}
                </>
            )}
            items={[
                {
                    icon: <Icon.Heart />,
                    text: 'Like',
                    isActive: music.isLiked,
                    onClick: () => MusicListener.like(music.id, !music.isLiked)
                },
                {
                    icon: <Icon.Play />,
                    text: 'Add to Queue',
                    onClick: () => queueStore.add(music.id)
                },
                {
                    icon: <Icon.List />,
                    text: 'Add to Playlist',
                    onClick: () => {
                        panel.close();
                        panel.open({
                            title: 'Add to Playlist',
                            content: (
                                <PlaylistPanelContent
                                    onClick={(id) => {
                                        PlaylistListener.addMusic(id, [music.id]);
                                        toast('Added to playlist');
                                    }}
                                />
                            )
                        });
                    }
                },
                {
                    icon: <Icon.Download />,
                    text: 'Download',
                    onClick: () => {
                        queueStore.download(music.id);
                        panel.close();
                    }
                },
                {
                    icon: <Icon.Close />,
                    text: music.isHated ? 'Show again this music' : 'Hide this music',
                    onClick: () => MusicListener.hate(music.id)
                }
            ]}
            footer={(
                <>
                    <span>listen: {music.playCount} times</span> /
                    <span>duration: {makePlayTime(music.duration)}</span> /
                    <span>codec: {music.codec}</span>
                </>
            )}
        />
    );
}
