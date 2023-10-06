import Store from 'badland'
import { getMusics } from '~/api'
import { Music } from '~/models/type'

interface MusicState {
    musics: Music[]
    musicMap: Map<string, Music>
}

class MusicStore extends Store<MusicState> {
    init = false

    constructor() {
        super()
        this.state = {
            musics: [],
            musicMap: new Map(),
        }
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