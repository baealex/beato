export const DEFAULT_FIXED_VIRTUAL_OVERSCAN_PX = 320;

export interface FixedVirtualRange {
    startIndex: number;
    endIndex: number;
    totalHeight: number;
}

export const resolveFixedVirtualRange = ({
    count,
    rowHeight,
    scrollTop,
    viewportHeight,
    overscanPx = DEFAULT_FIXED_VIRTUAL_OVERSCAN_PX
}: {
    count: number;
    rowHeight: number;
    scrollTop: number;
    viewportHeight: number;
    overscanPx?: number;
}) => {
    if (count <= 0 || rowHeight <= 0) {
        return {
            startIndex: 0,
            endIndex: 0,
            totalHeight: 0
        } satisfies FixedVirtualRange;
    }

    const safeScrollTop = Math.max(scrollTop, 0);
    const safeViewportHeight = Math.max(viewportHeight, 0);
    const safeOverscanPx = Math.max(overscanPx, 0);
    const totalHeight = count * rowHeight;
    const rangeStart = Math.max(safeScrollTop - safeOverscanPx, 0);
    const rangeEnd = Math.min(
        safeScrollTop + safeViewportHeight + safeOverscanPx,
        totalHeight
    );

    return {
        startIndex: Math.max(Math.floor(rangeStart / rowHeight), 0),
        endIndex: Math.min(Math.ceil(rangeEnd / rowHeight), count),
        totalHeight
    } satisfies FixedVirtualRange;
};

export const resolveFixedVirtualItemTop = ({
    index,
    rowHeight
}: {
    index: number;
    rowHeight: number;
}) => {
    return Math.max(index, 0) * Math.max(rowHeight, 0);
};
