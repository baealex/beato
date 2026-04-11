import { createBrowserRouter } from 'react-router-dom';

import {
    AlbumDetail,
    ArtistDetail,
    Equalizer,
    NotFound,
    Player,
    PlaylistDetail,
    Queue
} from './pages';
import { SiteLayout } from './components/layout';

const router = createBrowserRouter([
    {
        element: <SiteLayout />,
        children: [
            { path: '/' },
            { path: '/favorite' },
            { path: '/album' },
            { path: '/artist' },
            { path: '/playlist' },
            { path: '/setting' },
            {
                path: '/album/:id',
                element: <AlbumDetail />
            },
            {
                path: '/artist/:id',
                element: <ArtistDetail />
            },
            {
                path: '/playlist/:id',
                element: <PlaylistDetail />
            },
            {
                path: '/equalizer',
                element: <Equalizer />
            },
            {
                path: '/player',
                element: <Player />
            },
            {
                path: '/queue',
                element: <Queue />
            }
        ]
    },
    {
        element: <NotFound />,
        path: '*'
    }
]);

export default router;
