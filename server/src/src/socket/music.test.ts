import models from '~/models';
import { connectors } from './connectors';
import { count } from './music';

const createMusic = async (overrides?: { duration?: number }) => {
    const unique = Date.now().toString() + Math.random().toString(16).slice(2);
    const artist = await models.artist.create({ data: { name: `Artist ${unique}` } });
    const album = await models.album.create({
        data: {
            name: `Album ${unique}`,
            cover: `/covers/${unique}.jpg`,
            publishedYear: '2026',
            artistId: artist.id
        }
    });

    return models.music.create({
        data: {
            name: `Track ${unique}`,
            artistId: artist.id,
            albumId: album.id,
            filePath: `/music/${unique}.mp3`,
            duration: overrides?.duration ?? 200,
            codec: 'mp3',
            container: 'mp3',
            bitrate: 320,
            sampleRate: 44100,
            trackNumber: 1
        }
    });
};

describe('music playback counting', () => {
    beforeEach(async () => {
        jest.restoreAllMocks();

        await models.playbackEvent.deleteMany();
        await models.musicLike.deleteMany();
        await models.musicHate.deleteMany();
        await models.playlistMusic.deleteMany();
        await models.music.deleteMany();
        await models.album.deleteMany();
        await models.artist.deleteMany();
    });

    it('creates a playback event and updates aggregates for a meaningful listen', async () => {
        const broadcastSpy = jest.spyOn(connectors, 'broadcast').mockResolvedValue([]);
        const music = await createMusic({ duration: 180 });

        await count({
            id: music.id.toString(),
            playedMs: 35_000,
            completionRate: 35_000 / 180_000,
            source: 'queue-track-change'
        });

        const updatedMusic = await models.music.findUniqueOrThrow({ where: { id: music.id } });
        const events = await models.playbackEvent.findMany({ where: { musicId: music.id } });

        expect(updatedMusic.playCount).toBe(1);
        expect(updatedMusic.totalPlayedMs).toBe(35_000);
        expect(updatedMusic.lastPlayedAt).not.toBeNull();
        expect(events).toHaveLength(1);
        expect(events[0]).toMatchObject({
            musicId: music.id,
            playedMs: 35_000,
            countedAsPlay: true,
            source: 'queue-track-change'
        });
        expect(broadcastSpy).toHaveBeenCalledWith('music-count', expect.objectContaining({
            id: music.id.toString(),
            playCount: 1,
            totalPlayedMs: 35_000,
            countedAsPlay: true
        }));
    });

    it('records partial playback without incrementing play count', async () => {
        const broadcastSpy = jest.spyOn(connectors, 'broadcast').mockResolvedValue([]);
        const music = await createMusic({ duration: 240 });

        await count({
            id: music.id.toString(),
            playedMs: 10_000,
            completionRate: 10_000 / 240_000,
            source: 'queue-stop'
        });

        const updatedMusic = await models.music.findUniqueOrThrow({ where: { id: music.id } });
        const event = await models.playbackEvent.findFirstOrThrow({ where: { musicId: music.id } });

        expect(updatedMusic.playCount).toBe(0);
        expect(updatedMusic.totalPlayedMs).toBe(10_000);
        expect(event.countedAsPlay).toBe(false);
        expect(broadcastSpy).toHaveBeenCalledWith('music-count', expect.objectContaining({
            id: music.id.toString(),
            playCount: 0,
            totalPlayedMs: 10_000,
            countedAsPlay: false
        }));
    });

    it('clamps playedMs to the session wall-clock duration when startedAt is provided', async () => {
        const broadcastSpy = jest.spyOn(connectors, 'broadcast').mockResolvedValue([]);
        const music = await createMusic({ duration: 180 });
        const startedAt = new Date(Date.now() - 5_000).toISOString();

        await count({
            id: music.id.toString(),
            playedMs: 60_000,
            completionRate: 60_000 / 180_000,
            startedAt,
            source: 'queue-stop'
        });

        const updatedMusic = await models.music.findUniqueOrThrow({ where: { id: music.id } });
        const event = await models.playbackEvent.findFirstOrThrow({ where: { musicId: music.id } });

        expect(updatedMusic.playCount).toBe(0);
        expect(updatedMusic.totalPlayedMs).toBeLessThanOrEqual(5_100);
        expect(event.playedMs).toBeLessThanOrEqual(5_100);
        expect(Math.abs(event.startedAt.getTime() - new Date(startedAt).getTime())).toBeLessThan(50);
        expect(broadcastSpy).toHaveBeenCalledWith('music-count', expect.objectContaining({
            id: music.id.toString(),
            playCount: 0,
            countedAsPlay: false
        }));
    });
});
