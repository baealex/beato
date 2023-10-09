import Store from 'badland'
import { getPlaylists } from '~/api'
import { Playlist } from '~/models/type'
import { PlaylistListener } from '~/socket'

interface PlaylistStoreState {
    playlists: Playlist[]
}

class PlaylistStore extends Store<PlaylistStoreState> {
    init = false
    listener: PlaylistListener

    constructor() {
        super()
        this.state = {
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
            onUpdate: (data) => {
                this.set({ playlists: this.state.playlists.map((playlist) => playlist.id === data.id ? data : playlist) })
            },
            onChangeOrder: (ids) => {
                this.set({ playlists: this.state.playlists.sort((a, b) => ids.indexOf(a.id.toString()) - ids.indexOf(b.id.toString())) })
            },
            onAddMusic: (data) => {
                this.set({ playlists: this.state.playlists.map((playlist) => playlist.id === data.id ? { ...playlist, musics: [...playlist.musics, data.music] } : playlist) })
            },
            onRemoveMusic: (data) => {
                this.set({ playlists: this.state.playlists.map((playlist) => playlist.id === data.id ? { ...playlist, musics: playlist.musics.filter((music) => !data.musicIds.includes(music.id)) } : playlist) })
            },
            onChangeMusicOrder: ({ id, musicIds }) => {
                console.log(111)
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
            this.set({ playlists: data.allPlaylist })
        })
    }
}

export const playlistStore = new PlaylistStore()