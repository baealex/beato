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
                this.set({
                    playlists: this.state.playlists.map((playlist) => playlist.id === id ? {
                        ...playlist,
                        name
                    } : playlist)
                })
            },
            onChangeOrder: (ids) => {
                this.set({ playlists: this.state.playlists.sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id)) })
            },
            onAddMusic: ({ id, headerMusics }) => {
                this.set({
                    playlists: this.state.playlists.map((playlist) => playlist.id === id ? {
                        ...playlist,
                        headerMusics,
                        musicCount: playlist.musicCount + 1
                    } : playlist)
                })
            },
            onMoveMusic: ({ fromId, formHeaderMusics, toId, toHeaderMusics, toAddedMusicCount, musicIds }) => {
                this.set({
                    playlists: this.state.playlists.map((playlist) => {
                        if (playlist.id === fromId) {
                            return {
                                ...playlist,
                                headerMusics: formHeaderMusics,
                                musicCount: playlist.musicCount - musicIds.length
                            }
                        }
                        if (playlist.id === toId) {
                            return {
                                ...playlist,
                                headerMusics: toHeaderMusics,
                                musicCount: playlist.musicCount + toAddedMusicCount
                            }
                        }
                        return playlist
                    })
                })
            },
            onRemoveMusic: ({ id, headerMusics, musicIds }) => {
                this.set({
                    playlists: this.state.playlists.map((playlist) => playlist.id === id ? {
                        ...playlist,
                        headerMusics,
                        musicCount: playlist.musicCount - musicIds.length
                    } : playlist)
                })
            },
            onChangeMusicOrder: ({ id, headerMusics }) => {
                this.set({
                    playlists: this.state.playlists.map((playlist) => playlist.id === id ? {
                        ...playlist,
                        headerMusics,
                    } : playlist)
                })
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
