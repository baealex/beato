import {
    syncAlbums,
    syncArtists,
    syncMusics,
    syncPlaylist,
} from "./index";

export function syncAll(callback: () => void) {
    Promise.all([
        syncAlbums(),
        syncArtists(),
        syncMusics(),
        syncPlaylist(),
    ]).then(callback);
}