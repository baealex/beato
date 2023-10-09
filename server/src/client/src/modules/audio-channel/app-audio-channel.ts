import type { AudioChannel, AudioChannelEventHandler } from './audio-channel'

import { getImage } from '~/modules/image'
import { convertToMillisecond, convertToSecond } from '~/modules/time'

import type { Music } from '~/models/type'

interface SetMediaItemAction {
    actionType: 'setMediaItem';
    mediaItem: {
        id: string;
        title: string;
        artist: string;
        album: string;
        duration: number;
        artUri: string;
    };
}

interface PlayAction {
    actionType: 'play';
}

interface PauseAction {
    actionType: 'pause';
}

interface StopAction {
    actionType: 'stop';
}

interface SeekAction {
    actionType: 'setPosition';
    position: number;
}

export const PostMessageWrapper = (
    action:
        | SetMediaItemAction
        | PlayAction
        | PauseAction
        | StopAction
        | SeekAction
) => {
    return JSON.stringify(action)
}

export class AppAudioChannel implements AudioChannel {
    constructor({
        onPlay,
        onPause,
        onStop,
        onEnded,
        onTimeUpdate,
        onSkipToNext,
        onSkipToPrevious,
    }: AudioChannelEventHandler) {
        window.AppChannel.receiveMessage = (message) => {
            if (message.actionType === 'play') {
                onPlay?.()
            }
            if (message.actionType === 'pause') {
                onPause?.()
            }
            if (message.actionType === 'stop') {
                onStop?.()
            }
            if (message.actionType === 'skipToNext') {
                onSkipToNext?.()
            }
            if (message.actionType === 'skipToPrevious') {
                onSkipToPrevious?.()
            }
            if (message.actionType === 'end') {
                onEnded()
            }
            if (message.actionType === 'setPosition') {
                onTimeUpdate(convertToSecond(message.position))
            }
        }
    }

    load(music: Music) {
        window.AppChannel.postMessage(
            PostMessageWrapper({
                actionType: 'setMediaItem',
                mediaItem: {
                    id: location.origin + '/api/audio/' + music.id,
                    album: music.album.name,
                    title: music.name,
                    artist: music.artist.name,
                    duration: convertToMillisecond(music.duration),
                    artUri: location.origin + getImage(music.album.cover),
                },
            })
        )
    }

    play() {
        window.AppChannel.postMessage(
            PostMessageWrapper({
                actionType: 'play',
            })
        )
    }

    pause() {
        window.AppChannel.postMessage(
            PostMessageWrapper({
                actionType: 'pause',
            })
        )
    }

    stop() {
        window.AppChannel.postMessage(
            PostMessageWrapper({
                actionType: 'stop',
            })
        )
    }

    seek(time: number) {
        window.AppChannel.postMessage(
            PostMessageWrapper({
                actionType: 'setPosition',
                position: convertToMillisecond(time),
            })
        )
    }
}