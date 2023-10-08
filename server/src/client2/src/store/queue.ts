import Store from 'badland'
import { toast } from '@baejino/ui'

import { AudioChannel, WebAudioChannel } from '~/modules/audio-channel'

interface QueueStoreState {
    selected: number | null
    isPlaying: boolean
    shuffle: boolean
    insertMode: 'first' | 'last' | 'after'
    repeatMode: 'none' | 'one' | 'all'
    currentTime: number
    items: string[]
}

class QueueStore extends Store<QueueStoreState> {
    audioChannel: AudioChannel

    constructor() {
        super()
        this.state = {
            selected: null,
            isPlaying: false,
            shuffle: false,
            insertMode: 'last',
            repeatMode: 'none',
            currentTime: 0,
            items: []
        }

        this.audioChannel = new WebAudioChannel({
            onEnded: () => {
                if (this.state.selected === null) return

                if (this.state.repeatMode === 'one') {
                    this.audioChannel.load(this.state.items[this.state.selected])
                    this.audioChannel.play()
                    return
                }
                if (this.state.repeatMode === 'all') {
                    this.select((this.state.selected + 1) % this.state.items.length)
                    this.audioChannel.play()
                    return
                }
                if (this.state.repeatMode === 'none') {
                    if (this.state.selected + 1 < this.state.items.length) {
                        this.select(this.state.selected + 1)
                        this.audioChannel.play()
                    } else {
                        this.audioChannel.stop()
                        this.set({
                            isPlaying: false
                        })
                    }
                }
            },
            onTimeUpdate: (time) => {
                this.set({
                    currentTime: time
                })
            }
        })
    }

    add(id: string) {
        if (this.state.items.includes(id)) {
            toast("Already added to queue")
            return
        }
        if (this.state.insertMode === 'first') {
            this.set({
                items: [id, ...this.state.items]
            })
        }
        if (this.state.insertMode === 'last') {
            this.set({
                items: [...this.state.items, id]
            })
        }
        if (this.state.insertMode === 'after') {
            if (this.state.selected === null) {
                this.set({
                    items: [...this.state.items, id]
                })
            } else {
                this.set({
                    items: [
                        ...this.state.items.slice(0, this.state.selected + 1),
                        id,
                        ...this.state.items.slice(this.state.selected + 1)
                    ]
                })
            }
        }
        toast("Added to queue")
        if (this.state.selected === null) {
            this.audioChannel.load(id)
            this.set({
                selected: 0
            })
        }
    }

    remove(id: string) {
        this.set({
            items: this.state.items.filter((i) => i !== id)
        })
    }

    select(index: number) {
        this.set({
            selected: index
        })
        this.audioChannel.load(this.state.items[index])
    }

    play() {
        if (this.state.selected !== null) {
            this.audioChannel.play()
            this.set({
                isPlaying: true
            })
        }
    }

    pause() {
        this.audioChannel.pause()
        this.set({
            isPlaying: false
        })
    }

    stop() {
        this.audioChannel.stop()
    }

    seek(time: number) {
        this.audioChannel.seek(time)
    }

    changeRepeatMode() {
        if (this.state.repeatMode === 'none') {
            this.set({
                repeatMode: 'all'
            })
        } else if (this.state.repeatMode === 'all') {
            this.set({
                repeatMode: 'one'
            })
        } else if (this.state.repeatMode === 'one') {
            this.set({
                repeatMode: 'none'
            })
        }
    }

    next() {
        if (this.state.selected !== null) {
            this.select((this.state.selected + 1) % this.state.items.length)
            this.audioChannel.play()
        }
    }

    prev() {
        if (this.state.selected !== null) {
            if (this.state.currentTime > 10) {
                this.audioChannel.seek(0)
                return
            }
            this.select((this.state.selected - 1 + this.state.items.length) % this.state.items.length)
            this.audioChannel.play()
        }
    }
}

export const queueStore = new QueueStore()