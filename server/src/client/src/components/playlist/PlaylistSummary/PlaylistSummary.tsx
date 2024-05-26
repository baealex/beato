import styles from './PlaylistSummary.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

import { useStore } from 'badland-react';

import { GridImage, SummaryTitle } from '~/components/shared';

import type { Playlist } from '~/models/type';

import { musicStore } from '~/store/music';

type PlaylistSummaryProps = Pick<Playlist, 'name' | 'musics'>;

const PlaylistSummary = ({ musics, name }: PlaylistSummaryProps) => {
    const [{ musicMap }] = useStore(musicStore);

    return (
        <div className={cx('PlaylistSummary')}>
            <GridImage
                className={cx('cover')}
                images={musics.slice(0, 16).map((music) => musicMap.get(music.id)?.album.cover ?? '')}
            />
            <SummaryTitle as="h1">
                {name}
            </SummaryTitle>
        </div>
    );
};

export default PlaylistSummary;
