import { createBrowserRouter } from 'react-router-dom'

import {
    AlbumDetail,
    AlbumList,
    ArtistDetail,
    ArtistList,
    Favorite,
    MusicList,
    NotFound,
    Player,
    Playlist,
    PlaylistDetail,
    Queue,
    Setting,
} from './pages'
import { SiteLayout } from './components/layout'

const router = createBrowserRouter([
    {
        element: <SiteLayout />,
        children: [
            {
                path: '/',
                element: <MusicList />,
            },
            {
                path: '/favorite',
                element: <Favorite />,
            },
            {
                path: '/album',
                element: <AlbumList />,
            },
            {
                path: '/artist',
                element: <ArtistList />,
            },
            {
                path: '/playlist',
                element: <Playlist />,
            },
            {
                path: '/setting',
                element: <Setting />,
            },
        ],
    },
    {
        element: <SiteLayout isSubPage animationDirection="RightToLeft" />,
        children: [
            {
                path: '/album/:id',
                element: <AlbumDetail />,
            },
            {
                path: '/artist/:id',
                element: <ArtistDetail />,
            },
            {
                path: '/playlist/:id',
                element: <PlaylistDetail />,
            },
        ],
    },
    {
        children: [
            {
                path: '/player',
                element: <Player />,
            },
        ],
    },
    {
        children: [
            {
                path: '/queue',
                element: <Queue />,
            },
        ]
    },
    {
        element: <NotFound />,
        path: '*',
    },
])

export default router
