import {
    useEffect,
    useState,
    type KeyboardEvent as ReactKeyboardEvent,
    type ReactNode
} from 'react';

import classNames from 'classnames';
const cx = classNames;

import { useNavigate } from 'react-router-dom';
import { useAppStore as useStore } from '~/store/base-store';

import {
    MusicPlayerDiskStyle,
    MusicPlayerVisualizerStyle
} from '~/components/music';
import { IconTextButton, Surface, Text } from '~/components/shared';
import * as Icon from '~/icon';

import { useBack, useStoreValue } from '~/hooks';

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

const PLAYER_PRIMARY_COLOR = {
    r: 30,
    g: 215,
    b: 96
} as const;

interface AudioMenuSectionProps {
    titleId: string;
    title: string;
    description: string;
    children: ReactNode;
}

const AudioMenuSection = ({
    titleId,
    title,
    description,
    children
}: AudioMenuSectionProps) => (
    <section className={cx('ow-player-audio-menu-section')} aria-labelledby={titleId}>
        <div className={cx('ow-player-audio-menu-section-header')}>
            <h3 id={titleId} className={cx('ow-player-audio-menu-section-title')}>
                {title}
            </h3>
            <Text as="p" variant="tertiary" size="xs">
                {description}
            </Text>
        </div>

        {children}
    </section>
);

interface AudioMenuOptionProps {
    label: string;
    description: ReactNode;
    active?: boolean;
    disabled?: boolean;
    leadingIcon?: ReactNode;
    onClick: () => void;
    pressed?: boolean;
    variant?: 'option' | 'action';
}

const AudioMenuOption = ({
    label,
    description,
    active = false,
    disabled = false,
    leadingIcon,
    onClick,
    pressed,
    variant = 'option'
}: AudioMenuOptionProps) => (
    <button
        type="button"
        className={cx(
            variant === 'action'
                ? 'ow-player-audio-action'
                : 'ow-player-audio-option',
            {
                'ow-player-active': active,
                'ow-player-disabled': disabled
            }
        )}
        aria-pressed={pressed}
        disabled={disabled}
        onClick={onClick}>
        {leadingIcon}
        <span className={cx('ow-player-audio-option-copy')}>
            <span className={cx('ow-player-audio-option-label')}>{label}</span>
            <span className={cx('ow-player-audio-option-description')}>{description}</span>
        </span>
        {variant === 'option' && active && <Icon.Check />}
    </button>
);

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

    const playerEffectMode = playerVisualizerMode;
    const isVisualizerEffect = playerEffectMode !== 'disk';

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
        <div className={cx('ow-player-Player', { 'ow-player-immersive': Boolean(currentMusic) })}>
            {currentMusic && <div className={cx('ow-player-ambient-background')} aria-hidden="true" />}

            <div className={cx('ow-player-container')}>
                <div className={cx('ow-player-top-bar')}>
                    <button
                        type="button"
                        className={cx('ow-player-utility-button')}
                        aria-label="Go back"
                        onClick={back}>
                        <Icon.ChevronLeft />
                    </button>

                    {currentMusic && (
                        <button
                            type="button"
                            className={cx('ow-player-utility-button', 'ow-player-audio-menu-trigger', { 'ow-player-active': isAudioMenuOpen })}
                            aria-label="Open audio menu"
                            aria-haspopup="dialog"
                            aria-expanded={isAudioMenuOpen}
                            onClick={() => setIsAudioMenuOpen(true)}>
                            <Icon.Menu />
                        </button>
                    )}
                </div>

                {currentMusic && isAudioMenuOpen && (
                    <div className={cx('ow-player-audio-menu-layer')}>
                        <button
                            type="button"
                            className={cx('ow-player-audio-menu-backdrop')}
                            aria-label="Close audio menu"
                            onClick={() => setIsAudioMenuOpen(false)}
                        />

                        <Surface
                            as="aside"
                            variant="panel"
                            radius="none"
                            className={cx('ow-player-audio-menu-panel')}
                            role="dialog"
                            aria-modal="true"
                            aria-label="Audio menu">
                            <header className={cx('ow-player-audio-menu-header')}>
                                <div>
                                    <Text as="h2" size="md" weight="semibold">
                                        Audio
                                    </Text>
                                    <Text as="p" variant="tertiary" size="xs">
                                        Visualizer and playback tools
                                    </Text>
                                </div>

                                <button
                                    type="button"
                                    className={cx('ow-player-utility-button', 'ow-player-audio-menu-close')}
                                    aria-label="Close audio menu"
                                    onClick={() => setIsAudioMenuOpen(false)}>
                                    <Icon.Close />
                                </button>
                            </header>

                            <AudioMenuSection
                                titleId="player-effects-title"
                                title="Player Effect"
                                description="Choose how the album art reacts.">
                                <div className={cx('ow-player-audio-option-list')} aria-label="Visualizer mode">
                                    {PLAYER_VISUALIZER_MODES.map(({ value, label, description }) => (
                                        <AudioMenuOption
                                            key={value}
                                            label={label}
                                            description={description}
                                            active={playerEffectMode === value}
                                            pressed={playerEffectMode === value}
                                            onClick={() => themeStore.setPlayerVisualizerMode(value)}
                                        />
                                    ))}
                                </div>
                            </AudioMenuSection>

                            <AudioMenuSection
                                titleId="transition-title"
                                title="Transition"
                                description="Control how tracks blend.">
                                <div className={cx('ow-player-audio-option-list')} aria-label="Transition effect">
                                    {MIX_MODES.map(({ value, label, description }) => (
                                        <AudioMenuOption
                                            key={value}
                                            label={label}
                                            description={description}
                                            active={mixMode === value}
                                            pressed={mixMode === value}
                                            onClick={() => queueStore.setMixMode(value)}
                                        />
                                    ))}
                                </div>
                            </AudioMenuSection>

                            <AudioMenuSection
                                titleId="audio-tools-title"
                                title="Audio Tools"
                                description="Tune output and playback.">
                                <AudioMenuOption
                                    variant="action"
                                    label="Open Equalizer"
                                    description="Adjust frequency bands and presets"
                                    leadingIcon={<Icon.Settings />}
                                    onClick={() => {
                                        setIsAudioMenuOpen(false);
                                        navigate('/equalizer');
                                    }}
                                />

                                <AudioMenuOption
                                    variant="action"
                                    label="Playback Settings"
                                    description="Quality and queue behavior"
                                    leadingIcon={<Icon.Gear />}
                                    onClick={() => {
                                        setIsAudioMenuOpen(false);
                                        navigate('/setting');
                                    }}
                                />
                            </AudioMenuSection>
                        </Surface>
                    </div>
                )}

                {currentMusic ? (
                    <div className={cx('ow-player-content')}>
                        <div className={cx('ow-player-art-wrap')}>
                            <div className={cx('ow-player-album-art', {
                                'ow-player-framed': isVisualizerEffect
                            })}>
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
                                        accentColor={PLAYER_PRIMARY_COLOR}
                                    />
                                )}
                            </div>
                        </div>

                        <div className={cx('ow-player-title-block')}>
                            <Text
                                as="span"
                                variant="muted"
                                size="xs"
                                weight="medium"
                                className={cx('ow-player-eyebrow')}>
                                Now playing
                            </Text>
                            <Text as="h1" size="2xl" weight="bold" className={cx('ow-player-title')}>
                                {currentMusic.name}
                            </Text>

                            <Text
                                as="p"
                                variant="secondary"
                                size="md"
                                weight="medium"
                                className={cx('ow-player-artist-name')}>
                                {currentMusic.artist.name}
                            </Text>

                            <div className={cx('ow-player-album-line')}>
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

                        <div className={cx('ow-player-progress-section')}>
                            <div
                                className={cx('ow-player-progress')}
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
                                    className={cx('ow-player-bar')}
                                    style={{ transform: `scaleX(${progress / 100})` }}
                                />
                                <div
                                    className={cx('ow-player-thumb')}
                                    style={{ left: `${progress}%` }}
                                />
                            </div>
                            <div className={cx('ow-player-time-info')}>
                                <Text variant="tertiary" size="sm">
                                    {makePlayTime(currentTime)}
                                </Text>
                                <Text variant="tertiary" size="sm">
                                    {makePlayTime(duration)}
                                </Text>
                            </div>
                        </div>

                        <div className={cx('ow-player-controls')}>
                            <button
                                type="button"
                                className={cx('ow-player-control-button', { 'ow-player-active': shuffle })}
                                aria-label={shuffle ? 'Disable shuffle' : 'Enable shuffle'}
                                onClick={() => queueStore.toggleShuffle()}>
                                <Icon.Shuffle />
                            </button>

                            <button
                                type="button"
                                className={cx('ow-player-control-button')}
                                aria-label="Previous track"
                                onClick={() => queueStore.prev()}>
                                <Icon.SkipBack />
                            </button>

                            <button
                                type="button"
                                className={cx('ow-player-play-button')}
                                aria-label={isPlaying ? 'Pause playback' : 'Resume playback'}
                                onClick={() => isPlaying ? queueStore.pause() : queueStore.play()}>
                                {isPlaying ? <Icon.Pause /> : <Icon.Play />}
                            </button>

                            <button
                                type="button"
                                className={cx('ow-player-control-button')}
                                aria-label="Next track"
                                onClick={() => queueStore.next()}>
                                <Icon.SkipForward />
                            </button>

                            <button
                                type="button"
                                className={cx('ow-player-control-button')}
                                aria-label={`Repeat mode ${repeatMode}`}
                                onClick={() => queueStore.changeRepeatMode()}>
                                {repeatMode === 'all' && <Icon.Repeat />}
                                {repeatMode === 'one' && <Icon.Infinite />}
                                {repeatMode === 'none' && <Icon.RightLeft />}
                            </button>
                        </div>

                        <div className={cx('ow-player-secondary-actions')}>
                            <IconTextButton
                                className={cx('ow-player-secondary-action')}
                                size="sm"
                                icon={<Icon.Music />}
                                label="Artist"
                                onClick={() => navigate(`/artist/${currentMusic.artist.id}`)}
                            />
                            <IconTextButton
                                className={cx('ow-player-secondary-action')}
                                size="sm"
                                icon={<Icon.Disc />}
                                label="Album"
                                onClick={() => navigate(`/album/${currentMusic.album.id}`)}
                            />
                            {queuePosition !== null && (
                                <IconTextButton
                                    className={cx('ow-player-secondary-action')}
                                    size="sm"
                                    icon={<Icon.ListMusic />}
                                    label={`Queue ${queuePosition}/${queueLength}`}
                                    onClick={() => navigate('/queue')}
                                />
                            )}
                        </div>
                    </div>
                ) : (
                    <Surface variant="panel" radius="2xl" padding="lg" className={cx('ow-player-empty-state')}>
                        <div className={cx('ow-player-empty-icon')}>
                            <Icon.Music />
                        </div>

                        <div className={cx('ow-player-empty-copy')}>
                            <Text as="h1" size="2xl" weight="bold">
                                Nothing is playing.
                            </Text>
                            <Text as="p" variant="secondary" size="md">
                                Start something from your library or queue to return here.
                            </Text>
                        </div>

                        <div className={cx('ow-player-empty-actions')}>
                            <IconTextButton
                                className={cx('ow-player-empty-button', 'ow-player-empty-button-primary')}
                                icon={<Icon.Music />}
                                label="Open library"
                                onClick={() => navigate('/')}
                            />
                            <IconTextButton
                                className={cx('ow-player-empty-button')}
                                icon={<Icon.ListMusic />}
                                label="Open queue"
                                onClick={() => navigate('/queue')}
                            />
                        </div>
                    </Surface>
                )}
            </div>
        </div>
    );
}
