import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

import {
    AlbumDetail,
    AlbumList,
    ArtistDetail,
    ArtistList,
    Favorite,
    MusicList,
    Playlist,
    Queue,
    Setting,
} from './pages'
import { SiteHeader } from './components'

const client = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
        },
    },
})

const SiteLayout = () => {
    return (
        <main>
            <SiteHeader />
            <div className="container">
                <Outlet />
            </div>
        </main>
    )
}

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
                path: '/album/:id',
                element: <AlbumDetail />,
            },
            {
                path: '/album',
                element: <AlbumList />,
            },
            {
                path: '/artist/:id',
                element: <ArtistDetail />,
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
                element: <Queue />,
            },
            {
                path: '/setting',
                element: <Setting />,
            },
        ],
    }
])

function App() {
    return (
        <QueryClientProvider client={client}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    )
}

export default App
