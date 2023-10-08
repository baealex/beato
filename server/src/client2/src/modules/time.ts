export const makePlayTime = (seconds: number) => {
    return `${Math.floor(seconds / 60)}:${('0' + Math.floor(seconds % 60)).slice(-2)}`
}

export const getFormattedDate = (date: Date) => {
    const year = date.getFullYear()
    const month = ('0' + (date.getMonth() + 1)).slice(-2)
    const day = ('0' + date.getDate()).slice(-2)
    const hour = ('0' + date.getHours()).slice(-2)
    const minute = ('0' + date.getMinutes()).slice(-2)
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute
}

export const convertToMillisecond = (second: number) => {
    return Math.floor(second * 1000)
}

export const convertToSecond = (millisecond: number) => {
    return millisecond / 1000
}