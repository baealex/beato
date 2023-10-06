import Store from 'badland'
import { getArtists } from '~/api'
import { Artist } from '~/models/type'

interface ArtistStoreState {
    artists: Artist[]
}

class ArtistStore extends Store<ArtistStoreState> {
    init = false

    constructor() {
        super()
        this.state = {
            artists: []
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
        getArtists().then(({ data }) => {
            this.set({ artists: data.allArtists })
        })
    }
}

export const artistStore = new ArtistStore()