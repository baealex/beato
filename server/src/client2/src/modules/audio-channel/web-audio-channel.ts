import { AudioChannel, AudioChannelEventHandler } from './audio-channel'

export class WebAudioChannel implements AudioChannel {
    private audio: HTMLAudioElement

    constructor({ onEnded, onTimeUpdate }: AudioChannelEventHandler) {
        this.audio = new Audio()

        this.audio.addEventListener('ended', () => {
            onEnded()
        })

        this.audio.addEventListener('timeupdate', () => {
            onTimeUpdate(this.audio.currentTime)
        })
    }

    load(id: string) {
        const audioResource = "/api/audio/" + id
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
}