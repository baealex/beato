import type { AudioChannel, AudioChannelEventHandler } from './audio-channel'

import type { Music } from '~/models/type'

export class WebAudioChannel implements AudioChannel {
    private audio: HTMLAudioElement

    constructor({
        onPlay,
        onPause,
        onStop,
        onEnded,
        onTimeUpdate,
    }: AudioChannelEventHandler) {
        this.audio = new Audio()

        this.audio.addEventListener('play', () => {
            onPlay?.()
        })
        this.audio.addEventListener('pause', () => {
            onPause?.()
        })
        this.audio.addEventListener('abort', () => {
            onStop?.()
        })
        this.audio.addEventListener('ended', () => {
            onEnded()
        })
        this.audio.addEventListener('timeupdate', () => {
            onTimeUpdate(this.audio.currentTime)
        })
    }

    load(music: Music) {
        const audioResource = '/api/audio/' + music.id
        this.audio.pause()
        this.audio.src = audioResource
        this.audio.currentTime = 0
        this.audio.load()
    }

    play() {
        this.audio.play()
    }

    pause() {
        this.audio.pause()
    }

    stop() {
        this.audio.pause()
        this.audio.currentTime = 0
    }

    seek(time: number) {
        this.audio.currentTime = time
    }

    download(music: Music) {
        const audioResource = '/api/audio/' + music.id
        const a = document.createElement('a')
        a.href = audioResource
        a.download = music.filePath.split('/').pop()!
        a.click()
    }
}