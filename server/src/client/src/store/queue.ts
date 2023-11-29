import Store from 'badland'
import { confirm, toast } from '@baejino/ui'

import { musicStore } from './music'

import {
    type AudioChannel,
    type AudioChannelEventHandler,
    WebAudioChannel,
    AppAudioChannel
} from '~/modules/audio-channel'
import { MusicListener } from '~/socket'
import { shuffle } from '~/modules/shuffle'

interface QueueStoreState {
    selected: number | null
    isPlaying: boolean
    shuffle: boolean
    insertMode: 'first' | 'last' | 'after'
    repeatMode: 'none' | 'one' | 'all'
    playMode: 'later' | 'immediately'
    currentTime: number
    progress: number
    items: string[]
    sourceItems: string[]
}

let saveTimer: ReturnType<typeof setTimeout> | null = null

const getMusic = (id: string) => {
    const musicMap = musicStore.state.musicMap
    return musicMap.get(id)
}

class QueueStore extends Store<QueueStoreState> {
    shouldCount = false
    audioChannel: AudioChannel

    constructor() {
        super()
        this.state = {
            selected: null,
            isPlaying: false,
            shuffle: false,
            insertMode: 'last',
            repeatMode: 'none',
            playMode: 'later',
            currentTime: 0,
            progress: 0,
            items: [],
            sourceItems: [],
        }

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
                        this.set({ isPlaying: false })
                    }
                }
            },
            onTimeUpdate: (time) => {
                const music = getMusic(this.state.items[this.state.selected!])
                const progress = Number((time / (music?.duration || 1) * 100).toFixed(2))

                if (!this.shouldCount && Math.floor(progress) >= 0 && Math.floor(progress) < 10) {
                    this.shouldCount = true
                }

                if (this.shouldCount && Math.floor(progress) >= 80 && Math.floor(progress) < 90) {
                    this.shouldCount = false
                    MusicListener.count(this.state.items[this.state.selected!])
                }

                this.set({
                    currentTime: time,
                    progress,
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

        const key = musicStore.subscribe(async ({ loaded }) => {
            if (loaded) {
                const queue = localStorage.getItem('queue')
                if (queue) {
                    const nextState = JSON.parse(queue) as QueueStoreState
                    await this.set(nextState)
                    this.select(nextState.selected || 0, false)
                }
                musicStore.unsubscribe(key)
            }
        })

        window.addEventListener('beforeunload', () => {
            this.audioChannel.stop()
        })
    }

    async reset(ids: string[]) {
        if (this.state.items.length > 0 && !(await confirm('Are you sure to reset queue?'))) {
            return
        }
        await this.set({
            items: ids,
            sourceItems: [],
            shuffle: false,
            selected: null,
            currentTime: 0,
            progress: 0,
            isPlaying: false
        })
        this.select(0)
    }

    async add(id: string) {
        if (this.state.items.includes(id)) {
            if (this.state.playMode === 'immediately') {
                this.select(this.state.items.indexOf(id))
                return
            }
            toast('Already added to queue')
            return
        }
        if (this.state.shuffle) {
            this.set({
                sourceItems: [...this.state.items, id]
            })
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
        if (this.state.playMode === 'immediately') {
            this.select(this.state.items.indexOf(id))
            return
        }
        if (this.state.selected === null) {
            this.select(0)
        }
    }

    async removeItems(ids: string[]) {
        const newItems = this.state.items.filter((i) => !ids.includes(i))
        const newSourceItems = this.state.sourceItems.filter((i) => !ids.includes(i))

        const prevSelected = this.state.selected
        const prevSelectedItem = newItems.length > 0
            ? this.state.items[prevSelected || 0]
            : null

        await this.set({
            items: newItems,
            sourceItems: newSourceItems
        })

        if (newItems.length === 0) {
            this.audioChannel.stop()
            this.set({
                selected: null,
                currentTime: 0,
                progress: 0,
                isPlaying: false
            })
            return
        }

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

    select(index: number, play = true) {
        this.set({
            selected: index,
            progress: 0,
            currentTime: 0,
            isPlaying: play
        })

        const music = getMusic(this.state.items[index])
        if (music === undefined) return

        document.title = `${music.name} - ${music.artist.name}`

        this.audioChannel.load(music)
        play && this.audioChannel.play()
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

    setPlayMode(mode: 'later' | 'immediately') {
        this.set({ playMode: mode })
    }

    setInsertMode(mode: 'first' | 'last' | 'after') {
        this.set({ insertMode: mode })
    }

    changeRepeatMode() {
        const repeatRotate = ['none', 'all', 'one'] as const
        const current = repeatRotate.indexOf(this.state.repeatMode)
        const next = repeatRotate[(current + 1) % repeatRotate.length]
        this.set({ repeatMode: next })
    }

    toggleShuffle() {
        const selectedMusic = this.state.items[this.state.selected!]

        if (this.state.shuffle) {
            this.set({
                shuffle: false,
                selected: this.state.sourceItems.indexOf(selectedMusic),
                items: [...this.state.sourceItems],
                sourceItems: []
            })
            return
        }

        const newItems = shuffle([...this.state.items]).filter((item) =>
            item !== selectedMusic
        )
        newItems.unshift(selectedMusic)

        this.set({
            shuffle: true,
            selected: 0,
            items: newItems,
            sourceItems: [...this.state.items],
        })
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

    download(id: string) {
        this.audioChannel.download(getMusic(id)!)
    }

    afterStateChange() {
        if (saveTimer) {
            return
        }

        saveTimer = setTimeout(() => {
            localStorage.setItem('queue', JSON.stringify({
                ...this.state,
                isPlaying: false,
                currentTime: 0,
                progress: 0
            }))
            saveTimer = null
        }, 3000)
    }
}

export const queueStore = new QueueStore()