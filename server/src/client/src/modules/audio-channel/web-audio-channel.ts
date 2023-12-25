import type { AudioChannel, AudioChannelEventHandler } from './audio-channel'

import type { Music } from '~/models/type'

export class WebAudioChannel implements AudioChannel {
    private audio: HTMLAudioElement
    private subAudio: HTMLAudioElement
    private mixInterval: ReturnType<typeof setInterval> | null

    constructor({
        onPlay,
        onPause,
        onStop,
        onEnded,
        onTimeUpdate,
    }: AudioChannelEventHandler) {
        this.audio = new Audio()
        this.subAudio = new Audio()
        this.mixInterval = null

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
            onTimeUpdate(this.audio.currentTime, (fadeTime: number, onMix: () => void) => {
                const isSameAudio = this.subAudio.src == this.audio.src
                const shouldPrepare = this.audio.duration - this.audio.currentTime <= fadeTime + 5
                const shouldMix = this.audio.duration - this.audio.currentTime <= fadeTime

                if (!isSameAudio && shouldPrepare) {
                    this.subAudio.volume = 0
                    this.subAudio.src = this.audio.src
                    this.subAudio.currentTime = this.audio.currentTime
                    this.subAudio.play()
                }

                if (!this.mixInterval && shouldMix) {
                    onMix()

                    this.subAudio.currentTime = this.audio.currentTime
                    this.audio.volume = 0
                    this.subAudio.volume = 1

                    this.mixInterval = setInterval(() => {
                        this.audio.volume = Math.round((this.audio.volume + 0.1) * 10) / 10
                        this.subAudio.volume = Math.round((this.subAudio.volume - 0.1) * 10) / 10

                        if (this.audio.volume >= 1) {
                            this.audio.volume = 1
                            this.subAudio.volume = 0
                            this.subAudio.pause()
                            clearInterval(this.mixInterval!)
                            this.mixInterval = null
                        }
                    }, fadeTime * 1000 / 10)
                    onEnded()
                }
            })
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