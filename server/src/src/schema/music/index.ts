import { IResolvers } from '@graphql-tools/utils';

import models, { Music } from '~/models';
import { gql } from '~/modules/graphql';

export const musicType = gql`
    type Music {
        id: ID!
        name: String!
        duration: Float!
        playCount: Int!
        trackNumber: Int!
        filePath: String!
        artist: Artist!
        album: Album!
        genres: [Genre!]!
    }

    type Artist {
        id: ID!
        name: String!
    }

    type Album {
        id: ID!
        name: String!
        cover: String!
    }

    type Genre {
        id: ID!
        name: String!
    }
`;

export const musicQuery = gql`
    type Query {
        allMusics: [Music!]!
        music(id: ID!): Music!
    }
`;

export const musicTypeDefs = `
    ${musicType}
    ${musicQuery}
`;

export const musicResolvers: IResolvers = {
    Query: {
        allMusics: () => models.music.findMany({
            orderBy: {
                playCount: 'desc',
            },
        }),
        music: (_, { id }: Music) => models.music.findUnique({
            where: {
                id: Number(id),
            },
        }),
    },
    Music: {
        artist: (music: Music) => models.artist.findUnique({
            where: {
                id: music.artistId,
            },
        }),
        album: (music: Music) => models.album.findUnique({
            where: {
                id: music.albumId,
            },
        }),
        genres: (music: Music) => models.genre.findMany({
            where: {
                Music: {
                    some: {
                        id: music.id,
                    },
                },
            },
        }),
    },
};