import Store from 'badland';
import { confirm, toast } from '@baejino/ui';

import { musicStore } from './music';

import {
    type AudioChannel,
    type AudioChannelEventHandler,
    WebAudioChannel,
    AppAudioChannel
} from '~/modules/audio-channel';
import { MusicListener, PlaybackListener, socket } from '~/socket';
import { shuffle } from '~/modules/shuffle';

interface QueueStoreState {
    activeDeviceId: string | null;
    selected: number | null;
    isPlaying: boolean;
    shuffle: boolean;
    insertMode: 'first' | 'last' | 'after';
    repeatMode: 'none' | 'one' | 'all';
    playMode: 'later' | 'immediately';
    mixMode: 'none' | 'mix';
    currentTime: number;
    progress: number;
    items: string[];
    sourceItems: string[];
}

const getMusic = (id: string) => {
    const musicMap = musicStore.state.musicMap;
    return musicMap.get(id);
};

class QueueStore extends Store<QueueStoreState> {
    saveTimer: ReturnType<typeof setTimeout> | null = null;
    shouldCount = false;
    audioChannel: AudioChannel;
    syncingFromServer = false;
    playbackListener: PlaybackListener;

    constructor() {
        super();
        this.saveTimer = null;
        this.syncingFromServer = false;
        this.state = {
            activeDeviceId: null,
            selected: null,
            isPlaying: false,
            shuffle: false,
            insertMode: 'last',
            repeatMode: 'none',
            playMode: 'later',
            mixMode: 'none',
            currentTime: 0,
            progress: 0,
            items: [],
            sourceItems: []
        };

        const audioChannelEventHandler: AudioChannelEventHandler = {
            onPlay: () => {
                this.set({ isPlaying: true });
            },
            onPause: () => {
                this.set({ isPlaying: false });
            },
            onStop: () => {
                this.set({ isPlaying: false });
            },
            onEnded: () => {
                if (this.state.selected === null) return;

                if (this.state.repeatMode === 'one') {
                    this.select(this.state.selected);
                    return;
                }
                if (this.state.repeatMode === 'all') {
                    this.select((this.state.selected + 1) % this.state.items.length);
                    this.audioChannel.play();
                    return;
                }
                if (this.state.repeatMode === 'none') {
                    if (this.state.selected + 1 < this.state.items.length) {
                        this.select(this.state.selected + 1);
                        this.audioChannel.play();
                    } else {
                        this.audioChannel.stop();
                        this.set({ isPlaying: false });
                    }
                }
            },
            onTimeUpdate: (time, mix) => {
                const music = getMusic(this.state.items[this.state.selected!]);
                const progress = Number((time / (music?.duration || 1) * 100).toFixed(2));

                if (!this.shouldCount && Math.floor(progress) >= 0 && Math.floor(progress) < 10) {
                    this.shouldCount = true;
                }

                if (this.shouldCount && Math.floor(progress) >= 80 && Math.floor(progress) < 90) {
                    this.shouldCount = false;
                    MusicListener.count(this.state.items[this.state.selected!]);
                }

                if (this.state.mixMode === 'mix') {
                    mix(20, () => {
                        if (this.shouldCount) {
                            this.shouldCount = false;
                            MusicListener.count(this.state.items[this.state.selected!]);
                        }
                    });
                }

                this.set({
                    currentTime: time,
                    progress
                });
            },
            onSkipToNext: () => {
                this.next();
            },
            onSkipToPrevious: () => {
                this.prev();
            }
        };

        this.audioChannel = window.AppChannel
            ? new AppAudioChannel(audioChannelEventHandler)
            : new WebAudioChannel(audioChannelEventHandler);

        const key = musicStore.subscribe(async ({ loaded }) => {
            if (loaded) {
                const queue = localStorage.getItem('queue');
                if (queue) {
                    const nextState = JSON.parse(queue) as QueueStoreState;
                    await this.set(nextState);
                    this.select(nextState.selected || 0, false);
                }
                musicStore.unsubscribe(key);
            }
        });

        // PlaybackListener 초기화 및 연결
        this.playbackListener = new PlaybackListener();
        this.playbackListener.connect({
            onPlaybackStateSync: (state) => {
                this.syncingFromServer = true;

                // 서버로부터 받은 상태로 업데이트
                const isThisDeviceActive = state.activeDeviceId === socket.id;

                // 상태 업데이트
                this.set({
                    ...state,
                    // 활성 기기가 아니면 재생 중이더라도 일시정지 상태로 표시
                    isPlaying: isThisDeviceActive ? state.isPlaying : false
                });

                // 활성 기기인 경우에만 실제 오디오 재생/일시정지
                if (isThisDeviceActive) {
                    if (state.selected !== null && state.items.length > 0) {
                        const music = getMusic(state.items[state.selected]);
                        if (music) {
                            // 현재 재생 중인 곡이 다르면 로드
                            this.audioChannel.load(music);

                            // 재생 위치 동기화
                            if (state.currentTime > 0) {
                                this.audioChannel.seek(state.currentTime);
                            }

                            // 재생/일시정지 상태 동기화
                            if (state.isPlaying) {
                                this.audioChannel.play();
                            } else {
                                this.audioChannel.pause();
                            }
                        }
                    }
                } else {
                    // 활성 기기가 아니면 오디오 일시정지
                    this.audioChannel.pause();
                }

                this.syncingFromServer = false;
            }
        });

        window.addEventListener('beforeunload', () => {
            this.audioChannel.stop();
        });
    }

    async reset(ids: string[]) {
        if (this.state.items.length > 0 && !(await confirm('Are you sure to reset queue?'))) {
            return;
        }
        await this.set({
            items: ids,
            sourceItems: [],
            shuffle: false,
            selected: null,
            currentTime: 0,
            progress: 0,
            isPlaying: false
        });
        this.select(0);
    }

    async add(id: string) {
        if (this.state.items.includes(id)) {
            if (this.state.playMode === 'immediately') {
                this.select(this.state.items.indexOf(id));
                return;
            }
            toast('Already added to queue');
            return;
        }
        if (this.state.shuffle) {
            this.set({ sourceItems: [...this.state.items, id] });
        }
        if (this.state.insertMode === 'first') {
            this.set({ items: [id, ...this.state.items] });
        }
        if (this.state.insertMode === 'last') {
            this.set({ items: [...this.state.items, id] });
        }
        if (this.state.insertMode === 'after') {
            if (this.state.selected === null) {
                this.set({ items: [...this.state.items, id] });
            } else {
                this.set({
                    items: [
                        ...this.state.items.slice(0, this.state.selected + 1),
                        id,
                        ...this.state.items.slice(this.state.selected + 1)
                    ]
                });
            }
        }
        toast('Added to queue');
        if (this.state.playMode === 'immediately') {
            this.select(this.state.items.indexOf(id));
            return;
        }
        if (this.state.selected === null) {
            this.select(0);
        }
    }

    async removeItems(ids: string[]) {
        const newItems = this.state.items.filter((i) => !ids.includes(i));
        const newSourceItems = this.state.sourceItems.filter((i) => !ids.includes(i));

        const prevSelected = this.state.selected;
        const prevSelectedItem = newItems.length > 0
            ? this.state.items[prevSelected || 0]
            : null;

        await this.set({
            items: newItems,
            sourceItems: newSourceItems
        });

        if (newItems.length === 0) {
            this.audioChannel.stop();
            this.set({
                selected: null,
                currentTime: 0,
                progress: 0,
                isPlaying: false
            });
            return;
        }

        if (prevSelectedItem) {
            if (!ids.includes(prevSelectedItem)) {
                this.set({ selected: newItems.indexOf(prevSelectedItem) });
                return;
            }
            if (ids.includes(prevSelectedItem)) {
                if (this.state.items.length >= prevSelected!) {
                    this.select(prevSelected!);
                    return;
                }
                if (this.state.items.length < prevSelected!) {
                    this.select(this.state.items.length - 1);
                    return;
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
        });

        const music = getMusic(this.state.items[index]);
        if (music === undefined) return;

        document.title = `${music.name} - ${music.artist.name}`;

        this.audioChannel.load(music);
        if (play) {
            // 재생할 때 이 기기를 활성 기기로 설정
            PlaybackListener.requestPlaybackControl();
            this.audioChannel.play();
        }
    }

    play() {
        if (this.state.selected !== null) {
            // 재생을 시작할 때 이 기기를 활성 기기로 설정
            PlaybackListener.requestPlaybackControl();
            this.audioChannel.play();
        }
    }

    pause() {
        this.audioChannel.pause();
    }

    stop() {
        this.audioChannel.stop();
    }

    seek(time: number) {
        this.audioChannel.seek(time);
    }

    setPlayMode(mode: 'later' | 'immediately') {
        this.set({ playMode: mode });
    }

    setInsertMode(mode: 'first' | 'last' | 'after') {
        this.set({ insertMode: mode });
    }

    setMixMode(mode: 'none' | 'mix') {
        this.set({ mixMode: mode });
    }

    changeRepeatMode() {
        const repeatRotate = ['none', 'all', 'one'] as const;
        const current = repeatRotate.indexOf(this.state.repeatMode);
        const next = repeatRotate[(current + 1) % repeatRotate.length];
        this.set({ repeatMode: next });
    }

    toggleShuffle() {
        const selectedMusic = this.state.items[this.state.selected!];

        if (this.state.shuffle) {
            this.set({
                shuffle: false,
                selected: this.state.sourceItems.indexOf(selectedMusic),
                items: [...this.state.sourceItems],
                sourceItems: []
            });
            return;
        }

        const newItems = shuffle([...this.state.items]).filter((item) =>
            item !== selectedMusic
        );
        newItems.unshift(selectedMusic);

        this.set({
            shuffle: true,
            selected: 0,
            items: newItems,
            sourceItems: [...this.state.items]
        });
    }

    next() {
        if (this.state.selected !== null) {
            this.select((this.state.selected + 1) % this.state.items.length);
            this.audioChannel.play();
        }
    }

    prev() {
        if (this.state.selected !== null) {
            if (this.state.currentTime > 10) {
                this.audioChannel.seek(0);
                return;
            }
            this.select((this.state.selected - 1 + this.state.items.length) % this.state.items.length);
            this.audioChannel.play();
        }
    }

    download(id: string) {
        this.audioChannel.download(getMusic(id)!);
    }

    afterStateChange() {
        if (this.saveTimer) {
            return;
        }

        this.saveTimer = setTimeout(() => {
            localStorage.setItem('queue', JSON.stringify({
                ...this.state,
                isPlaying: false,
                currentTime: 0,
                progress: 0
            }));
            this.saveTimer = null;
        }, 3000);

        // 서버로부터 받은 상태 동기화 중이 아닐 때만 서버에 상태 전송
        if (!this.syncingFromServer) {
            PlaybackListener.updatePlaybackState(this.state);
        }
    }
}

export const queueStore = new QueueStore();
