import Store from 'badland'

interface QueueStoreState {
    selected: number | null
    items: string[]
}

class QueueStore extends Store<QueueStoreState> {
    constructor() {
        super()
        this.state = {
            selected: null,
            items: []
        }
    }

    add(id: string) {
        this.set((prevState) => ({
            selected: prevState.selected === null ? 0 : prevState.selected,
            items: [...this.state.items, id]
        }))
    }

    remove(id: string) {
        this.set({
            items: this.state.items.filter((i) => i !== id)
        })
    }
}

export const queueStore = new QueueStore()