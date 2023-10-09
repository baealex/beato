import Store from 'badland'
import { getMusics } from '~/api'
import { Music } from '~/models/type'
import { MusicListener } from '~/socket'

interface MusicStoreState {
    musics: Music[]
    musicMap: Map<string, Music>
}

class MusicStore extends Store<MusicStoreState> {
    init = false
    listener: MusicListener

    constructor() {
        super()
        this.state = {
            musics: [],
            musicMap: new Map(),
        }
        this.listener = new MusicListener()
        this.listener.connect({
            onLike: ({ id, isLiked }) => {
                this.set({
                    musics: this.state.musics.map((music) => {
                        if (music.id === id) {
                            music.isLiked = isLiked
                        }
                        return music
                    }),
                })
            },
            onCount: ({ id, playCount }) => {
                this.set({
                    musics: this.state.musics.map((music) => {
                        if (music.id === id) {
                            music.playCount = playCount
                        }
                        return music
                    }).sort((a, b) => b.playCount - a.playCount)
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
        getMusics().then(({ data }) => {
            this.set({
                musics: data.allMusics,
                musicMap: new Map(data.allMusics.map(music => [music.id, music]))
            })
        })
    }
}

export const musicStore = new MusicStore()