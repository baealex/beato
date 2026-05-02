import {
    useEffect,
    useState,
    type CSSProperties,
    type KeyboardEvent as ReactKeyboardEvent
} from 'react';

import styles from './Player.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

import { useNavigate } from 'react-router-dom';
import { useAppStore as useStore } from '~/store/base-store';

import {
    MusicPlayerDiskStyle,
    MusicPlayerFluffyStyle,
    MusicPlayerVisualizerStyle
} from '~/components/music';
import { Text } from '~/components/shared';
import * as Icon from '~/icon';

import { useBack, useDominantColor, useStoreValue } from '~/hooks';

import { getImage } from '~/modules/image';
import { makePlayTime } from '~/modules/time';

import { musicStore } from '~/store/music';
import { queueStore } from '~/store/queue';
import { themeStore } from '~/store/theme';
import type { PlayerVisualizerMode } from '~/store/theme';

const PLAYER_VISUALIZER_MODES: Array<{
    value: PlayerVisualizerMode;
    label: string;
    description: string;
}> = [
    {
        value: 'puffy',
        label: 'Puffy',
        description: 'Soft album motion'
    },
    {
        value: 'disk',
        label: 'CD',
        description: 'Simple disk player'
    },
    {
        value: 'round',
        label: 'Dancing',
        description: 'Sound points dance'
    },
    {
        value: 'line',
        label: 'Trace',
        description: 'Low spectrum trace'
    },
    {
        value: 'ring',
        label: 'Halo',
        description: 'Album edge glow'
    },
    {
        value: 'digital',
        label: 'Constellation',
        description: 'Connected digital field'
    }
];

const MIX_MODES = [
    {
        value: 'none',
        label: 'No transition',
        description: 'Change tracks immediately'
    },
    {
        value: 'mix',
        label: 'Mix fade',
        description: 'Fade tracks across 20 seconds'
    }
] as const;

interface RGB {
    r: number;
    g: number;
    b: number;
}

const DEFAULT_AMBIENT_COLOR = {
    r: 70,
    g: 215,
    b: 207
} as const satisfies RGB;

const mixChannel = (from: number, to: number, amount: number) => Math.round(from + (to - from) * amount);
const mixColor = (from: RGB, to: RGB, amount: number): RGB => ({
    r: mixChannel(from.r, to.r, amount),
    g: mixChannel(from.g, to.g, amount),
    b: mixChannel(from.b, to.b, amount)
});
const rgbVar = (color: RGB) => `${color.r}, ${color.g}, ${color.b}`;
const createAmbientStyle = (accentColor: RGB | null | undefined) => {
    const accent = accentColor ?? DEFAULT_AMBIENT_COLOR;
    const deep = mixColor(accent, {
        r: 3,
        g: 10,
        b: 13
    }, 0.52);
    const muted = mixColor(accent, DEFAULT_AMBIENT_COLOR, 0.34);

    return {
        '--player-accent': rgbVar(accent),
        '--player-deep': rgbVar(deep),
        '--player-muted': rgbVar(muted)
    } as CSSProperties;
};

export default function PlayerDetail() {
    const back = useBack();
    const navigate = useNavigate();

    const [currentTrackId] = useStoreValue(queueStore, 'currentTrackId');
    const [selected] = useStoreValue(queueStore, 'selected');
    const [queueLength] = useStoreValue(queueStore, 'queueLength');
    const [currentTime] = useStoreValue(queueStore, 'currentTime');
    const [progress] = useStoreValue(queueStore, 'progress');
    const [isPlaying] = useStoreValue(queueStore, 'isPlaying');
    const [repeatMode] = useStoreValue(queueStore, 'repeatMode');
    const [shuffle] = useStoreValue(queueStore, 'shuffle');
    const [mixMode] = useStoreValue(queueStore, 'mixMode');
    const [{ playerVisualizerMode }] = useStore(themeStore);
    const [{ musicMap }] = useStore(musicStore);
    const [isAudioMenuOpen, setIsAudioMenuOpen] = useState(false);

    const currentMusic = currentTrackId
        ? musicMap.get(currentTrackId)
        : null;
    const coverImage = currentMusic ? getImage(currentMusic.album.cover) : '';
    const accentColor = useDominantColor(coverImage || undefined);
    const duration = currentMusic?.duration || 0;
    const queuePosition = selected !== null ? selected + 1 : null;
    const publishedYear = currentMusic?.album?.publishedYear?.trim() || '';

    // TODO: Fix type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleClickProgress = (e: any) => {
        const { width, left, right } = (e.currentTarget as HTMLDivElement).getBoundingClientRect();

        let x = e.touches ? e.touches[0].clientX : e.clientX;
        x = x < left ? left : x > right ? right : x;
        const percent = (x - left) / width;

        if (duration <= 0) {
            return;
        }

        queueStore.seek(duration * percent);
    };

    // TODO: Fix type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleMoveProgress = (e: any) => {
        if (e.buttons === 1) {
            handleClickProgress(e);
            return;
        }

        if (e.touches?.length === 1) {
            handleClickProgress(e);
        }
    };

    const handleKeyDownProgress = (e: ReactKeyboardEvent<HTMLDivElement>) => {
        if (duration <= 0) {
            return;
        }

        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            queueStore.seek(Math.max(0, currentTime - 5));
        }

        if (e.key === 'ArrowRight') {
            e.preventDefault();
            queueStore.seek(Math.min(duration, currentTime + 5));
        }

        if (e.key === 'Home') {
            e.preventDefault();
            queueStore.seek(0);
        }

        if (e.key === 'End') {
            e.preventDefault();
            queueStore.seek(duration);
        }
    };

    const isStabilityModeEnabled = Boolean(localStorage.getItem('stability-mode::on'));
    const playerEffectMode = isStabilityModeEnabled ? 'disk' : playerVisualizerMode;
    const isVisualizerEffect = !['puffy', 'disk'].includes(playerEffectMode);
    const ambientStyle = createAmbientStyle(accentColor);

    useEffect(() => {
        if (!isAudioMenuOpen) {
            return;
        }

        const handleKeyDown = (event: globalThis.KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsAudioMenuOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isAudioMenuOpen]);

    useEffect(() => {
        if (!currentMusic) {
            setIsAudioMenuOpen(false);
        }
    }, [currentMusic]);

    return (
        <div className={cx('Player', { immersive: Boolean(currentMusic) })} style={ambientStyle}>
            {currentMusic && <div className={cx('ambient-background')} aria-hidden="true" />}

            <div className={cx('container')}>
                <div className={cx('top-bar')}>
                    <button
                        type="button"
                        className={cx('utility-button')}
                        aria-label="Go back"
                        onClick={back}>
                        <Icon.ChevronLeft />
                    </button>

                    {currentMusic && (
                        <button
                            type="button"
                            className={cx('utility-button', 'audio-menu-trigger', { active: isAudioMenuOpen })}
                            aria-label="Open audio menu"
                            aria-haspopup="dialog"
                            aria-expanded={isAudioMenuOpen}
                            onClick={() => setIsAudioMenuOpen(true)}>
                            <Icon.Menu />
                        </button>
                    )}
                </div>

                {currentMusic && isAudioMenuOpen && (
                    <div className={cx('audio-menu-layer')}>
                        <button
                            type="button"
                            className={cx('audio-menu-backdrop')}
                            aria-label="Close audio menu"
                            onClick={() => setIsAudioMenuOpen(false)}
                        />

                        <aside
                            className={cx('audio-menu-panel')}
                            role="dialog"
                            aria-modal="true"
                            aria-label="Audio menu">
                            <header className={cx('audio-menu-header')}>
                                <div>
                                    <Text as="h2" size="title" weight="bold">
                                        Audio Menu
                                    </Text>
                                    <Text as="p" variant="tertiary" size="sm">
                                        Visualizer and playback tools.
                                    </Text>
                                </div>

                                <button
                                    type="button"
                                    className={cx('utility-button', 'audio-menu-close')}
                                    aria-label="Close audio menu"
                                    onClick={() => setIsAudioMenuOpen(false)}>
                                    <Icon.Close />
                                </button>
                            </header>

                            <section className={cx('audio-menu-section')} aria-labelledby="player-effects-title">
                                <div className={cx('audio-menu-section-header')}>
                                    <h3 id="player-effects-title" className={cx('audio-menu-section-title')}>
                                        Player Effect
                                    </h3>
                                    <Text as="p" variant="tertiary" size="xs">
                                        Choose how the album art reacts.
                                    </Text>
                                </div>

                                {isStabilityModeEnabled && (
                                    <div className={cx('audio-menu-note')}>
                                        Stability mode is on. CD is used until visual effects are re-enabled in Settings.
                                    </div>
                                )}

                                <div className={cx('audio-option-list')} aria-label="Visualizer mode">
                                    {PLAYER_VISUALIZER_MODES.map(({ value, label, description }) => (
                                        <button
                                            key={value}
                                            type="button"
                                            className={cx('audio-option', {
                                                active: playerEffectMode === value,
                                                disabled: isStabilityModeEnabled
                                            })}
                                            aria-pressed={playerEffectMode === value}
                                            disabled={isStabilityModeEnabled}
                                            onClick={() => themeStore.setPlayerVisualizerMode(value)}>
                                            <span className={cx('audio-option-copy')}>
                                                <span className={cx('audio-option-label')}>{label}</span>
                                                <span className={cx('audio-option-description')}>{description}</span>
                                            </span>
                                            {playerEffectMode === value && <Icon.Check />}
                                        </button>
                                    ))}
                                </div>
                            </section>

                            <section className={cx('audio-menu-section')} aria-labelledby="transition-title">
                                <div className={cx('audio-menu-section-header')}>
                                    <h3 id="transition-title" className={cx('audio-menu-section-title')}>
                                        Transition
                                    </h3>
                                    <Text as="p" variant="tertiary" size="xs">
                                        Control how tracks blend.
                                    </Text>
                                </div>

                                <div className={cx('audio-option-list')} aria-label="Transition effect">
                                    {MIX_MODES.map(({ value, label, description }) => (
                                        <button
                                            key={value}
                                            type="button"
                                            className={cx('audio-option', { active: mixMode === value })}
                                            aria-pressed={mixMode === value}
                                            onClick={() => queueStore.setMixMode(value)}>
                                            <span className={cx('audio-option-copy')}>
                                                <span className={cx('audio-option-label')}>{label}</span>
                                                <span className={cx('audio-option-description')}>{description}</span>
                                            </span>
                                            {mixMode === value && <Icon.Check />}
                                        </button>
                                    ))}
                                </div>
                            </section>

                            <section className={cx('audio-menu-section')} aria-labelledby="audio-tools-title">
                                <div className={cx('audio-menu-section-header')}>
                                    <h3 id="audio-tools-title" className={cx('audio-menu-section-title')}>
                                        Audio Tools
                                    </h3>
                                    <Text as="p" variant="tertiary" size="xs">
                                        Tune output and stability.
                                    </Text>
                                </div>

                                <button
                                    type="button"
                                    className={cx('audio-action')}
                                    disabled={isStabilityModeEnabled}
                                    onClick={() => {
                                        setIsAudioMenuOpen(false);
                                        navigate('/equalizer');
                                    }}>
                                    <Icon.Settings />
                                    <span>
                                        <span className={cx('audio-option-label')}>Open Equalizer</span>
                                        <span className={cx('audio-option-description')}>
                                            {isStabilityModeEnabled
                                                ? 'Paused while stability mode is on'
                                                : 'Adjust frequency bands and presets'}
                                        </span>
                                    </span>
                                </button>

                                <button
                                    type="button"
                                    className={cx('audio-action')}
                                    onClick={() => {
                                        setIsAudioMenuOpen(false);
                                        navigate('/setting');
                                    }}>
                                    <Icon.Gear />
                                    <span>
                                        <span className={cx('audio-option-label')}>Playback Settings</span>
                                        <span className={cx('audio-option-description')}>
                                            Quality, stability mode, and queue behavior
                                        </span>
                                    </span>
                                </button>
                            </section>
                        </aside>
                    </div>
                )}

                {currentMusic ? (
                    <div className={cx('content')}>
                        <div className={cx('art-wrap')}>
                            <div className={cx('album-art', {
                                framed: isVisualizerEffect,
                                halo: playerEffectMode === 'ring'
                            })}>
                                {playerEffectMode === 'puffy' && (
                                    <MusicPlayerFluffyStyle
                                        isPlaying={isPlaying}
                                        src={coverImage}
                                        alt={currentMusic.album.name}
                                    />
                                )}

                                {playerEffectMode === 'disk' && (
                                    <MusicPlayerDiskStyle
                                        isPlaying={isPlaying}
                                        src={coverImage}
                                        alt={currentMusic.album.name}
                                    />
                                )}

                                {isVisualizerEffect && (
                                    <MusicPlayerVisualizerStyle
                                        type={playerEffectMode}
                                        isPlaying={isPlaying}
                                        src={coverImage}
                                        alt={currentMusic.album.name}
                                        accentColor={accentColor}
                                    />
                                )}
                            </div>
                        </div>

                        <div className={cx('title-block')}>
                            <Text
                                as="span"
                                variant="muted"
                                size="xs"
                                weight="medium"
                                className={cx('eyebrow')}>
                                Now playing
                            </Text>
                            <Text as="h1" size="2xl" weight="bold" className={cx('title')}>
                                {currentMusic.name}
                            </Text>

                            <Text
                                as="p"
                                variant="secondary"
                                size="md"
                                weight="medium"
                                className={cx('artist-name')}>
                                {currentMusic.artist.name}
                            </Text>

                            <div className={cx('album-line')}>
                                <Text as="span" variant="tertiary" size="sm" weight="medium">
                                    {currentMusic.album.name}
                                </Text>

                                {publishedYear && (
                                    <Text as="span" variant="muted" size="sm">
                                        {publishedYear}
                                    </Text>
                                )}
                            </div>
                        </div>

                        <div className={cx('progress-section')}>
                            <div
                                className={cx('progress')}
                                role="slider"
                                tabIndex={duration > 0 ? 0 : -1}
                                aria-label="Seek playback position"
                                aria-valuenow={Math.round(currentTime)}
                                aria-valuemin={0}
                                aria-valuemax={Math.round(duration)}
                                aria-valuetext={`${makePlayTime(currentTime)} of ${makePlayTime(duration)}`}
                                onClick={handleClickProgress}
                                onKeyDown={handleKeyDownProgress}
                                onMouseMove={handleMoveProgress}
                                onTouchMove={handleMoveProgress}>
                                <div
                                    className={cx('bar')}
                                    style={{ transform: `scaleX(${progress / 100})` }}
                                />
                                <div
                                    className={cx('thumb')}
                                    style={{ left: `${progress}%` }}
                                />
                            </div>
                            <div className={cx('time-info')}>
                                <Text variant="tertiary" size="sm">
                                    {makePlayTime(currentTime)}
                                </Text>
                                <Text variant="tertiary" size="sm">
                                    {makePlayTime(duration)}
                                </Text>
                            </div>
                        </div>

                        <div className={cx('controls')}>
                            <button
                                type="button"
                                className={cx('control-button', { active: shuffle })}
                                aria-label={shuffle ? 'Disable shuffle' : 'Enable shuffle'}
                                onClick={() => queueStore.toggleShuffle()}>
                                <Icon.Shuffle />
                            </button>

                            <button
                                type="button"
                                className={cx('control-button')}
                                aria-label="Previous track"
                                onClick={() => queueStore.prev()}>
                                <Icon.SkipBack />
                            </button>

                            <button
                                type="button"
                                className={cx('play-button')}
                                aria-label={isPlaying ? 'Pause playback' : 'Resume playback'}
                                onClick={() => isPlaying ? queueStore.pause() : queueStore.play()}>
                                {isPlaying ? <Icon.Pause /> : <Icon.Play />}
                            </button>

                            <button
                                type="button"
                                className={cx('control-button')}
                                aria-label="Next track"
                                onClick={() => queueStore.next()}>
                                <Icon.SkipForward />
                            </button>

                            <button
                                type="button"
                                className={cx('control-button')}
                                aria-label={`Repeat mode ${repeatMode}`}
                                onClick={() => queueStore.changeRepeatMode()}>
                                {repeatMode === 'all' && <Icon.Repeat />}
                                {repeatMode === 'one' && <Icon.Infinite />}
                                {repeatMode === 'none' && <Icon.RightLeft />}
                            </button>
                        </div>

                        <div className={cx('secondary-actions')}>
                            <button
                                type="button"
                                className={cx('secondary-action')}
                                onClick={() => navigate(`/artist/${currentMusic.artist.id}`)}>
                                <Icon.Music />
                                <span>Artist</span>
                            </button>
                            <button
                                type="button"
                                className={cx('secondary-action')}
                                onClick={() => navigate(`/album/${currentMusic.album.id}`)}>
                                <Icon.Disc />
                                <span>Album</span>
                            </button>
                            {queuePosition !== null && (
                                <button
                                    type="button"
                                    className={cx('secondary-action')}
                                    onClick={() => navigate('/queue')}>
                                    <Icon.ListMusic />
                                    <span>Queue {queuePosition}/{queueLength}</span>
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className={cx('empty-state')}>
                        <div className={cx('empty-icon')}>
                            <Icon.Music />
                        </div>

                        <div className={cx('empty-copy')}>
                            <Text as="h1" size="2xl" weight="bold">
                                Nothing is playing.
                            </Text>
                            <Text as="p" variant="secondary" size="md">
                                Start something from your library or queue to return here.
                            </Text>
                        </div>

                        <div className={cx('empty-actions')}>
                            <button
                                type="button"
                                className={cx('empty-button', 'empty-button-primary')}
                                onClick={() => navigate('/')}>
                                <Icon.Music />
                                <span>Open library</span>
                            </button>
                            <button
                                type="button"
                                className={cx('empty-button')}
                                onClick={() => navigate('/queue')}>
                                <Icon.ListMusic />
                                <span>Open queue</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
