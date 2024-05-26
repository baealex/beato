import type { IResolvers } from '@graphql-tools/utils';

import models, { type Artist } from '~/models';
import { gql } from '~/modules/graphql';
import { albumType } from '../album';
import { musicType } from '../music';

export const artistType = gql`
    type Artist {
        id: ID!
        name: String!
        latestAlbum: Album
        createdAt: String!
        albums: [Album!]!
        albumCount: Int!
        musics: [Music!]!
        musicCount: Int!
    }

    ${albumType}

    ${musicType}
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
        allArtists: () => models.artist.findMany({ orderBy: { Music: { _count: 'desc' } } }),
        artist: (_, { id }: Artist) => models.artist.findUnique({ where: { id: Number(id) } })
    },
    Artist: {
        latestAlbum: (artist: Artist) => models.album.findFirst({
            where: { artistId: artist.id },
            orderBy: { publishedYear: 'desc' }
        }),
        albums: (artist: Artist) => models.album.findMany({
            where: { artistId: artist.id },
            orderBy: { publishedYear: 'desc' }
        }),
        musics: (artist: Artist) => models.music.findMany({
            where: { artistId: artist.id },
            orderBy: { playCount: 'desc' }
        }),
        albumCount: (artist: Artist) => models.album.count({ where: { artistId: artist.id } }),
        musicCount: (artist: Artist) => models.music.count({ where: { artistId: artist.id } })
    }
};
