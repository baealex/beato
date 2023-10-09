import Store from 'badland'
import { getAlbums } from '~/api'
import { Album } from '~/models/type'

interface AlbumStoreState {
    albums: Album[]
}

class AlbumStore extends Store<AlbumStoreState> {
    init = false

    constructor() {
        super()
        this.state = {
            albums: []
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
        getAlbums().then(({ data }) => {
            this.set({ albums: data.allAlbums })
        })
    }
}

export const albumStore = new AlbumStore()