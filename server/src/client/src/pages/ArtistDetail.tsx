import styles from './ArtistDetail.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

import { useStore } from 'badland-react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { AlbumListItem } from '~/components/album';
import { ArtistSummary } from '~/components/artist';
import { TwoToneLayout } from '~/components/layout';
import { MusicActionPanelContent, MusicListItem } from '~/components/music';
import { Grid, Text } from '~/components/shared';
import { Play } from '~/icon';

import { getArtist } from '~/api';
import { queryKeys } from '~/api/query-keys';

import { musicStore } from '~/store/music';
import { queueStore } from '~/store/queue';
import { panel } from '~/modules/panel';

export default function ArtistDetail() {
    const navigate = useNavigate();

    const { id } = useParams<{ id: string }>();

    const { data: artist } = useQuery(queryKeys.artists.detail(id), async () => {
        const { data } = await getArtist(id!);
        return data.artist;
    }, { enabled: !!id });

    const [{ musicMap }] = useStore(musicStore);

    if (!artist) {
        return null;
    }

    const listenedCount = artist.musics.reduce((acc, { id }) => acc += musicMap.get(id)?.playCount || 0, 0);

    return (
        <TwoToneLayout
            backgroundImage={artist.latestAlbum?.cover || ''}
            header={(
                <ArtistSummary
                    name={artist.name}
                    cover={artist.latestAlbum?.cover || ''}
                    listenedCount={listenedCount}
                />
            )}
            primaryAction={(
                <button onClick={() => queueStore.reset(artist.musics.map(music => music.id))}>
                    <Play />
                </button>
            )}>
            <div className={cx('section')}>
                <div className={cx('section-header')}>
                    <div className={cx('section-title')}>
                        <Text as="h2" size="xl" weight="semibold">
                            Albums
                        </Text>
                        <Text variant="tertiary" size="sm">
                            {artist.albums.length}
                        </Text>
                    </div>
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
            </div>

            <div className={cx('section')}>
                <div className={cx('section-header')}>
                    <div className={cx('section-title')}>
                        <Text as="h2" size="xl" weight="semibold">
                            Songs
                        </Text>
                        <Text variant="tertiary" size="sm">
                            {artist.musics.length}
                        </Text>
                    </div>
                </div>
                <div className={cx('music-list')}>
                    {artist.musics.map(({ id }) => {
                        const music = musicMap.get(id);

                        if (!music) return null;

                        return (
                            <MusicListItem
                                key={music.id}
                                artistName={music.artist.name}
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
                </div>
            </div>
        </TwoToneLayout>
    );
}
