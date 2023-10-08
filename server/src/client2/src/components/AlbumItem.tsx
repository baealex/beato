import styled from '@emotion/styled'

import Image from './Image'

interface AlbumItemProps {
    albumCover: string;
    albumName: string;
    artistName: string;
    onClick: () => void;
}

const Container = styled.button`
    display: flex;
    flex-direction: column;
    text-align: left;
    gap: 0.25rem;
    border-radius: 0.5rem;
    background-color: #111;
    transition: background-color 0.2s ease-in-out;
    padding-bottom: 0.5rem;

    @media (min-width: 1024px) {
        &:hover {
            background-color: #222222;
        }
    }

    .cover {
        flex: 1;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 0.5rem;
        padding-bottom: 0.5rem;
    }

    .title,
    .artist {
        padding: 0 0.5rem;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .title {
        color: #eeeeee;
        font-weight: bold;
    }

    .artist {
        color: #aaaaaa;
    }
`

export default function AlbumItem({ albumCover, albumName, artistName, onClick }: AlbumItemProps) {
    return (
        <Container onClick={onClick}>
            <Image className="cover" src={albumCover} alt={albumName} />
            <span className="title">{albumName}</span>
            <span className="artist">{artistName}</span>
        </Container>
    )
}