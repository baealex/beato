export const getNextSelectedIndexAfterRemovingCurrent = (
    prevSelected: number,
    nextLength: number
) => {
    return Math.min(prevSelected, nextLength - 1);
};
