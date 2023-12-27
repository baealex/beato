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
    gap: 4px;
    border-radius: 16px;
    background-color: #111;
    transition: background-color 0.2s ease-in-out;
    padding: 4px 4px 8px;

    @media (min-width: 1024px) {
        &:hover {
            background-color: #222;
        }
    }

    .cover {
        flex: 1;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 12px 12px 0 0;
        padding-bottom: 8px;
    }

    .title,
    .artist {
        padding: 0 8px;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .title {
        font-size: 14px;
        font-weight: bold;
        color: #eee;
    }

    .artist {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.65);
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