import { IResolvers } from '@graphql-tools/utils';

import models, { Music } from '~/models';
import { gql } from '~/modules/graphql';

export const musicType = gql`
    type Music {
        id: ID!
        name: String
        email: String!
        createdAt: String!
        updatedAt: String!
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
        allMusics: models.music.findMany,
        music: (_, { id }: Music) => models.music.findUnique({
            where: {
                id: Number(id),
            },
        }),
    },
};