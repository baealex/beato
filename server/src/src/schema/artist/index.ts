import { IResolvers } from '@graphql-tools/utils';

import models, { Artist } from '~/models';
import { gql } from '~/modules/graphql';

export const artistType = gql`
    type Artist {
        id: ID!
        name: String!
        latestAlbum: Album!
        albums: [Album!]!
        albumCount: Int!
        musics: [Music!]!
        musicCount: Int!
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

export const artistQuery = gql`
    type Query {
        allArtists: [Artist!]!
        artist(id: ID!): Artist!
    }
`;

export const artistTypeDefs = `
    ${artistType}
    ${artistQuery}
`;

export const artistResolvers: IResolvers = {
    Query: {
        allArtists: () => models.artist.findMany({
            orderBy: {
                Music: {
                    _count: 'desc',
                },
            },
        }),
        artist: (_, { id }: Artist) => models.artist.findUnique({
            where: {
                id: Number(id),
            },
        }),
    },
    Artist: {
        latestAlbum: (artist: Artist) => models.album.findFirst({
            where: {
                artistId: artist.id,
            },
            orderBy: {
                publishedYear: 'desc',
            },
        }),
        albums: (artist: Artist) => models.album.findMany({
            where: {
                artistId: artist.id,
            }
        }),
        musics: (artist: Artist) => models.music.findMany({
            where: {
                artistId: artist.id,
            }
        }),
        albumCount: (artist: Artist) => models.album.count({
            where: {
                artistId: artist.id,
            }
        }),
        musicCount: (artist: Artist) => models.music.count({
            where: {
                artistId: artist.id,
            }
        }),
    },
};