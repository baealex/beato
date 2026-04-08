interface MixTimingInput {
    currentTime: number;
    fadeTime: number;
    metadataDuration?: number | null;
    mediaDuration?: number | null;
}

const isFiniteDuration = (value?: number | null): value is number => (
    typeof value === 'number'
    && Number.isFinite(value)
    && value > 0
);

export const resolveMixDuration = ({
    metadataDuration,
    mediaDuration
}: Pick<MixTimingInput, 'metadataDuration' | 'mediaDuration'>): number | null => {
    if (isFiniteDuration(metadataDuration)) {
        return metadataDuration;
    }

    if (isFiniteDuration(mediaDuration)) {
        return mediaDuration;
    }

    return null;
};

export const shouldStartMix = ({
    currentTime,
    fadeTime,
    metadataDuration,
    mediaDuration
}: MixTimingInput): boolean => {
    const duration = resolveMixDuration({
        metadataDuration,
        mediaDuration
    });

    if (duration === null || duration <= fadeTime) {
        return false;
    }

    return duration - currentTime <= fadeTime;
};
