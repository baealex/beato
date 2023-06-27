import { artists, albums, musics, playlist } from "./index";
import { getAlbums, getArtists, getMusics } from "../api";

export function syncData(callback: () => void) {
    Promise.all([getMusics(), getAlbums(), getArtists()]).then(
        ([_musics, _albums, _artists]) => {
            musics.update(() => _musics.data.allMusics);
            albums.update(() => _albums.data.allAlbums);
            artists.update(() => _artists.data.allArtists);
            callback();
        }
    );
}