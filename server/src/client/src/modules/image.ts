export const getImage = (src?: string) => {
    if (!src) {
        return '/images/beato.jpg'
    }
    return src
}