import styled from '@emotion/styled'

import Image from './Image'

const Container = styled.div`
    display: grid;

    &.col-1 {
        grid-template-columns: repeat(1, 1fr);
        grid-template-rows: repeat(1, 1fr);
    }

    &.col-2 {
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 1fr);
    }

    &.col-3 {
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(3, 1fr);
    }

    &.col-4 {
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(4, 1fr);
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`

interface GridImageProps {
    images: string[]
    className?: string
}

export default function GridImage({
    images,
    className,
}: GridImageProps) {
    const col = images.length >= 16 ? 4 : images.length >= 9 ? 3 : images.length >= 4 ? 2 : 1

    return (
        <Container className={`${className} col-${col}`}>
            {images.length === 0 && (
                <Image />
            )}
            {images.slice(0, col * col).map((image, index) => (
                <Image
                    key={index}
                    src={image}
                    alt=""
                />
            ))}
        </Container>
    )
}
