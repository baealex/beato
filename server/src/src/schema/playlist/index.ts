import { IResolvers } from '@graphql-tools/utils';

import models, { Playlist } from '~/models';
import { gql } from '~/modules/graphql';
import { musicType } from '../music';

export const playlistType = gql`
    type Playlist {
        id: ID!
        name: String!
        musics: [Music!]!
        musicCount: Int!
        headerMusics: [Music!]!
        createdAt: String!
        updatedAt: String!
    }
    
    ${musicType}
`;

export const playlistQuery = gql`
    type Query {
        allPlaylist: [Playlist!]!
        playlist(id: ID!): Playlist!
    }
`;

export const playlistTypeDefs = `
    ${playlistType}
    ${playlistQuery}
`;

export const playlistResolvers: IResolvers = {
    Query: {
        allPlaylist: () => models.playlist.findMany({
            orderBy: [
                { order: 'asc' },
                { createdAt: 'desc' }
            ]
        }),
        playlist: (_, { id }: Playlist) => models.playlist.findUnique({
            where: {
                id: Number(id),
            },
        }),
    },
    Playlist: {
        musics: async (playlist: Playlist) => {
            const musics = await models.playlistMusic.findMany({
                where: {
                    playlistId: playlist.id,
                },
                orderBy: {
                    order: 'asc',
                },
                include: {
                    Music: true,
                },
            });
            return musics.map((playlistMusic) => playlistMusic.Music);
        },
        headerMusics: async (playlist: Playlist) => {
            const musics = await models.playlistMusic.findMany({
                where: {
                    playlistId: playlist.id,
                },
                orderBy: {
                    order: 'asc',
                },
                include: {
                    Music: true,
                },
                take: 4,
            });
            return musics.map((playlistMusic) => playlistMusic.Music);
        },
        musicCount: (playlist: Playlist) => models.music.count({
            where: {
                PlaylistMusic: {
                    some: {
                        playlistId: playlist.id,
                    },
                }
            }
        }),
    },
};