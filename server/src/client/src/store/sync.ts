import {
    syncAlbums,
    syncArtists,
    syncMusics,
} from "./index";

export function syncAll(callback: () => void) {
    Promise.all([
        syncAlbums(),
        syncArtists(),
        syncMusics(),
    ]).then(callback);
}