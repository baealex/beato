import styled from '@emotion/styled'

import Image from './Image'

interface ArtistItemProps {
    artistName: string;
    artistCover: string;
    albumCount: number;
    musicCount: number;
    onClick: () => void;
}

const Container = styled.button`
    cursor: pointer;
    padding: 1rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.75rem;

    img {
        width: 4rem;
        height: 4rem;
        object-fit: cover;
        border-radius: 100%;
    }

    .info {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }

    .count {
        display: flex;
        gap: 0.25rem;
        font-size: 0.75rem;
        color: rgba(255, 255, 255, 0.5);
    }

    @media (min-width: 1024px) {
        &:hover {
            background-color: rgba(255, 255, 255, 0.1);
        }
    }
`

export default function ArtistItem({
    artistName,
    artistCover,
    albumCount,
    musicCount,
    onClick,
}: ArtistItemProps) {
    return (
        <Container className="clickable linkable" onClick={onClick}>
            <Image
                src={artistCover}
                alt={artistName}
            />
            <div className="info">
                <div className="name">
                    {artistName}
                </div>
                <div className="count">
                    <div className="album">
                        {albumCount} albums
                    </div>
                    <span> / </span>
                    <div className="music">
                        {musicCount} songs
                    </div>
                </div>
            </div>
        </Container>
    )
}