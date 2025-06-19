import { webAudioContext } from '../web-audio-context';
import type { AudioChannel, AudioChannelEventHandler } from './audio-channel';
import type { Music } from '~/models/type';

import { audioSettingsStore } from '~/store/audio-settings';

export class WebAudioChannel implements AudioChannel {
    private audio: HTMLAudioElement;
    private backgroundAudio: HTMLAudioElement;
    private handler: AudioChannelEventHandler;
    private mixInterval: ReturnType<typeof setInterval> | null;

    constructor(_handler: AudioChannelEventHandler) {
        this.audio = new Audio();
        this.backgroundAudio = new Audio();
        this.mixInterval = null;
        this.handler = {
            onPlay: () => _handler.onPlay?.(),
            onPause: () => _handler.onPause?.(),
            onStop: () => _handler.onStop?.(),
            onEnded: () => _handler.onEnded(),
            onTimeUpdate: () => {
                _handler.onTimeUpdate(this.audio.currentTime, (fadeTime: number, onMix: () => void) => {
                    const shouldMix = this.audio.duration - this.audio.currentTime <= fadeTime;

                    if (!this.mixInterval && shouldMix) {
                        onMix();

                        this.swapAudio();
                        this.setNewAudio();

                        this.audio.volume = 0;
                        this.backgroundAudio.volume = 1;

                        this.mixInterval = setInterval(() => {
                            this.audio.volume = Math.round((this.audio.volume + 0.1) * 10) / 10;
                            this.backgroundAudio.volume = Math.round((this.backgroundAudio.volume - 0.1) * 10) / 10;

                            if (this.audio.volume >= 1) {
                                this.audio.volume = 1;
                                this.backgroundAudio.volume = 0;
                                this.backgroundAudio.pause();
                                webAudioContext.disconnect(this.backgroundAudio);
                                clearInterval(this.mixInterval!);
                                this.mixInterval = null;
                            }
                        }, fadeTime * 1000 / 10);
                        _handler.onEnded();
                    }
                });
            }
        };

        this.setNewAudio();
    }

    setNewAudio() {
        this.audio = new Audio();
        this.audio.addEventListener('play', this.handler.onPlay!);
        this.audio.addEventListener('pause', this.handler.onPause!);
        this.audio.addEventListener('abort', this.handler.onStop!);
        this.audio.addEventListener('ended', this.handler.onEnded!);
        this.audio.addEventListener('timeupdate', this.handler.onTimeUpdate as () => void);
    }

    swapAudio() {
        const tempAudio = this.audio;
        tempAudio.removeEventListener('play', this.handler.onPlay!);
        tempAudio.removeEventListener('pause', this.handler.onPause!);
        tempAudio.removeEventListener('abort', this.handler.onStop!);
        tempAudio.removeEventListener('ended', this.handler.onEnded!);
        tempAudio.removeEventListener('timeupdate', this.handler.onTimeUpdate as () => void);
        this.backgroundAudio = tempAudio;
    }

    load(music: Music) {
        let audioResource: string;

        const { format, bitrate, useOriginal } = audioSettingsStore.state;

        if (useOriginal) {
            audioResource = `/api/audio/${music.id}?notranscode=true`;
        } else {
            audioResource = `/api/audio/${music.id}?format=${format}&bitrate=${bitrate}`;
        }

        this.audio.pause();
        this.audio.src = audioResource;
        this.audio.currentTime = 0;
        this.audio.load();
    }

    play() {
        if (!webAudioContext.initialized) {
            webAudioContext.init();
        }
        webAudioContext.connect(this.audio);
        this.audio.play();
    }

    pause() {
        this.audio.pause();
    }

    stop() {
        this.audio.pause();
        this.audio.currentTime = 0;
    }

    seek(time: number) {
        this.audio.currentTime = time;
    }

    download(music: Music) {
        const audioResource = `/api/audio/${music.id}?notranscode=true`;
        const a = document.createElement('a');
        a.href = audioResource;
        a.download = music.filePath.split('/').pop()!;
        a.click();
    }
}
