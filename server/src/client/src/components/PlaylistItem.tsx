import styled from '@emotion/styled'
import { useStore } from 'badland-react'

import GridImage from './GridImage'
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

    .cover {
        width: 60px;
        height: 60px;
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
            <GridImage
                className="cover"
                images={headerMusics.map((music) => musicMap.get(music.id)?.album.cover ?? '')}
            />
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