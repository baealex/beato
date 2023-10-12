import Store from 'badland'
import { getPlaylists } from '~/api'
import { Playlist } from '~/models/type'
import { PlaylistListener } from '~/socket'

interface PlaylistStoreState {
    loaded: boolean
    playlists: Playlist[]
}

class PlaylistStore extends Store<PlaylistStoreState> {
    init = false
    listener: PlaylistListener

    constructor() {
        super()
        this.state = {
            loaded: false,
            playlists: []
        }
        this.listener = new PlaylistListener()
        this.listener.connect({
            onCreate: (playlist) => {
                this.set({ playlists: [playlist, ...this.state.playlists] })
            },
            onDelete: (id) => {
                this.set({ playlists: this.state.playlists.filter((playlist) => playlist.id !== id) })
            },
            onUpdate: ({ id, name }) => {
                this.set({ playlists: this.state.playlists.map((playlist) => playlist.id === id ? { ...playlist, name } : playlist) })
            },
            onChangeOrder: (ids) => {
                this.set({ playlists: this.state.playlists.sort((a, b) => ids.indexOf(a.id.toString()) - ids.indexOf(b.id.toString())) })
            },
            onAddMusic: (data) => {
                this.set({ playlists: this.state.playlists.map((playlist) => playlist.id === data.id ? { ...playlist, ...data, musicCount: playlist.musicCount + 1 } : playlist) })
            },
            onRemoveMusic: (data) => {
                this.set({ playlists: this.state.playlists.map((playlist) => playlist.id === data.id ? { ...playlist, ...data, musicCount: playlist.musicCount - data.musicIds.length } : playlist) })
            },
            onChangeMusicOrder: ({ id, musicIds }) => {
                this.set({ playlists: this.state.playlists.map((playlist) => playlist.id === id ? { ...playlist, musics: playlist.headerMusics.sort((a, b) => musicIds.indexOf(a.id.toString()) - musicIds.indexOf(b.id.toString())) } : playlist) })
            },
        })
    }

    get state() {
        if (!this.init) {
            this.init = true
            this.sync()
        }
        return super.state
    }

    set state(state) {
        super.state = state
    }

    async sync() {
        getPlaylists().then(({ data }) => {
            this.set({
                loaded: true,
                playlists: data.allPlaylist
            })
        })
    }
}

export const playlistStore = new PlaylistStore()
