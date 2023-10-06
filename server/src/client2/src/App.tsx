import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query';

import Home from '~/pages/Home'
import { SiteHeader } from './components';

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
                element: <Home />,
            },
            {
                path: '/favorite',
                element: <Home />,
            },
            {
                path: '/album',
                element: <Home />,
            },
            {
                path: '/artist',
                element: <Home />,
            },
            {
                path: '/playlist',
                element: <Home />,
            },
            {
                path: '/queue-history',
                element: <Home />,
            },
            {
                path: '/setting',
                element: <Home />,
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
