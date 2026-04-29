import axios from 'axios';
import type {
    Artist,
    Album,
    Music,
    Playlist,
    SyncReport,
    SyncReportItem
} from '~/models/type';

export type AuthMode = 'open' | 'password';

export interface AuthSession {
    mode: AuthMode;
    authRequired: boolean;
    authenticated: boolean;
}

type QueryName = 'query' | 'mutation';

export function wrapper(queryName: QueryName | string, query: string): string {
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

type GraphqlVariables = Record<string, unknown>;

interface GraphqlRequestOptions<TVariables extends GraphqlVariables = GraphqlVariables> {
    query: string;
    variables?: TVariables;
    operationName?: string;
}

export async function graphQLRequest<T extends string, K, TVariables extends GraphqlVariables = GraphqlVariables>({
    query,
    variables,
    operationName
}: GraphqlRequestOptions<TVariables>): Promise<GraphqlResponse<T, K>> {
    const { data } = await axios.request<GraphqlResponse<T, K>>({
        url: '/graphql',
        method: 'POST',
        data: { query, variables, operationName }
    });
    return data;
}

export async function getAuthSession() {
    const { data } = await axios.request<AuthSession>({
        url: '/api/auth/session',
        method: 'GET'
    });

    return data;
}

export async function logoutSession() {
    const { data } = await axios.request<AuthSession>({
        url: '/api/auth/logout',
        method: 'POST',
        data: {}
    });

    return data;
}

export function getMusics() {
    return graphQLRequest<'allMusics', Music[]>({
        operationName: 'AllMusics',
        query: wrapper('query AllMusics', (createQuery<Music>('allMusics', [
            'id',
            'name',
            'filePath',
            'codec',
            'duration',
            'playCount',
            'lastPlayedAt',
            'totalPlayedMs',
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
    });
}

export function getArtists() {
    return graphQLRequest<'allArtists', Artist[]>({
        operationName: 'AllArtists',
        query: wrapper('query AllArtists', createQuery<Artist>('allArtists', [
            'id',
            'name',
            'createdAt',
            'albumCount',
            'musicCount',
            createQuery<Album>('latestAlbum', [
                'cover'
            ])
        ]))
    });
}

export function getArtist(id: string) {
    return graphQLRequest<'artist', Artist, { id: string }>({
        operationName: 'Artist',
        variables: { id },
        query: wrapper('query Artist($id: ID!)', createQuery<Artist>('artist(id: $id)', [
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
    });
}

export function getAlbums() {
    return graphQLRequest<'allAlbums', Album[]>({
        operationName: 'AllAlbums',
        query: wrapper('query AllAlbums', createQuery<Album>('allAlbums', [
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
    });
}

export function getAlbum(id: string) {
    return graphQLRequest<'album', Album, { id: string }>({
        operationName: 'Album',
        variables: { id },
        query: wrapper('query Album($id: ID!)', createQuery<Album>('album(id: $id)', [
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
    });
}

export function getPlaylists() {
    return graphQLRequest<'allPlaylist', Playlist[]>({
        operationName: 'AllPlaylists',
        query: wrapper('query AllPlaylists', createQuery<Playlist>('allPlaylist', [
            'id',
            'name',
            'musicCount',
            'createdAt',
            'updatedAt',
            createQuery<Music>('headerMusics', [
                'id'
            ])
        ]))
    });
}

export function getPlaylist(id: string) {
    return graphQLRequest<'playlist', Playlist, { id: string }>({
        operationName: 'Playlist',
        variables: { id },
        query: wrapper('query Playlist($id: ID!)', createQuery<Playlist>('playlist(id: $id)', [
            'id',
            'name',
            'musicCount',
            'createdAt',
            'updatedAt',
            createQuery<Music>('musics', [
                'id'
            ])
        ]))
    });
}

export function getAudio(id: string) {
    return axios.request({
        method: 'GET',
        url: `/api/audio/${id}`,
        responseType: 'blob'
    });
}

export function getLatestSyncReport() {
    return graphQLRequest<'latestSyncReport', SyncReport | null>({
        operationName: 'LatestSyncReport',
        query: wrapper('query LatestSyncReport', createQuery<SyncReport>('latestSyncReport', [
            'id',
            'createdAt',
            'startedAt',
            'completedAt',
            'status',
            'force',
            'scannedFiles',
            'indexedFiles',
            'createdCount',
            'movedCount',
            'duplicateCount',
            'missingCount',
            createQuery<SyncReportItem>('created', [
                'id',
                'kind',
                'musicId',
                'musicName',
                'filePath',
                'previousFilePath',
                'createdAt'
            ]),
            createQuery<SyncReportItem>('moved', [
                'id',
                'kind',
                'musicId',
                'musicName',
                'filePath',
                'previousFilePath',
                'createdAt'
            ]),
            createQuery<SyncReportItem>('duplicate', [
                'id',
                'kind',
                'musicId',
                'musicName',
                'filePath',
                'previousFilePath',
                'createdAt'
            ]),
            createQuery<SyncReportItem>('missing', [
                'id',
                'kind',
                'musicId',
                'musicName',
                'filePath',
                'previousFilePath',
                'createdAt'
            ])
        ]))
    });
}
