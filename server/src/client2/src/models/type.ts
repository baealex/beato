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
    createdAt: string;
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
        id: string;
        name: string;
    };
    musics: Pick<Music, 'id'>[];
    createdAt: string;
}

export interface Artist {
    id: string;
    name: string;
    latestAlbum?: Album;
    albums: Album[];
    albumCount: number;
    musics: Pick<Music, 'id'>[];
    musicCount: number;
    createdAt: string;
}

export interface Playlist {
    id: string;
    name: string;
    musics: Pick<Music, 'id'>[];
    musicCount: number;
    headerMusics: Pick<Music, 'id'>[];
    createdAt: string;
    updatedAt: string;
}