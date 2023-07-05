import {
    syncAlbums,
    syncArtists,
    syncMusics,
    syncPlaylists,
} from "./index";

export function syncAll(callback: () => void) {
    Promise.all([
        syncAlbums(),
        syncArtists(),
        syncMusics(),
        syncPlaylists(),
    ]).then(callback);
}