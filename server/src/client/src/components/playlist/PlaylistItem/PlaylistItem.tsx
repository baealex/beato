import styles from './PlaylistItem.module.scss';
import { useStore } from 'badland-react';

import GridImage from '../../shared/GridImage';
import { MoreVerticalFill } from '~/icon';

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
        <div
            className={`${styles.PlaylistItem} clickable`}
            onClick={onClick}
            onContextMenu={(e) => {
                e.preventDefault();
                onLongPress?.();
            }}>
            <GridImage
                className={styles.cover}
                images={headerMusics.map((music) => musicMap.get(music.id)?.album.cover ?? '')}
            />
            <div className={styles.title}>
                <div>{name}</div>
                <div className={styles.count}>{musicCount} songs</div>
            </div>
            {onLongPress && (
                <button
                    className={styles['icon-button']}
                    onClick={(e) => {
                        e.stopPropagation();
                        onLongPress();
                    }}>
                    <MoreVerticalFill style={{ width: '16px' }} />
                </button>
            )}
        </div>
    );
}
