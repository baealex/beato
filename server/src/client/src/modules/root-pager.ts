import { appShell, type AppShellNavigationItem } from '~/config/app-shell';

const ROOT_PAGER_ACTIVATION_DISTANCE_PX = 4;
const ROOT_PAGER_HORIZONTAL_DOMINANCE_RATIO = 1.02;
const ROOT_PAGER_COMMIT_PROGRESS = 0.22;
const ROOT_PAGER_COMMIT_VELOCITY_PX_PER_MS = 0.3;
const ROOT_PAGER_RELEASE_VELOCITY_SAMPLE_MS = 120;

export interface RootPagerVelocitySample {
    at: number;
    x: number;
}

export const ROOT_PAGER_PAGES: AppShellNavigationItem[] = [
    ...appShell.navigation.primary,
    ...appShell.navigation.utility
];

export const resolveRootPagerPageIndex = (pathname: string) => {
    return ROOT_PAGER_PAGES.findIndex(page => page.path === pathname);
};

export const shouldActivateRootPagerGesture = ({
    deltaX,
    deltaY
}: {
    deltaX: number;
    deltaY: number;
}) => {
    return (
        Math.abs(deltaX) >= ROOT_PAGER_ACTIVATION_DISTANCE_PX
        && Math.abs(deltaX) > Math.abs(deltaY) * ROOT_PAGER_HORIZONTAL_DOMINANCE_RATIO
    );
};

export const resolveRootPagerReleaseVelocity = ({
    samples,
    releasedX,
    releasedAt
}: {
    samples: RootPagerVelocitySample[];
    releasedX: number;
    releasedAt: number;
}) => {
    const anchor = samples.find(sample => releasedAt - sample.at <= ROOT_PAGER_RELEASE_VELOCITY_SAMPLE_MS)
        ?? samples[0];

    if (!anchor) {
        return 0;
    }

    const deltaTime = Math.max(releasedAt - anchor.at, 1);

    return (releasedX - anchor.x) / deltaTime;
};

export const resolveRootPagerCommitIndex = ({
    currentIndex,
    maxIndex,
    offset,
    width,
    velocityPxPerMs
}: {
    currentIndex: number;
    maxIndex: number;
    offset: number;
    width: number;
    velocityPxPerMs: number;
}) => {
    if (width <= 0 || offset === 0) {
        return currentIndex;
    }

    const isMovingToPrevious = offset > 0;
    const targetIndex = isMovingToPrevious ? currentIndex - 1 : currentIndex + 1;

    if (targetIndex < 0 || targetIndex > maxIndex) {
        return currentIndex;
    }

    const hasEnoughDistance = Math.abs(offset) / width >= ROOT_PAGER_COMMIT_PROGRESS;
    const hasEnoughVelocity = Math.abs(velocityPxPerMs) >= ROOT_PAGER_COMMIT_VELOCITY_PX_PER_MS;
    const isVelocityAligned = isMovingToPrevious
        ? velocityPxPerMs >= 0
        : velocityPxPerMs <= 0;

    if (hasEnoughDistance || (hasEnoughVelocity && isVelocityAligned)) {
        return targetIndex;
    }

    return currentIndex;
};
