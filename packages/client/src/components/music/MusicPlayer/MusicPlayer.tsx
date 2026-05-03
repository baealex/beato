import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

import { Image } from '~/components/shared';
import { useStoreValue } from '~/hooks';
import * as Icon from '~/icon';
import { useAppStore as useStore } from '~/store/base-store';
import { musicStore } from '~/store/music';
import { queueStore } from '~/store/queue';

const controlButtonClassName = 'relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent text-[var(--b-color-text)] transition-[background-color,color,transform] duration-150 hover:bg-[var(--b-color-hover)] active:scale-95 [&_svg]:h-[1.125rem] [&_svg]:w-[1.125rem]';
const secondaryControlClassName = 'text-[var(--b-color-text-secondary)]';

const MusicPlayer = () => {
    const navigate = useNavigate();

    const [currentTrackId] = useStoreValue(queueStore, 'currentTrackId');
    const [progress] = useStoreValue(queueStore, 'progress');
    const [isPlaying] = useStoreValue(queueStore, 'isPlaying');
    const [repeatMode] = useStoreValue(queueStore, 'repeatMode');
    const [shuffle] = useStoreValue(queueStore, 'shuffle');
    const [{ musicMap }] = useStore(musicStore);

    const currentMusic = currentTrackId
        ? musicMap.get(currentTrackId)
        : null;

    // TODO: Fix type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleClickProgress = (e: any) => {
        const { width, left, right } = (e.currentTarget as HTMLDivElement).getBoundingClientRect();

        let x = e.touches ? e.touches[0].clientX : e.clientX;
        x = x < left ? left : x > right ? right : x;
        const percent = (x - left) / width;
        const duration = currentMusic?.duration || 1;

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

    return (
        <div className="lg:col-span-2">
            <div
                className="h-[3px] w-full cursor-pointer overflow-hidden bg-[var(--b-color-background)] transition-[height] duration-150 hover:h-[5px]"
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
                onClick={handleClickProgress}
                onMouseMove={handleMoveProgress}
                onTouchMove={handleMoveProgress}>
                <div
                    className="h-full w-full bg-[var(--b-color-point)]"
                    style={{ transform: `translateX(-${100 - progress}%)` }}
                />
            </div>
            <div className="flex items-center justify-between gap-[var(--b-spacing-md)] px-[var(--b-spacing-md)] py-[var(--b-spacing-sm)] lg:px-[var(--b-spacing-lg)]">
                <button
                    type="button"
                    className="flex min-w-0 flex-1 cursor-pointer items-center gap-[var(--b-spacing-sm)] border-0 bg-transparent p-0 text-left lg:gap-[var(--b-spacing-md)]"
                    onClick={() => currentMusic && navigate('/player')}>
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-[var(--b-radius-md)]">
                        <Image
                            className="h-full w-full object-cover"
                            src={currentMusic?.album.cover}
                            alt={currentMusic?.album.name ?? ''}
                            loading="eager"
                            icon={<Icon.Disc />}
                        />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                        <span className="truncate text-sm font-medium text-[var(--b-color-text)]">
                            {currentMusic?.name ?? 'No music'}
                        </span>
                        <span className="truncate text-xs text-[var(--b-color-text-tertiary)]">
                            {currentMusic?.artist.name ?? ''}
                        </span>
                    </div>
                </button>
                <div className="flex items-center gap-[var(--b-spacing-xs)]">
                    <button
                        type="button"
                        className={classNames(controlButtonClassName, secondaryControlClassName, 'max-[768px]:hidden')}
                        onClick={() => queueStore.changeRepeatMode()}>
                        {repeatMode === 'all' && <Icon.Repeat />}
                        {repeatMode === 'one' && <Icon.Infinite />}
                        {repeatMode === 'none' && <Icon.RightLeft />}
                    </button>
                    <button
                        type="button"
                        className={classNames(controlButtonClassName, secondaryControlClassName, 'max-[768px]:hidden')}
                        onClick={() => queueStore.prev()}>
                        <Icon.SkipBack />
                    </button>
                    <button
                        type="button"
                        className={classNames(controlButtonClassName, 'h-11 w-11 bg-[var(--b-color-point)] text-black hover:bg-[var(--b-color-point-dark)] [&_svg]:h-5 [&_svg]:w-5')}
                        onClick={() => isPlaying ? queueStore.pause() : queueStore.play()}>
                        {isPlaying ? <Icon.Pause /> : <Icon.Play />}
                    </button>
                    <button
                        type="button"
                        className={classNames(controlButtonClassName, secondaryControlClassName)}
                        onClick={() => queueStore.next()}>
                        <Icon.SkipForward />
                    </button>
                    <button
                        type="button"
                        className={classNames(controlButtonClassName, secondaryControlClassName, shuffle && 'text-[var(--b-color-point)]')}
                        onClick={() => queueStore.toggleShuffle()}>
                        <Icon.Shuffle />
                    </button>
                    <button
                        type="button"
                        className={classNames(controlButtonClassName, secondaryControlClassName, 'max-[768px]:hidden lg:flex')}
                        onClick={() => navigate('/queue')}>
                        <Icon.ListMusic />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MusicPlayer;
