import { makeExecutableSchema } from '@graphql-tools/schema';
import { musicResolvers, musicTypeDefs } from './music';

const schema = makeExecutableSchema({
    typeDefs: [
        musicTypeDefs
    ],
    resolvers: [
        musicResolvers
    ],
});

export default schema;
