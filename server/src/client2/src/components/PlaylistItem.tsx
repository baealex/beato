import styled from '@emotion/styled'
import { useStore } from 'badland-react'

import Image from './Image'
import { MoreVerticalFill } from '~/icon'

import { Music } from '~/models/type'

import { musicStore } from '~/store/music'

const Container = styled.button`
    color: #eee;
    font-size: 0.8rem;
    padding: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;

    @media (min-width: 1024px) {
        &:hover {
            background-color: rgba(255, 255, 255, 0.1);
        }
    }

    .icon-button {
        color: #eee;
        width: 2.5rem;
        height: 2.5rem;

        svg {
            width: 1.125rem;
            height: 1.125rem;
        }

        @media (min-width: 1024px) {
            &:hover {
                background-color: rgba(255, 255, 255, 0.1);
            }
        }
    }

    .title {
        flex: 1;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        gap: 0.25rem;
    }

    .song-count {
        font-size: 0.875rem;
        color: #aaa;
    }

    .album-cover-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 1fr);
        width: 60px;
        height: 60px;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .album-cover {
        width: 60px;
        height: 60px;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
`

interface PlaylistItemProps {
    name: string;
    headerMusics: Pick<Music, 'id'>[];
    musicCount: number;
    onClick?: () => void;
    onLongPress?: () => void;
}

export default function PlaylistItem({
    name,
    headerMusics,
    musicCount,
    onClick,
    onLongPress,
}: PlaylistItemProps) {
    const [{ musicMap }] = useStore(musicStore)

    return (
        <Container
            className="clickable"
            onClick={onClick}
            onContextMenu={(e) => {
                e.preventDefault()
                onLongPress?.()
            }}
        >
            {headerMusics.length >= 4 && (
                <div className="album-cover-grid">
                    {headerMusics.slice(0, 4).map(({ id }) => (
                        <Image
                            key={id}
                            src={musicMap.get(id)?.album.cover || ''}
                            alt={musicMap.get(id)?.album.name}
                        />
                    ))}
                </div>
            )}
            {headerMusics.length < 4 && headerMusics.length !== 0 && (
                <div className="album-cover">
                    <Image
                        src={musicMap.get(headerMusics[0].id)?.album.cover || ''}
                        alt={musicMap.get(headerMusics[0].id)?.album.name}
                    />
                </div>
            )}
            {headerMusics.length === 0 && (
                <div className="album-cover">
                    <Image src="" alt="" />
                </div>
            )}
            <div className="title">
                <div className="album-name">{name}</div>
                <div className="song-count">{musicCount} songs</div>
            </div>
            {onLongPress && (
                <button className="icon-button" onClick={(e) => {
                    e.stopPropagation()
                    onLongPress()
                }}>
                    <MoreVerticalFill />
                </button>
            )}
        </Container>
    )
}