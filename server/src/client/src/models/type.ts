export interface Music {
    id: number;
    name: string;
    duration: number;
    trackNumber: number;
    filePath: string;
    artist: {
        name: string;
    };
    album: Pick<Album, 'id' | 'name' | 'cover'>;
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