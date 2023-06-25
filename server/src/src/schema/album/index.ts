import { IResolvers } from '@graphql-tools/utils';

import models, { Album } from '~/models';
import { gql } from '~/modules/graphql';

export const albumType = gql`
    type Album {
        id: ID!
        name: String!
        cover: String!
        artist: Artist!
        musics: [Music!]!
    }

    type Artist {
        id: ID!
        name: String!
    }

    type Music {
        id: ID!
        name: String!
        duration: Float!
        trackNumber: Int!
        filePath: String!
        artist: Artist!
        album: Album!
        genres: [Genre!]!
    }

    type Genre {
        id: ID!
        name: String!
    }
`;

export const albumQuery = gql`
    type Query {
        allAlbums: [Album!]!
        album(id: ID!): Album!
    }
`;

export const albumTypeDefs = `
    ${albumType}
    ${albumQuery}
`;

export const albumResolvers: IResolvers = {
    Query: {
        allAlbums: models.album.findMany,
        album: (_, { id }: Album) => models.album.findUnique({
            where: {
                id: Number(id),
            },
        }),
    },
    Album: {
        artist: (album: Album) => models.artist.findUnique({
            where: {
                id: album.artistId,
            },
        }),
        musics: (album: Album) => models.music.findMany({
            where: {
                Album: {
                    id: album.id,
                },
            },
        }),
    },
};