import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'

import { MusicListener, socket } from './socket'

import router from './router'

import { musicStore } from './store/music'
import { artistStore } from './store/artist'
import { albumStore } from './store/album'
import { Providers } from './components/app'

export default function App() {
    useEffect(() => {
        socket.connect()

        socket.on('resync', () => {
            musicStore.init = false
            artistStore.init = false
            albumStore.init = false
        })

        window.addEventListener('focus', () => {
            if (!socket.connected) {
                socket.connect()
                MusicListener.count()
            }
        })

        window.addEventListener('beforeunload', () => {
            socket.disconnect()
        })
    }, [])

    return (
        <Providers>
            <RouterProvider router={router} />
        </Providers>
    )
}
