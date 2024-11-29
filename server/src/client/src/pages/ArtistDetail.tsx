import styled from '@emotion/styled';
import { useStore } from 'badland-react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { AlbumListItem } from '~/components/album';
import { MusicActionPanelContent, MusicListItem } from '~/components/music';
import { Grid, Image, Button } from '~/components/shared';
import { Play } from '~/icon';

import { getArtist } from '~/api';

import { musicStore } from '~/store/music';
import { queueStore } from '~/store/queue';
import { panel } from '~/modules/panel';

const Container = styled.section`
    .artist-name {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 1.25rem;
        font-weight: bold;
        margin: 3rem 0;
        padding: 1rem;

        .detail-info {
            font-size: 1rem;
            font-weight: normal;
            text-align: center;
            margin-top: 0.5rem;
            opacity: 0.5;
        }

        .cover {
            max-width: 100%;
            width: 300px;
            height: auto;
            margin-bottom: 2rem;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 50%;
            }
        }
    }

    .section-title {
        padding: 1rem;
        font-size: 1.25rem;
        font-weight: bold;
        border-bottom: 1px solid var(--b-color-border);
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
`;

export default function ArtistDetail() {
    const navigate = useNavigate();

    const { id } = useParams<{ id: string }>();

    const { data: artist } = useQuery(['artist', id], async () => {
        const { data } = await getArtist(id!);
        return data.artist;
    }, { enabled: !!id });

    const [{ musicMap }] = useStore(musicStore);

    if (!artist) {
        return null;
    }

    const listenedCount = artist.musics.reduce((acc, { id }) => acc += musicMap.get(id)?.playCount || 0, 0);

    return (
        <Container>
            <div className="artist-name">
                <div className="cover">
                    <div>
                        <Image src={artist.latestAlbum?.cover || ''} alt={artist.name} />
                    </div>
                </div>
                {artist.name}
                <span className="detail-info">
                    You have listened to a song by this artist {listenedCount} times.
                </span>
            </div>
            <div className="section-title">
                Albums ({artist.albums.length})
            </div>
            <Grid>
                {artist.albums.map(album => (
                    <AlbumListItem
                        key={album.id}
                        albumCover={album.cover}
                        albumName={album.name}
                        artistName={album.publishedYear}
                        onClick={() => navigate(`/album/${album.id}`)}
                    />
                ))}
            </Grid>

            <div className="section-title">
                Songs ({artist.musics.length})
                <Button onClick={() => queueStore.reset(artist.musics.map(music => music.id))}>
                    <Play /> Play
                </Button>
            </div>
            {artist.musics.map(({ id }) => {
                const music = musicMap.get(id);

                if (!music) return null;

                return (
                    <MusicListItem
                        key={music.id}
                        artistName={music.album.name}
                        albumCover={music.album.cover}
                        albumName={music.album.name}
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
                                />
                            )
                        })}
                    />
                );
            })}
        </Container>
    );
}
