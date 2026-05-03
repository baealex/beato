import classNames from 'classnames';
const cx = classNames;

import { useAppStore as useStore } from '~/store/base-store';

import { GridImage, SummaryTitle } from '~/components/shared';

import type { Playlist } from '~/models/type';

import { musicStore } from '~/store/music';

type PlaylistSummaryProps = Pick<Playlist, 'name' | 'musics'>;

const PlaylistSummary = ({ musics, name }: PlaylistSummaryProps) => {
    const [{ musicMap }] = useStore(musicStore);

    return (
        <div className={cx('ow-playlist-summary-PlaylistSummary')}>
            <GridImage
                className={cx('ow-playlist-summary-cover')}
                images={(musics ?? []).slice(0, 16).map((music) => musicMap.get(music.id)?.album.cover ?? '')}
            />
            <SummaryTitle as="h1">
                {name}
            </SummaryTitle>
        </div>
    );
};

export default PlaylistSummary;
