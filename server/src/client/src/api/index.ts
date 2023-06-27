import axios from 'axios';

interface GraphqlResponse<T extends string, K> {
    data: {
        [key in T]: K;
    };
}

export async function graphQLRequest<T extends string, K>(query: string): Promise<GraphqlResponse<T, K>> {
    const { data } = await axios.request<GraphqlResponse<T, K>>({
        method: 'POST',
        url: '/graphql',
        data: {
            query,
        },
    });
    return data;
}

export function getMusics() {
    return graphQLRequest<"allMusics", Music[]>(`
        query {
            allMusics {
                id name filePath codec duration playCount
                artist {
                    id name
                }
                album {
                    id name cover
                }
            }
        }
    `);
}

export function getArtists() {
    return graphQLRequest<"allArtists", Artist[]>(`
        query {
            allArtists {
                id name albumCount musicCount
                latestAlbum {
                    cover
                }
            }
        }
    `);
}

export function getArtist(id: string) {
    return graphQLRequest<"artist", Artist>(`
        query {
            artist(id: "${id}") {
                id name
                latestAlbum {
                    cover
                }
                albums {
                    id name cover
                }
                musics {
                    id name filePath duration trackNumber
                    artist {
                        name
                    }
                    album {
                        name cover
                    }
                }
            }
        }
    `);
}

export function getAlbums() {
    return graphQLRequest<"allAlbums", Album[]>(`
        query {
            allAlbums {
                id name cover
                artist {
                    id name
                }
            }
        }
    `);
}

export function getAlbum(id: string) {
    return graphQLRequest<"album", Album>(`
        query {
            album(id: "${id}") {
                id name cover
                artist {
                    name
                }
                musics {
                    id name filePath duration trackNumber
                    artist {
                        name
                    }
                    album {
                        name cover
                    }
                }
            }
        }
    `);
}