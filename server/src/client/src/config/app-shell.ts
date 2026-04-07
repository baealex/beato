import type { ComponentType, SVGProps } from 'react';

import {
    Disc,
    Gear,
    Heart,
    ListMusic,
    Music,
    User
} from '~/icon';

type NavigationIcon = ComponentType<SVGProps<SVGSVGElement>>;

export interface AppShellNavigationItem {
    id: string;
    label: string;
    path: string;
    icon: NavigationIcon;
}

export const APP_BRAND_NAME = 'Ocean Wave';

export const appShell = {
    brand: { name: APP_BRAND_NAME },
    navigation: {
        primary: [
            {
                id: 'library',
                label: 'Library',
                path: '/',
                icon: Music
            },
            {
                id: 'favorites',
                label: 'Favorites',
                path: '/favorite',
                icon: Heart
            },
            {
                id: 'albums',
                label: 'Albums',
                path: '/album',
                icon: Disc
            },
            {
                id: 'artists',
                label: 'Artists',
                path: '/artist',
                icon: User
            },
            {
                id: 'playlists',
                label: 'Playlists',
                path: '/playlist',
                icon: ListMusic
            }
        ] satisfies AppShellNavigationItem[],
        utility: [
            {
                id: 'settings',
                label: 'Settings',
                path: '/setting',
                icon: Gear
            }
        ] satisfies AppShellNavigationItem[]
    }
};
