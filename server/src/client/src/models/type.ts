export interface Music {
    id: string;
    name: string;
    duration: number;
    codec: string;
    bitrate: number;
    sampleRate: number;
    trackNumber: number;
    playCount: number;
    filePath: string;
    isLiked: boolean;
    artist: Artist;
    album: Album;
    genres: {
        name: string;
    }[];
}

export interface Album {
    id: string;
    name: string;
    cover: string;
    publishedYear: string;
    artist: {
        name: string;
    };
    musics: Music[];
}

export interface Artist {
    id: string;
    name: string;
    latestAlbum: Album;
    albums: Album[];
    albumCount: number;
    musics: Music[];
    musicCount: number;
}