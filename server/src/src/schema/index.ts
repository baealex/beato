import { makeExecutableSchema } from '@graphql-tools/schema';
import { albumResolvers, albumTypeDefs } from './album';
import { musicResolvers, musicTypeDefs } from './music';

const schema = makeExecutableSchema({
    typeDefs: [
        albumTypeDefs,
        musicTypeDefs,
    ],
    resolvers: [
        albumResolvers,
        musicResolvers,
    ],
});

export default schema;
