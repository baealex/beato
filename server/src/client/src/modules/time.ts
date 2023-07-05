export const makePlayTime = (time: number) => {
    return `${Math.floor(time / 60) | 0}:${("0" + (Math.round(time) % 60)).slice(-2)}`;
};

export const getFormattedDate = (date: Date) => {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return year + '-' + month + '-' + day;
}
