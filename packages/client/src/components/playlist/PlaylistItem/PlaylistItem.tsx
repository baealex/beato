import { useAppStore as useStore } from '~/store/base-store';

import GridImage from '../../shared/GridImage';
import { IconButton } from '~/components/shared';
import { VerticalDots } from '~/icon';

import type { Music } from '~/models/type';

import { musicStore } from '~/store/music';

interface PlaylistItemProps {
    name: string;
    headerMusics: Pick<Music, 'id'>[];
    musicCount: number;
    onClick?: () => void;
    onLongPress?: () => void;
}

export default function PlaylistItem({
    name,
    headerMusics,
    musicCount,
    onClick,
    onLongPress
}: PlaylistItemProps) {
    const [{ musicMap }] = useStore(musicStore);

    return (
        <div className={'ow-playlist-item-PlaylistItem'}>
            <button
                type="button"
                className={'ow-playlist-item-mainButton'}
                onClick={onClick}
                onContextMenu={(e) => {
                    e.preventDefault();
                    onLongPress?.();
                }}>
                <span className={'ow-playlist-item-coverStack'}>
                    <span className={'ow-playlist-item-coverBack'} aria-hidden="true" />
                    <GridImage
                        className={'ow-playlist-item-cover'}
                        images={headerMusics.map((music) => musicMap.get(music.id)?.album.cover ?? '')}
                    />
                </span>
                <div className={'ow-playlist-item-title'}>
                    <div className={'ow-playlist-item-name'}>{name}</div>
                    <div className={'ow-playlist-item-count'}>{musicCount} songs</div>
                </div>
            </button>
            {onLongPress && (
                <IconButton
                    aria-label={`Open actions for ${name}`}
                    className={'ow-playlist-item-icon-button'}
                    onClick={(e) => {
                        e.stopPropagation();
                        onLongPress();
                    }}>
                    <VerticalDots />
                </IconButton>
            )}
        </div>
    );
}
