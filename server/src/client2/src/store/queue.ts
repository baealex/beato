import Store from 'badland'
import { toast } from '@baejino/ui'

import { AudioChannel, AudioChannelEventHandler, WebAudioChannel } from '~/modules/audio-channel'
import { musicStore } from './music'
import { AppAudioChannel } from '~/modules/audio-channel/app-audio-channel'

interface QueueStoreState {
    selected: number | null
    isPlaying: boolean
    shuffle: boolean
    insertMode: 'first' | 'last' | 'after'
    repeatMode: 'none' | 'one' | 'all'
    currentTime: number
    progress: number
    items: string[]
}

const getMusic = (id: string) => {
    const musicMap = musicStore.state.musicMap
    return musicMap.get(id)
}

class QueueStore extends Store<QueueStoreState> {
    shouldCount: boolean
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
            progress: 0,
            items: []
        }
        this.shouldCount = false

        const audioChannelEventHandler: AudioChannelEventHandler = {
            onPlay: () => {
                this.set({ isPlaying: true })
            },
            onPause: () => {
                this.set({ isPlaying: false })
            },
            onStop: () => {
                this.set({ isPlaying: false })
            },
            onEnded: () => {
                if (this.state.selected === null) return

                if (this.state.repeatMode === 'one') {
                    this.select(this.state.selected)
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
                const music = getMusic(this.state.items[this.state.selected!])
                this.set({
                    currentTime: time,
                    progress: Number((this.state.currentTime / (music?.duration || 1) * 100).toFixed(2)),
                })
            },
            onSkipToNext: () => {
                this.next()
            },
            onSkipToPrevious: () => {
                this.prev()
            }
        }

        this.audioChannel = window.AppChannel
            ? new AppAudioChannel(audioChannelEventHandler)
            : new WebAudioChannel(audioChannelEventHandler)
    }

    add(id: string) {
        if (this.state.items.includes(id)) {
            toast('Already added to queue')
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
        toast('Added to queue')
        if (this.state.selected === null) {
            this.select(0)
        }
    }

    async removeItems(ids: string[]) {
        const newItems = this.state.items.filter((i) => !ids.includes(i))

        const prevSelected = this.state.selected
        const prevSelectedItem = newItems.length > 0
            ? this.state.items[prevSelected || 0]
            : null

        await this.set({
            items: this.state.items.filter((i) => !ids.includes(i))
        })

        if (prevSelectedItem) {
            if (!ids.includes(prevSelectedItem)) {
                this.set({
                    selected: newItems.indexOf(prevSelectedItem)
                })
                return
            }
            if (ids.includes(prevSelectedItem)) {
                if (this.state.items.length >= prevSelected!) {
                    this.select(prevSelected!)
                    return
                }
                if (this.state.items.length < prevSelected!) {
                    this.select(this.state.items.length - 1)
                    return
                }
            }
        }
    }

    select(index: number) {
        this.set({
            selected: index,
            currentTime: 0,
            isPlaying: true
        })

        const music = getMusic(this.state.items[index])
        if (music === undefined) return
        document.title = `${music.name} - ${music.artist.name}`
        this.audioChannel.load(music)
        this.audioChannel.play()
    }

    play() {
        if (this.state.selected !== null) {
            this.audioChannel.play()
        }
    }

    pause() {
        this.audioChannel.pause()
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