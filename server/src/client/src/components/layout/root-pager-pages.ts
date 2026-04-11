import type { ComponentType } from 'react';

import MusicList from '~/pages/MusicList';
import Favorite from '~/pages/Favorite';
import AlbumList from '~/pages/AlbumList';
import ArtistList from '~/pages/ArtistList';
import Playlist from '~/pages/Playlist';
import Setting from '~/pages/Setting';

export const ROOT_PAGER_PAGE_COMPONENTS: Record<string, ComponentType> = {
    '/': MusicList,
    '/favorite': Favorite,
    '/album': AlbumList,
    '/artist': ArtistList,
    '/playlist': Playlist,
    '/setting': Setting
};
