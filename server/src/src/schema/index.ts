import { makeExecutableSchema } from '@graphql-tools/schema';
import { albumResolvers, albumTypeDefs } from './album';
import { artistResolvers, artistTypeDefs } from './artist';
import { musicResolvers, musicTypeDefs } from './music';
import { playlistResolvers, playlistTypeDefs } from './playlist';
import { syncReportResolvers, syncReportTypeDefs } from './sync-report';

const schema = makeExecutableSchema({
    typeDefs: [
        albumTypeDefs,
        artistTypeDefs,
        musicTypeDefs,
        playlistTypeDefs,
        syncReportTypeDefs
    ],
    resolvers: [
        albumResolvers,
        artistResolvers,
        musicResolvers,
        playlistResolvers,
        syncReportResolvers
    ]
});

export default schema;
