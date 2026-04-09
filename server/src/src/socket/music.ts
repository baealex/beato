import type { Socket } from 'socket.io';

import models from '~/models';

import { connectors } from './connectors';

export const MUSIC_LIKE = 'music-like';
export const MUSIC_HATE = 'music-hate';
export const MUSIC_COUNT = 'music-count';

const PLAY_COUNT_MIN_MS = 30_000;
const SHORT_TRACK_COUNT_THRESHOLD = 0.5;

interface CountPayload {
    id?: string;
    playedMs?: number;
    completionRate?: number;
    startedAt?: string;
    source?: string;
    connectorId?: string | null;
}

const clamp = (value: number, min: number, max: number) => {
    return Math.min(Math.max(value, min), max);
};

const shouldCountAsPlay = ({
    durationSeconds,
    playedMs
}: {
    durationSeconds: number;
    playedMs: number;
}) => {
    const durationMs = Math.max(durationSeconds * 1000, 0);
    const minimumMeaningfulPlayMs = Math.min(
        PLAY_COUNT_MIN_MS,
        durationMs * SHORT_TRACK_COUNT_THRESHOLD
    );

    return playedMs >= minimumMeaningfulPlayMs;
};

export const musicListener = (socket: Socket) => {
    socket.on(MUSIC_LIKE, like);
    socket.on(MUSIC_HATE, hate);
    socket.on(MUSIC_COUNT, count);
};

export const like = async ({ id = '' }) => {
    if (!id) {
        return;
    }

    let isLiked = false;
    const $music = await models.music.findUnique({ where: { id: parseInt(id) } });

    if ($music) {
        const $like = await models.musicLike.findFirst({ where: { musicId: $music.id } });

        if ($like) {
            isLiked = false;
            await models.musicLike.delete({ where: { id: $like.id } });
        } else {
            isLiked = true;
            await models.musicLike.create({ data: { musicId: $music.id } });
        }

        console.log('like update', $music.name, isLiked);
        connectors.broadcast(MUSIC_LIKE, {
            id: $music.id.toString(),
            isLiked
        });
    }
};

export const hate = async ({ id = '' }) => {
    if (!id) {
        return;
    }

    let isHated = false;
    const $music = await models.music.findUnique({ where: { id: parseInt(id) } });

    if ($music) {
        const $hate = await models.musicHate.findFirst({ where: { musicId: $music.id } });

        if ($hate) {
            isHated = false;
            await models.musicHate.delete({ where: { id: $hate.id } });
        } else {
            isHated = true;
            await models.musicHate.create({ data: { musicId: $music.id } });
        }

        console.log('hate update', $music.name, isHated);
        connectors.broadcast(MUSIC_HATE, {
            id: $music.id.toString(),
            isHated
        });
    }
};

export const count = async ({
    id = '',
    playedMs = 0,
    completionRate,
    startedAt,
    source = 'queue',
    connectorId = null
}: CountPayload) => {
    if (!id) {
        return;
    }

    const $music = await models.music.findUnique({ where: { id: parseInt(id) } });

    if ($music) {
        const endedAt = new Date();
        const requestedStartedAt = startedAt ? new Date(startedAt) : null;
        const validStartedAtMs = requestedStartedAt && !Number.isNaN(requestedStartedAt.getTime())
            ? requestedStartedAt.getTime()
            : null;
        const resolvedStartedAt = validStartedAtMs !== null
            ? new Date(Math.min(validStartedAtMs, endedAt.getTime()))
            : new Date(endedAt.getTime() - Math.max(playedMs, 0));
        const elapsedWallClockMs = Math.max(
            endedAt.getTime() - resolvedStartedAt.getTime(),
            0
        );
        const maxPlayedMs = validStartedAtMs !== null
            ? elapsedWallClockMs
            : Math.max($music.duration * 1000, PLAY_COUNT_MIN_MS);
        const normalizedPlayedMs = clamp(playedMs, 0, maxPlayedMs);

        if (normalizedPlayedMs <= 0) {
            return;
        }

        const normalizedCompletionRate = clamp(
            completionRate ?? normalizedPlayedMs / Math.max($music.duration * 1000, 1),
            0,
            1
        );
        const countedAsPlay = shouldCountAsPlay({
            durationSeconds: $music.duration,
            playedMs: normalizedPlayedMs
        });
        const updatedMusic = await models.$transaction(async (tx) => {
            await tx.playbackEvent.create({
                data: {
                    musicId: $music.id,
                    startedAt: resolvedStartedAt,
                    endedAt,
                    playedMs: normalizedPlayedMs,
                    completionRate: normalizedCompletionRate,
                    countedAsPlay,
                    source,
                    connectorId: connectorId ?? undefined
                }
            });

            return tx.music.update({
                where: { id: $music.id },
                data: {
                    playCount: countedAsPlay
                        ? { increment: 1 }
                        : undefined,
                    lastPlayedAt: endedAt,
                    totalPlayedMs: { increment: normalizedPlayedMs }
                },
                select: {
                    id: true,
                    playCount: true,
                    totalPlayedMs: true
                }
            });
        });

        await connectors.broadcast(MUSIC_COUNT, {
            id: updatedMusic.id.toString(),
            playCount: updatedMusic.playCount,
            lastPlayedAt: endedAt.toISOString(),
            totalPlayedMs: updatedMusic.totalPlayedMs,
            countedAsPlay
        });
    }
};
