import axios from 'axios';
import type { Artist, Album, Music, Playlist } from '~/models/type';

type QueryName = 'query' | 'mutation';

export function wrapper(queryName: QueryName, query: string): string {
    return queryName + ' { ' + query + ' }';
}

type Properties<T> = (keyof T)[] | string[];

export function createQuery<T>(itemName: string, itemProperties: Properties<T>): string {
    return itemName + ' {' + itemProperties.join(' ') + '}';
}

interface GraphqlResponse<T extends string, K> {
    data: {
        [key in T]: K;
    };
}

export async function graphQLRequest<T extends string, K>(query: string): Promise<GraphqlResponse<T, K>> {
    const { data } = await axios.request<GraphqlResponse<T, K>>({
        url: '/graphql',
        method: 'POST',
        data: { query }
    });
    return data;
}

export function getMusics() {
    return graphQLRequest<'allMusics', Music[]>(
        wrapper('query', (createQuery<Music>('allMusics', [
            'id',
            'name',
            'filePath',
            'codec',
            'duration',
            'playCount',
            'trackNumber',
            'isLiked',
            'isHated',
            'createdAt',
            createQuery<Artist>('artist', [
                'id',
                'name'
            ]),
            createQuery<Album>('album', [
                'id',
                'name',
                'cover',
                'publishedYear'
            ])
        ])))
    );
}

export function getArtists() {
    return graphQLRequest<'allArtists', Artist[]>(
        wrapper('query', createQuery<Artist>('allArtists', [
            'id',
            'name',
            'createdAt',
            'albumCount',
            'musicCount',
            createQuery<Album>('latestAlbum', [
                'cover'
            ])
        ]))
    );
}

export function getArtist(id: string) {
    return graphQLRequest<'artist', Artist>(
        wrapper('query', createQuery<Artist>(`artist(id: "${id}")`, [
            'id',
            'name',
            'albumCount',
            'musicCount',
            'createdAt',
            createQuery<Album>('latestAlbum', [
                'cover'
            ]),
            createQuery<Album>('albums', [
                'id',
                'name',
                'cover',
                'publishedYear'
            ]),
            createQuery<Music>('musics', [
                'id'
            ])
        ]))
    );
}

export function getAlbums() {
    return graphQLRequest<'allAlbums', Album[]>(
        wrapper('query', createQuery<Album>('allAlbums', [
            'id',
            'name',
            'cover',
            'publishedYear',
            'createdAt',
            createQuery<Artist>('artist', [
                'id',
                'name'
            ])
        ]))
    );
}

export function getAlbum(id: string) {
    return graphQLRequest<'album', Album>(
        wrapper('query', createQuery<Album>(`album(id: "${id}")`, [
            'id',
            'name',
            'cover',
            'publishedYear',
            createQuery<Artist>('artist', [
                'id',
                'name'
            ]),
            createQuery<Music>('musics', [
                'id'
            ])
        ]))
    );
}

export function getPlaylists() {
    return graphQLRequest<'allPlaylist', Playlist[]>(
        wrapper('query', createQuery<Playlist>('allPlaylist', [
            'id',
            'name',
            'musicCount',
            'createdAt',
            'updatedAt',
            createQuery<Music>('headerMusics', [
                'id'
            ])
        ]))
    );
}

export function getPlaylist(id: string) {
    return graphQLRequest<'playlist', Playlist>(
        wrapper('query', createQuery<Playlist>(`playlist(id: "${id}")`, [
            'id',
            'name',
            'musicCount',
            'createdAt',
            'updatedAt',
            createQuery<Music>('musics', [
                'id'
            ])
        ]))
    );
}

export function getAudio(id: string) {
    return axios.request({
        method: 'GET',
        url: `/api/audio/${id}`,
        responseType: 'blob'
    });
}
