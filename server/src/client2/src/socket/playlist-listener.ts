import { socket } from './socket'
import { Listener } from './listener'

import type { Music, Playlist } from '../models/type'

export const PLAYLIST_CREATE = 'playlist-create'
export const PLAYLIST_DELETE = 'playlist-delete'
export const PLAYLIST_UPDATE = 'playlist-update'
export const PLAYLIST_CHANGE_ORDER = 'playlist-change-order'
export const PLAYLIST_ADD_MUSIC = 'playlist-add-music'
export const PLAYLIST_REMOVE_MUSIC = 'playlist-remove-music'
export const PLAYLIST_CHANGE_MUSIC_ORDER = 'playlist-change-music-order'

interface OnAddMusicData {
    id: string;
    music: Pick<Music, 'id'>;
    headerMusics: Pick<Music, 'id'>[];
}

interface OnRemoveMusicData {
    id: string;
    musicIds: string[];
    headerMusics: Pick<Music, 'id'>[];
}

interface OnChangeMusicOrderData {
    id: string;
    musicIds: string[];
}

interface PlaylistListenerEventHandler {
    onCreate: (playlist: Playlist) => void;
    onDelete: (id: string) => void;
    onUpdate: (playlist: Playlist) => void;
    onChangeOrder: (ids: string[]) => void;
    onAddMusic: (data: OnAddMusicData) => void;
    onRemoveMusic: (data: OnRemoveMusicData) => void;
    onChangeMusicOrder: ({ id, musicIds }: OnChangeMusicOrderData) => void;
}

export class PlaylistListener implements Listener {
    connect({ onCreate, onDelete, onUpdate, onChangeOrder, onAddMusic, onRemoveMusic, onChangeMusicOrder }: PlaylistListenerEventHandler) {
        socket.on(PLAYLIST_CREATE, onCreate)
        socket.on(PLAYLIST_DELETE, onDelete)
        socket.on(PLAYLIST_UPDATE, onUpdate)
        socket.on(PLAYLIST_CHANGE_ORDER, onChangeOrder)
        socket.on(PLAYLIST_ADD_MUSIC, onAddMusic)
        socket.on(PLAYLIST_REMOVE_MUSIC, onRemoveMusic)
        socket.on(PLAYLIST_CHANGE_MUSIC_ORDER, onChangeMusicOrder)
    }

    static create(name: string) {
        socket.emit(PLAYLIST_CREATE, { name })
    }

    static update(id: string, name: string) {
        socket.emit(PLAYLIST_UPDATE, { id, name })
    }

    static delete(id: string) {
        socket.emit(PLAYLIST_DELETE, { id })
    }

    static changeOrder(ids: string[]) {
        socket.emit(PLAYLIST_CHANGE_ORDER, { ids })
    }

    static addMusic(id: string, musicId: string) {
        socket.emit(PLAYLIST_ADD_MUSIC, { id, musicId })
    }

    static removeMusic(id: string, musicId: string) {
        socket.emit(PLAYLIST_REMOVE_MUSIC, { id, musicId })
    }

    static changeMusicOrder(id: string, musicIds: string[]) {
        socket.emit(PLAYLIST_CHANGE_MUSIC_ORDER, { id, musicIds })
    }

    disconnect() {
        socket.off(PLAYLIST_CREATE)
        socket.off(PLAYLIST_DELETE)
        socket.off(PLAYLIST_UPDATE)
        socket.off(PLAYLIST_ADD_MUSIC)
        socket.off(PLAYLIST_REMOVE_MUSIC)
    }
}