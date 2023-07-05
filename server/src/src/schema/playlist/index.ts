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

export const playlistMutation = gql`
    type Mutation {
        createPlaylist(name: String!): Playlist!
        updatePlaylist(id: ID!, name: String!): Playlist!
        deletePlaylist(id: ID!): Playlist!
        addMusicToPlaylist(playlistId: ID!, musicId: ID!): Playlist!
    }
`;

export const playlistTypeDefs = `
    ${playlistType}
    ${playlistQuery}
    ${playlistMutation}
`;

export const playlistResolvers: IResolvers = {
    Query: {
        allPlaylist: () => models.playlist.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        }),
        playlist: (_, { id }: Playlist) => models.playlist.findUnique({
            where: {
                id: Number(id),
            },
        }),
    },
    Mutation: {
        createPlaylist: (_, { name }: Playlist) => models.playlist.create({
            data: {
                name,
            },
        }),
        updatePlaylist: (_, { id, name }: Playlist) => models.playlist.update({
            where: {
                id: Number(id),
            },
            data: {
                name,
            },
        }),
        deletePlaylist: (_, { id }: Playlist) => models.playlist.delete({
            where: {
                id: Number(id),
            },
        }),
        addMusicToPlaylist: (_, { playlistId, musicId }: { playlistId: string, musicId: string }) => async () => {
            const lastOrder = await models.playlistMusic.findFirst({
                where: {
                    playlistId: Number(playlistId),
                },
                orderBy: {
                    order: 'desc',
                },
            });

            return await models.playlistMusic.create({
                data: {
                    order: lastOrder ? lastOrder.order + 1 : 0,
                    playlistId: Number(playlistId),
                    musicId: Number(musicId),
                },
            });
        },
    },
    Playlist: {
        musics: (playlist: Playlist) => models.music.findMany({
            where: {
                PlaylistMusic: {
                    some: {
                        playlistId: playlist.id,
                    },
                }
            }
        }),
        headerMusics: (playlist: Playlist) => models.music.findMany({
            where: {
                PlaylistMusic: {
                    some: {
                        playlistId: playlist.id,
                    },
                }
            },
            take: 4,
        }),
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