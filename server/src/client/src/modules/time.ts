export const makePlayTime = (time: number) => {
    return `${Math.floor(time / 60) | 0}:${("0" + (Math.round(time) % 60)).slice(-2)}`;
};