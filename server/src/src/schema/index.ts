import { makeExecutableSchema } from '@graphql-tools/schema';
import { albumResolvers, albumTypeDefs } from './album';
import { artistResolvers, artistTypeDefs } from './artist';
import { musicResolvers, musicTypeDefs } from './music';

const schema = makeExecutableSchema({
    typeDefs: [
        albumTypeDefs,
        artistTypeDefs,
        musicTypeDefs,
    ],
    resolvers: [
        albumResolvers,
        artistResolvers,
        musicResolvers,
    ],
});

export default schema;
