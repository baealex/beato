export interface Music {
    id: number;
    name: string;
    duration: number;
    trackNumber: number;
    filePath: string;
    artist: Artist;
    album: Album;
    genres: {
        name: string;
    }[];
}

export interface Album {
    id: number;
    name: string;
    cover: string;
    artist: {
        name: string;
    };
    musics: Music[];
}

export interface Artist {
    id: number;
    name: string;
    latestAlbum: Album;
    albums: Album[];
    albumCount: number;
    musics: Music[];
    musicCount: number;
}