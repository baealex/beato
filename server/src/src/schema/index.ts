import { makeExecutableSchema } from '@graphql-tools/schema';
import { albumResolvers, albumTypeDefs } from './album';
import { artistResolvers, artistTypeDefs } from './artist';
import { musicResolvers, musicTypeDefs } from './music';
import { playlistResolvers, playlistTypeDefs } from './playlist'; './playlist';

const schema = makeExecutableSchema({
    typeDefs: [
        albumTypeDefs,
        artistTypeDefs,
        musicTypeDefs,
        playlistTypeDefs
    ],
    resolvers: [
        albumResolvers,
        artistResolvers,
        musicResolvers,
        playlistResolvers
    ]
});

export default schema;
