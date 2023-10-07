import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

import {
    AlbumDetail,
    AlbumList,
    ArtistDetail,
    ArtistList,
    Favorite,
    MusicList,
    PlayerDetail,
    Playlist,
    Queue,
    QueueHistory,
    Setting,
} from './pages'
import { SiteLayout } from './components'

const client = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
        },
    },
})

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
                path: '/queue-history',
                element: <QueueHistory />,
            },
            {
                path: '/setting',
                element: <Setting />,
            },
        ],
    },
    {
        element: <SiteLayout isSubPage />,
        children: [
            {
                path: '/album/:id',
                element: <AlbumDetail />,
            },
            {
                path: '/artist/:id',
                element: <ArtistDetail />,
            },
        ],
    },
    {
        element: (
            <SiteLayout
                isSubPage
                disablePlayer
                animationDirection="BottomToTop"
            />
        ),
        children: [
            {
                path: '/player',
                element: <PlayerDetail />,
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
        element: <div>Page Not Found</div>,
        path: '*',
    },
])

export default function App() {
    return (
        <QueryClientProvider client={client}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    )
}
