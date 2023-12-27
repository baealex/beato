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
    gap: 16px;

    img {
        width: 72px;
        height: 72px;
        object-fit: cover;
        border-radius: 100%;
    }

    .info {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .name {
        font-size: 14px;
    }

    .count {
        display: flex;
        gap: 6px;
        font-size: 14px;
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
                    <span>/</span>
                    <div className="music">
                        {musicCount} songs
                    </div>
                </div>
            </div>
        </Container>
    )
}