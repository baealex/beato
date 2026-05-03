import classNames from 'classnames';
const cx = classNames;

import { Link, useNavigate } from 'react-router-dom';

import { useAppStore as useStore } from '~/store/base-store';
import { IconTextButton, Image, Surface, Text } from '~/components/shared';
import * as Icon from '~/icon';
import { useResetQueue } from '~/hooks';
import { musicStore } from '~/store/music';
import { queueStore } from '~/store/queue';

import type { Music } from '~/models/type';

const QUEUE_PREVIEW_LIMIT = 3;
const FOCUS_TRACK_LIMIT = 4;

const isMusic = (music: Music | undefined): music is Music => Boolean(music);

const formatCount = (count: number, singular: string, plural = `${singular}s`) => {
    return `${count.toLocaleString()} ${count === 1 ? singular : plural}`;
};

export default function Home() {
    const navigate = useNavigate();
    const resetQueue = useResetQueue();

    const [{ loaded, musics, musicMap }] = useStore(musicStore);
    const [{
        currentTrackId,
        isPlaying,
        items,
        progress,
        queueLength,
        selected
    }] = useStore(queueStore);

    const currentMusic = currentTrackId ? musicMap.get(currentTrackId) : null;
    const availableMusics = musics.filter(music => !music.isHated);
    const likedMusics = availableMusics.filter(music => music.isLiked);
    const albumCount = new Set(availableMusics.map(music => music.album.id)).size;
    const artistCount = new Set(availableMusics.map(music => music.artist.id)).size;
    const queuePreviewStartIndex = selected === null ? 0 : selected + 1;
    const queuePreviewMusics = items
        .slice(queuePreviewStartIndex)
        .filter(id => id !== currentTrackId)
        .slice(0, QUEUE_PREVIEW_LIMIT)
        .map(id => musicMap.get(id))
        .filter(isMusic);
    const upNextCount = selected === null
        ? queueLength
        : Math.max(queueLength - selected - 1, 0);
    const focusMusics = availableMusics
        .filter(music => music.id !== currentTrackId)
        .slice(0, FOCUS_TRACK_LIMIT);

    const handlePrimaryAction = () => {
        if (currentMusic) {
            if (isPlaying) {
                queueStore.pause();
                return;
            }
            queueStore.play();
            return;
        }

        void resetQueue(availableMusics.map(music => music.id));
    };

    const handlePlayFavorites = () => {
        void resetQueue(likedMusics.map(music => music.id));
    };

    const shortcutItems = [
        {
            label: 'Songs',
            meta: formatCount(availableMusics.length, 'song'),
            path: '/library',
            icon: <Icon.Music />
        },
        {
            label: 'Favorites',
            meta: formatCount(likedMusics.length, 'song'),
            path: '/favorite',
            icon: <Icon.Heart />
        },
        {
            label: 'Albums',
            meta: formatCount(albumCount, 'album'),
            path: '/album',
            icon: <Icon.Disc />
        },
        {
            label: 'Artists',
            meta: formatCount(artistCount, 'artist'),
            path: '/artist',
            icon: <Icon.User />
        }
    ];

    return (
        <div className={cx('ow-home-Home')}>
            <Surface as="section" variant="panel" radius="2xl" className={cx('ow-home-hero')}>
                <div className={cx('ow-home-heroArt')}>
                    {currentMusic ? (
                        <Image
                            className={cx('ow-home-art')}
                            src={currentMusic.album.cover}
                            alt={currentMusic.album.name}
                            loading="eager"
                            icon={<Icon.Disc />}
                        />
                    ) : (
                        <div className={cx('ow-home-emptyArt')}>
                            <Icon.Music />
                        </div>
                    )}
                </div>

                <div className={cx('ow-home-heroCopy')}>
                    <Text
                        as="span"
                        variant="muted"
                        size="xs"
                        weight="medium"
                        className={cx('ow-home-eyebrow')}>
                        {currentMusic ? 'Now playing' : 'Listening room'}
                    </Text>

                    <Text as="h1" size="2xl" weight="bold" className={cx('ow-home-title')}>
                        {currentMusic?.name ?? (loaded ? 'Ready when you are.' : 'Loading your library.')}
                    </Text>

                    <Text as="p" variant="secondary" size="md" className={cx('ow-home-description')}>
                        {currentMusic
                            ? `${currentMusic.artist.name} · ${currentMusic.album.name}`
                            : 'Start a calm session from your own collection.'}
                    </Text>

                    {currentMusic && (
                        <div className={cx('ow-home-progress')} aria-hidden="true">
                            <div
                                className={cx('ow-home-progressBar')}
                                style={{ transform: `scaleX(${progress / 100})` }}
                            />
                        </div>
                    )}

                    <div className={cx('ow-home-heroActions')}>
                        <IconTextButton
                            className={cx('ow-home-primaryButton')}
                            variant="primary"
                            size="lg"
                            icon={currentMusic && isPlaying ? <Icon.Pause /> : <Icon.Play />}
                            label={currentMusic ? (isPlaying ? 'Pause' : 'Resume') : 'Start library'}
                            disabled={!currentMusic && availableMusics.length === 0}
                            onClick={handlePrimaryAction}
                        />

                        <IconTextButton
                            className={cx('ow-home-secondaryButton')}
                            variant="secondary"
                            size="lg"
                            icon={currentMusic ? <Icon.Music /> : <Icon.ListMusic />}
                            label={currentMusic ? 'Open player' : 'Open library'}
                            onClick={() => navigate(currentMusic ? '/player' : '/library')}
                        />
                    </div>
                </div>
            </Surface>

            <div className={cx('ow-home-contentGrid')}>
                <Surface as="section" className={cx('ow-home-panel', 'queuePanel')} aria-labelledby="home-queue-title">
                    <div className={cx('ow-home-sectionHeader')}>
                        <div>
                            <Text
                                as="span"
                                variant="muted"
                                size="xs"
                                weight="medium"
                                className={cx('ow-home-eyebrow')}>
                                Up next
                            </Text>
                            <h2 id="home-queue-title" className={cx('ow-home-sectionTitle')}>
                                Queue
                            </h2>
                        </div>
                        <button
                            type="button"
                            className={cx('ow-home-textButton')}
                            onClick={() => navigate('/queue')}>
                            Open
                        </button>
                    </div>

                    {queuePreviewMusics.length > 0 ? (
                        <div className={cx('ow-home-trackList')}>
                            {queuePreviewMusics.map((music, index) => (
                                <button
                                    key={music.id}
                                    type="button"
                                    className={cx('ow-home-trackRow')}
                                    onClick={() => {
                                        const queueIndex = items.indexOf(music.id);

                                        if (queueIndex >= 0) {
                                            queueStore.select(queueIndex);
                                        }
                                    }}>
                                    <span className={cx('ow-home-trackIndex')}>{index + 1}</span>
                                    <Image
                                        className={cx('ow-home-trackArt')}
                                        src={music.album.cover}
                                        alt={music.album.name}
                                        icon={<Icon.Disc />}
                                    />
                                    <span className={cx('ow-home-trackCopy')}>
                                        <span className={cx('ow-home-trackTitle')}>{music.name}</span>
                                        <span className={cx('ow-home-trackMeta')}>{music.artist.name}</span>
                                    </span>
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className={cx('ow-home-quietState')}>
                            <Text as="p" variant="secondary" size="sm">
                                {queueLength > 0
                                    ? 'Queue ends after the current track.'
                                    : 'Build a queue when you want the session to keep moving.'}
                            </Text>
                        </div>
                    )}

                    <Text as="p" variant="muted" size="xs" className={cx('ow-home-panelNote')}>
                        {upNextCount > 0
                            ? `${formatCount(upNextCount, 'track')} waiting after this moment.`
                            : 'No upcoming tracks yet.'}
                    </Text>
                </Surface>

                <Surface as="section" className={cx('ow-home-panel', 'actionsPanel')} aria-labelledby="home-actions-title">
                    <div className={cx('ow-home-sectionHeader')}>
                        <div>
                            <Text
                                as="span"
                                variant="muted"
                                size="xs"
                                weight="medium"
                                className={cx('ow-home-eyebrow')}>
                                Quick start
                            </Text>
                            <h2 id="home-actions-title" className={cx('ow-home-sectionTitle')}>
                                Choose a flow
                            </h2>
                        </div>
                    </div>

                    <div className={cx('ow-home-actionStack')}>
                        <IconTextButton
                            className={cx('ow-home-actionButton')}
                            icon={<Icon.Play />}
                            label="Play library"
                            meta={formatCount(availableMusics.length, 'song')}
                            disabled={availableMusics.length === 0}
                            onClick={() => void resetQueue(availableMusics.map(music => music.id))}
                        />
                        <IconTextButton
                            className={cx('ow-home-actionButton')}
                            icon={<Icon.Heart />}
                            label="Play favorites"
                            meta={formatCount(likedMusics.length, 'song')}
                            disabled={likedMusics.length === 0}
                            onClick={handlePlayFavorites}
                        />
                    </div>
                </Surface>
            </div>

            <Surface as="section" className={cx('ow-home-librarySection')} aria-labelledby="home-library-title">
                <div className={cx('ow-home-sectionHeader')}>
                    <div>
                        <Text
                            as="span"
                            variant="muted"
                            size="xs"
                            weight="medium"
                            className={cx('ow-home-eyebrow')}>
                            Library
                        </Text>
                        <h2 id="home-library-title" className={cx('ow-home-sectionTitle')}>
                            Browse quietly
                        </h2>
                    </div>
                </div>

                <div className={cx('ow-home-shortcutGrid')}>
                    {shortcutItems.map(item => (
                        <Link key={item.path} to={item.path} className={cx('ow-home-shortcutCard')}>
                            <span className={cx('ow-home-shortcutIcon')}>{item.icon}</span>
                            <span className={cx('ow-home-shortcutCopy')}>
                                <span className={cx('ow-home-shortcutLabel')}>{item.label}</span>
                                <span className={cx('ow-home-shortcutMeta')}>{item.meta}</span>
                            </span>
                        </Link>
                    ))}
                </div>
            </Surface>

            {focusMusics.length > 0 && (
                <Surface as="section" className={cx('ow-home-focusSection')} aria-labelledby="home-focus-title">
                    <div className={cx('ow-home-sectionHeader')}>
                        <div>
                            <Text
                                as="span"
                                variant="muted"
                                size="xs"
                                weight="medium"
                                className={cx('ow-home-eyebrow')}>
                                High rotation
                            </Text>
                            <h2 id="home-focus-title" className={cx('ow-home-sectionTitle')}>
                                Familiar tracks
                            </h2>
                        </div>
                    </div>

                    <div className={cx('ow-home-focusList')}>
                        {focusMusics.map(music => (
                            <button
                                key={music.id}
                                type="button"
                                className={cx('ow-home-focusTrack')}
                                onClick={() => void queueStore.add(music.id)}>
                                <Image
                                    className={cx('ow-home-focusArt')}
                                    src={music.album.cover}
                                    alt={music.album.name}
                                    icon={<Icon.Disc />}
                                />
                                <span className={cx('ow-home-focusCopy')}>
                                    <span className={cx('ow-home-trackTitle')}>{music.name}</span>
                                    <span className={cx('ow-home-trackMeta')}>{music.artist.name}</span>
                                </span>
                                <Icon.Play />
                            </button>
                        ))}
                    </div>
                </Surface>
            )}
        </div>
    );
}
