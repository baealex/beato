import { eqStore } from '~/store/audioEq';
import type { AudioChannel, AudioChannelEventHandler } from './audio-channel';

import type { Music } from '~/models/type';

export class WebAudioChannel implements AudioChannel {
    private audio: HTMLAudioElement;
    private backgroundAudio: HTMLAudioElement;
    private handler: AudioChannelEventHandler;
    private mixInterval: ReturnType<typeof setInterval> | null;
    private audioContext: AudioContext;
    private audioSource: MediaElementAudioSourceNode | null;
    private audioFilters: {
        bass: BiquadFilterNode;
        lowMid: BiquadFilterNode;
        mid: BiquadFilterNode;
        highMid: BiquadFilterNode;
        treble: BiquadFilterNode;
    };

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
                                clearInterval(this.mixInterval!);
                                this.mixInterval = null;
                            }
                        }, fadeTime * 1000 / 10);
                        _handler.onEnded();
                    }
                });
            }
        };

        this.audioContext = new AudioContext();
        this.audioSource = null;
        this.audioFilters = {
            bass: this.audioContext.createBiquadFilter(),
            lowMid: this.audioContext.createBiquadFilter(),
            mid: this.audioContext.createBiquadFilter(),
            highMid: this.audioContext.createBiquadFilter(),
            treble: this.audioContext.createBiquadFilter()
        };
        this.createAudioEQ();

        eqStore.subscribe((state) => {
            this.audioFilters.bass.gain.setValueAtTime(state.bass, this.audioContext.currentTime);
            this.audioFilters.lowMid.gain.setValueAtTime(state.lowMid, this.audioContext.currentTime);
            this.audioFilters.mid.gain.setValueAtTime(state.mid, this.audioContext.currentTime);
            this.audioFilters.highMid.gain.setValueAtTime(state.highMid, this.audioContext.currentTime);
            this.audioFilters.treble.gain.setValueAtTime(state.treble, this.audioContext.currentTime);
        });

        this.setNewAudio();
    }

    setNewAudio() {
        this.audio = new Audio();
        this.audio.addEventListener('play', this.handler.onPlay!);
        this.audio.addEventListener('pause', this.handler.onPause!);
        this.audio.addEventListener('abort', this.handler.onStop!);
        this.audio.addEventListener('ended', this.handler.onEnded!);
        this.audio.addEventListener('timeupdate', this.handler.onTimeUpdate as () => void);
        this.connectAudioEQ();
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

    createAudioEQ() {
        this.audioFilters.bass.type = 'lowshelf';
        this.audioFilters.bass.frequency.setValueAtTime(60, this.audioContext.currentTime);
        this.audioFilters.lowMid.type = 'peaking';
        this.audioFilters.lowMid.frequency.setValueAtTime(250, this.audioContext.currentTime);
        this.audioFilters.mid.type = 'peaking';
        this.audioFilters.mid.frequency.setValueAtTime(1000, this.audioContext.currentTime);
        this.audioFilters.highMid.type = 'peaking';
        this.audioFilters.highMid.frequency.setValueAtTime(4000, this.audioContext.currentTime);
        this.audioFilters.treble.type = 'highshelf';
        this.audioFilters.treble.frequency.setValueAtTime(12000, this.audioContext.currentTime);
    }

    connectAudioEQ() {
        this.audioSource = this.audioContext.createMediaElementSource(this.audio);
        this.audioSource.connect(this.audioFilters.bass);
        this.audioFilters.bass.connect(this.audioFilters.lowMid);
        this.audioFilters.lowMid.connect(this.audioFilters.mid);
        this.audioFilters.mid.connect(this.audioFilters.highMid);
        this.audioFilters.highMid.connect(this.audioFilters.treble);
        this.audioFilters.treble.connect(this.audioContext.destination);
    }

    load(music: Music) {
        const audioResource = '/api/audio/' + music.id;
        this.audio.pause();
        this.audio.src = audioResource;
        this.audio.currentTime = 0;
        this.audio.load();
    }

    play() {
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
        const audioResource = '/api/audio/' + music.id;
        const a = document.createElement('a');
        a.href = audioResource;
        a.download = music.filePath.split('/').pop()!;
        a.click();
    }
}
