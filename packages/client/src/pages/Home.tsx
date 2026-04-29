import styles from './Home.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

import { Link, useNavigate } from 'react-router-dom';

import { useAppStore as useStore } from '~/store/base-store';
import { Image, Text } from '~/components/shared';
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
        <div className={cx('Home')}>
            <section className={cx('hero')}>
                <div className={cx('heroArt')}>
                    {currentMusic ? (
                        <Image
                            className={cx('art')}
                            src={currentMusic.album.cover}
                            alt={currentMusic.album.name}
                            loading="eager"
                            icon={<Icon.Disc />}
                        />
                    ) : (
                        <div className={cx('emptyArt')}>
                            <Icon.Music />
                        </div>
                    )}
                </div>

                <div className={cx('heroCopy')}>
                    <Text
                        as="span"
                        variant="muted"
                        size="xs"
                        weight="medium"
                        className={cx('eyebrow')}>
                        {currentMusic ? 'Now playing' : 'Listening room'}
                    </Text>

                    <Text as="h1" size="2xl" weight="bold" className={cx('title')}>
                        {currentMusic?.name ?? (loaded ? 'Ready when you are.' : 'Loading your library.')}
                    </Text>

                    <Text as="p" variant="secondary" size="md" className={cx('description')}>
                        {currentMusic
                            ? `${currentMusic.artist.name} · ${currentMusic.album.name}`
                            : 'Start a calm session from your own collection.'}
                    </Text>

                    {currentMusic && (
                        <div className={cx('progress')} aria-hidden="true">
                            <div
                                className={cx('progressBar')}
                                style={{ transform: `scaleX(${progress / 100})` }}
                            />
                        </div>
                    )}

                    <div className={cx('heroActions')}>
                        <button
                            type="button"
                            className={cx('primaryButton')}
                            disabled={!currentMusic && availableMusics.length === 0}
                            onClick={handlePrimaryAction}>
                            {currentMusic && isPlaying ? <Icon.Pause /> : <Icon.Play />}
                            <span>{currentMusic ? (isPlaying ? 'Pause' : 'Resume') : 'Start library'}</span>
                        </button>

                        <button
                            type="button"
                            className={cx('secondaryButton')}
                            onClick={() => navigate(currentMusic ? '/player' : '/library')}>
                            {currentMusic ? <Icon.Music /> : <Icon.ListMusic />}
                            <span>{currentMusic ? 'Open player' : 'Open library'}</span>
                        </button>
                    </div>
                </div>
            </section>

            <div className={cx('contentGrid')}>
                <section className={cx('panel', 'queuePanel')} aria-labelledby="home-queue-title">
                    <div className={cx('sectionHeader')}>
                        <div>
                            <Text
                                as="span"
                                variant="muted"
                                size="xs"
                                weight="medium"
                                className={cx('eyebrow')}>
                                Up next
                            </Text>
                            <h2 id="home-queue-title" className={cx('sectionTitle')}>
                                Queue
                            </h2>
                        </div>
                        <button
                            type="button"
                            className={cx('textButton')}
                            onClick={() => navigate('/queue')}>
                            Open
                        </button>
                    </div>

                    {queuePreviewMusics.length > 0 ? (
                        <div className={cx('trackList')}>
                            {queuePreviewMusics.map((music, index) => (
                                <button
                                    key={music.id}
                                    type="button"
                                    className={cx('trackRow')}
                                    onClick={() => {
                                        const queueIndex = items.indexOf(music.id);

                                        if (queueIndex >= 0) {
                                            queueStore.select(queueIndex);
                                        }
                                    }}>
                                    <span className={cx('trackIndex')}>{index + 1}</span>
                                    <Image
                                        className={cx('trackArt')}
                                        src={music.album.cover}
                                        alt={music.album.name}
                                        icon={<Icon.Disc />}
                                    />
                                    <span className={cx('trackCopy')}>
                                        <span className={cx('trackTitle')}>{music.name}</span>
                                        <span className={cx('trackMeta')}>{music.artist.name}</span>
                                    </span>
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className={cx('quietState')}>
                            <Text as="p" variant="secondary" size="sm">
                                {queueLength > 0
                                    ? 'Queue ends after the current track.'
                                    : 'Build a queue when you want the session to keep moving.'}
                            </Text>
                        </div>
                    )}

                    <Text as="p" variant="muted" size="xs" className={cx('panelNote')}>
                        {upNextCount > 0
                            ? `${formatCount(upNextCount, 'track')} waiting after this moment.`
                            : 'No upcoming tracks yet.'}
                    </Text>
                </section>

                <section className={cx('panel', 'actionsPanel')} aria-labelledby="home-actions-title">
                    <div className={cx('sectionHeader')}>
                        <div>
                            <Text
                                as="span"
                                variant="muted"
                                size="xs"
                                weight="medium"
                                className={cx('eyebrow')}>
                                Quick start
                            </Text>
                            <h2 id="home-actions-title" className={cx('sectionTitle')}>
                                Choose a flow
                            </h2>
                        </div>
                    </div>

                    <div className={cx('actionStack')}>
                        <button
                            type="button"
                            className={cx('actionButton')}
                            disabled={availableMusics.length === 0}
                            onClick={() => void resetQueue(availableMusics.map(music => music.id))}>
                            <Icon.Play />
                            <span>
                                <strong>Play library</strong>
                                <small>{formatCount(availableMusics.length, 'song')}</small>
                            </span>
                        </button>
                        <button
                            type="button"
                            className={cx('actionButton')}
                            disabled={likedMusics.length === 0}
                            onClick={handlePlayFavorites}>
                            <Icon.Heart />
                            <span>
                                <strong>Play favorites</strong>
                                <small>{formatCount(likedMusics.length, 'song')}</small>
                            </span>
                        </button>
                    </div>
                </section>
            </div>

            <section className={cx('librarySection')} aria-labelledby="home-library-title">
                <div className={cx('sectionHeader')}>
                    <div>
                        <Text
                            as="span"
                            variant="muted"
                            size="xs"
                            weight="medium"
                            className={cx('eyebrow')}>
                            Library
                        </Text>
                        <h2 id="home-library-title" className={cx('sectionTitle')}>
                            Browse quietly
                        </h2>
                    </div>
                </div>

                <div className={cx('shortcutGrid')}>
                    {shortcutItems.map(item => (
                        <Link key={item.path} to={item.path} className={cx('shortcutCard')}>
                            <span className={cx('shortcutIcon')}>{item.icon}</span>
                            <span className={cx('shortcutCopy')}>
                                <span className={cx('shortcutLabel')}>{item.label}</span>
                                <span className={cx('shortcutMeta')}>{item.meta}</span>
                            </span>
                        </Link>
                    ))}
                </div>
            </section>

            {focusMusics.length > 0 && (
                <section className={cx('focusSection')} aria-labelledby="home-focus-title">
                    <div className={cx('sectionHeader')}>
                        <div>
                            <Text
                                as="span"
                                variant="muted"
                                size="xs"
                                weight="medium"
                                className={cx('eyebrow')}>
                                High rotation
                            </Text>
                            <h2 id="home-focus-title" className={cx('sectionTitle')}>
                                Familiar tracks
                            </h2>
                        </div>
                    </div>

                    <div className={cx('focusList')}>
                        {focusMusics.map(music => (
                            <button
                                key={music.id}
                                type="button"
                                className={cx('focusTrack')}
                                onClick={() => void queueStore.add(music.id)}>
                                <Image
                                    className={cx('focusArt')}
                                    src={music.album.cover}
                                    alt={music.album.name}
                                    icon={<Icon.Disc />}
                                />
                                <span className={cx('focusCopy')}>
                                    <span className={cx('trackTitle')}>{music.name}</span>
                                    <span className={cx('trackMeta')}>{music.artist.name}</span>
                                </span>
                                <Icon.Play />
                            </button>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
