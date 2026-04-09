export interface QueueDerivedState {
    selected: number | null;
    currentTrackId: string | null;
    queueLength: number;
}

const isValidSelectedIndex = (items: string[], selected: number | null) => {
    return selected !== null && selected >= 0 && selected < items.length;
};

export const getCurrentTrackId = (items: string[], selected: number | null) => {
    if (selected === null) {
        return null;
    }

    if (!isValidSelectedIndex(items, selected)) {
        return null;
    }

    return items[selected];
};

export const getSelectedIndexForTrack = (items: string[], trackId: string | null) => {
    if (!trackId) {
        return null;
    }

    const index = items.indexOf(trackId);

    return index >= 0 ? index : null;
};

export const deriveQueueState = (items: string[], selected: number | null): QueueDerivedState => {
    const currentTrackId = getCurrentTrackId(items, selected);

    return {
        selected: currentTrackId === null ? null : selected,
        currentTrackId,
        queueLength: items.length
    };
};

export const deriveQueueStateFromTrack = (items: string[], trackId: string | null) => {
    return deriveQueueState(items, getSelectedIndexForTrack(items, trackId));
};

export const reorderQueueItems = (items: string[], activeId: string, overId: string) => {
    const oldIndex = items.indexOf(activeId);
    const newIndex = items.indexOf(overId);

    if (oldIndex < 0 || newIndex < 0 || oldIndex === newIndex) {
        return items;
    }

    return moveQueueItemToIndex(items, activeId, newIndex);
};

export const moveQueueItemToIndex = (items: string[], activeId: string, targetIndex: number) => {
    const oldIndex = items.indexOf(activeId);

    if (oldIndex < 0) {
        return items;
    }

    const safeTargetIndex = Math.min(Math.max(targetIndex, 0), items.length - 1);

    if (oldIndex === safeTargetIndex) {
        return items;
    }

    const nextItems = [...items];
    const [movedItem] = nextItems.splice(oldIndex, 1);

    nextItems.splice(safeTargetIndex, 0, movedItem);

    return nextItems;
};
