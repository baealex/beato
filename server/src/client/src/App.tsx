import { useEffect } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import {
    AlbumDetail,
    AlbumList,
    ArtistDetail,
    ArtistList,
    Favorite,
    MusicList,
    PlayerDetail,
    Playlist,
    PlaylistDetail,
    Queue,
    Setting,
} from './pages'
import { PanelProvider, SiteLayout } from './components'

import { socket } from './socket'

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
    useEffect(() => {
        window.addEventListener('focus', () => {
            if (!socket.connected) {
                socket.connect()
            }
        })

        window.addEventListener('beforeunload', () => {
            socket.disconnect()
        })
    }, [])
    return (
        <PanelProvider>
            <QueryClientProvider client={client}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </PanelProvider>
    )
}
