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
        deletePlaylist(id: ID!): Boolean!
        addMusicToPlaylist(playlistId: ID!, musicId: ID!): Boolean!
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
        deletePlaylist: async (_, { id }: Playlist) => {
            try {
                await models.playlistMusic.deleteMany({
                    where: {
                        playlistId: Number(id),
                    },
                });
                await models.playlist.delete({
                    where: {
                        id: Number(id),
                    },
                });
                return true;
            } catch (e) {
                console.error(e);
                return false;
            }
        },
        addMusicToPlaylist: async (_, { playlistId, musicId }: { playlistId: string, musicId: string }) => {
            if (await models.playlistMusic.findFirst({
                where: {
                    playlistId: Number(playlistId),
                    musicId: Number(musicId),
                },
            })) {
                return false;
            }

            const lastOrder = await models.playlistMusic.findFirst({
                where: {
                    playlistId: Number(playlistId),
                },
                orderBy: {
                    order: 'desc',
                },
            });
            await models.playlistMusic.create({
                data: {
                    order: lastOrder ? lastOrder.order + 1 : 0,
                    playlistId: Number(playlistId),
                    musicId: Number(musicId),
                },
            });
            return true;
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