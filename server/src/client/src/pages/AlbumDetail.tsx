import { useStore } from 'badland-react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { MusicActionPanelContent, MusicListItem } from '~/components/music';
import { TwoToneLayout } from '~/components/layout';
import { AlbumSummary } from '~/components/album';
import { Play } from '~/icon';

import { getAlbum } from '~/api';

import { musicStore } from '~/store/music';
import { queueStore } from '~/store/queue';
import { panel } from '~/modules/panel';

export default function AlbumDetail() {
    const navigate = useNavigate();

    const { id } = useParams<{ id: string }>();

    const { data: album } = useQuery(['album', id], async () => {
        const { data } = await getAlbum(id!);
        return data.album;
    }, { enabled: !!id });

    const [{ musicMap }] = useStore(musicStore);

    if (!album) {
        return null;
    }

    return (
        <>
            <TwoToneLayout
                header={(
                    <AlbumSummary {...album} />
                )}
                primaryAction={(
                    <button onClick={() => queueStore.reset(album.musics.map(music => music.id))}>
                        <Play/>
                    </button>
                )}>
                {album.musics.map(({ id }) => {
                    const music = musicMap.get(id);

                    if (!music) {
                        return null;
                    }

                    return (
                        <MusicListItem
                            key={music.id}
                            albumName={music.album.name}
                            artistName={music.artist.name}
                            trackNumber={music.trackNumber}
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
                                        onArtistClick={() => navigate(`/artist/${music.artist.id}`)}
                                    />
                                )
                            })}
                        />
                    );
                })}
            </TwoToneLayout>
        </>
    );
}
