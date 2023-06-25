export interface Music {
    name: string;
    duration: number;
    trackNumber: number;
    filePath: string;
    artist: {
        name: string;
    };
    album: {
        name: string;
        cover: string;
    };
    genres: {
        name: string;
    }[];
}