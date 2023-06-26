import { IResolvers } from '@graphql-tools/utils';

import models, { Album } from '~/models';
import { gql } from '~/modules/graphql';
import { artistType } from '../artist';
import { musicType } from '../music';

export const albumType = gql`
    type Album {
        id: ID!
        name: String!
        cover: String!
        artist: Artist!
        musics: [Music!]!
    }
    
    ${artistType}

    ${musicType}
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