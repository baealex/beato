import type { IResolvers } from '@graphql-tools/utils';

import models, { type Music } from '~/models';
import { gql } from '~/modules/graphql';
import { artistType } from '../artist';
import { albumType } from '../album';

export const musicType = gql`
    type Music {
        id: ID!
        name: String!
        duration: Float!
        codec: String!
        bitrate: Float!
        sampleRate: Float!
        playCount: Int!
        trackNumber: Int!
        filePath: String!
        isLiked: Boolean!
        isHated: Boolean!
        createdAt: String!
        artist: Artist!
        album: Album!
        genres: [Genre!]!
    }

    type Genre {
        id: ID!
        name: String!
    }

    ${artistType}

    ${albumType}
`;

export const musicQuery = gql`
    type Query {
        allMusics: [Music!]!
        allHatedMusics: [Music!]!
        music(id: ID!): Music!
    }
`;

export const musicTypeDefs = `
    ${musicType}
    ${musicQuery}
`;

export const musicResolvers: IResolvers = {
    Query: {
        allMusics: () => models.music.findMany({ orderBy: { playCount: 'desc' } }),
        music: (_, { id }: Music) => models.music.findUnique({ where: { id: Number(id) } })
    },
    Music: {
        artist: (music: Music) => models.artist.findUnique({ where: { id: music.artistId } }),
        album: (music: Music) => models.album.findUnique({ where: { id: music.albumId } }),
        genres: (music: Music) => models.genre.findMany({ where: { Music: { some: { id: music.id } } } }),
        isLiked: (music: Music) => models.musicLike.findFirst({ where: { musicId: music.id } }).then((like) => !!like),
        isHated: (music: Music) => models.musicHate.findFirst({ where: { musicId: music.id } }).then((hate) => !!hate)
    }
};
