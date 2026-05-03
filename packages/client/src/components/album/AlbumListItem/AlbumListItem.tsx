import classNames from 'classnames';
const cx = classNames;

import { AlbumArtwork } from '~/components/shared';

interface AlbumListItemProps {
    albumCover: string;
    albumName: string;
    artistName: string;
    musicCount?: number;
    publishedYear?: string;
    onClick: () => void;
    compact?: boolean;
}

const metaPillClass = 'rounded-full border border-[var(--b-color-border-subtle)] bg-[var(--b-color-surface-subtle)] px-2 py-1 text-xs font-medium text-[var(--b-color-text-tertiary)]';

const AlbumListItem = ({
    albumCover,
    albumName,
    artistName,
    musicCount,
    publishedYear,
    onClick,
    compact = false
}: AlbumListItemProps) => {
    return (
        <button
            type="button"
            className={cx(
                compact
                    ? 'group/row relative grid min-h-[88px] w-full grid-cols-[78px_minmax(0,1fr)] items-center gap-3 px-2 py-2 text-left text-[var(--b-color-text)] transition-colors'
                    : 'group/row relative grid h-full w-full grid-cols-[78px_minmax(0,1fr)_auto] items-center gap-4 px-6 py-2 text-left text-[var(--b-color-text)] transition-colors',
                'hover:bg-[image:var(--b-gradient-row-hover)] active:bg-[var(--b-color-active)] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--b-color-focus)]',
                'max-sm:grid-cols-[78px_minmax(0,1fr)]'
            )}
            onClick={onClick}>
            <AlbumArtwork src={albumCover} alt={albumName} />
            <div className="flex min-w-0 flex-col gap-1">
                <span className="truncate text-sm font-medium">{albumName}</span>
                <span className="truncate text-xs text-[var(--b-color-text-tertiary)]">{artistName}</span>
            </div>
            <div className={cx('flex items-center justify-end gap-1 whitespace-nowrap max-sm:hidden', { hidden: compact })}>
                {publishedYear && <span className={metaPillClass}>{publishedYear}</span>}
                {typeof musicCount === 'number' && <span className={metaPillClass}>{musicCount} tracks</span>}
            </div>
        </button>
    );
};

export default AlbumListItem;
