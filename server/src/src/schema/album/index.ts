import type { IResolvers } from '@graphql-tools/utils';

import models, { type Album } from '~/models';
import { gql } from '~/modules/graphql';
import { TRACK_SYNC_STATUS } from '~/modules/track-identity';
import { artistType } from '../artist';
import { musicType } from '../music';

export const albumType = gql`
    type Album {
        id: ID!
        name: String!
        cover: String!
        artist: Artist!
        publishedYear: String!
        createdAt: String!
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
        allAlbums: () => models.album.findMany({
            where: { Music: { some: { syncStatus: TRACK_SYNC_STATUS.active } } },
            orderBy: { name: 'asc' }
        }),
        album: (_, { id }: Album) => models.album.findUnique({ where: { id: Number(id) } })
    },
    Album: {
        artist: (album: Album) => models.artist.findUnique({ where: { id: album.artistId } }),
        musics: (album: Album) => models.music.findMany({
            where: {
                Album: { id: album.id },
                syncStatus: TRACK_SYNC_STATUS.active
            },
            orderBy: { trackNumber: 'asc' }
        })
    }
};
