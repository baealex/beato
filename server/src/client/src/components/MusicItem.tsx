import styled from '@emotion/styled'

import Image from './Image'
import { Heart, MoreVerticalFill } from '~/icon'

interface MusicItemProps {
    id?: number;
    albumName: string;
    albumCover?: string;
    artistName: string;
    trackNumber?: number;
    musicName: string;
    musicCodec?: string;
    isLiked?: boolean;
    onClick?: () => void;
    onLongPress?: () => void;
}

const Container = styled.button<{ hasAlbumCover: boolean, hasLongPress: boolean }>`
    color: #eee;
    font-size: 0.8rem;
    cursor: pointer;
    padding: 1rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.75rem;
    width: 100%;

    @media (min-width: 1024px) {
        &:hover {
            background-color: rgba(255, 255, 255, 0.1);
        }
    }

    .album-art {
        width: 45px;
        height: 45px;
        border-radius: 0.25rem;
        object-fit: cover;
    }

    .row {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        flex: 1;
        width: 100%;
        max-width: ${props => props.hasAlbumCover ? 'calc(100% - 45px - 0.75rem)' : '100%'};
        gap: 0.75rem;

        .info {
            display: flex;
            flex-direction: column;
            flex: 1;
            width: 100%;
            max-width: ${props => props.hasLongPress ? 'calc(100% - 2.5rem - 0.75rem)' : '100%'};
            gap: 0.125rem;
        }

        .artist,
        .title {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .artist {
            font-size: 0.8rem;
            color: rgba(255, 255, 255, 0.5);
        }

        .title {
            font-size: 0.9rem;

            .track-number {
                margin-right: 0.25rem;
                color: #666;
                font-weight: 400;
            }

            .codec {
                border: 1px solid #333;
                color: #eee;
                margin-left: 0.25rem;
                padding: 0.1rem 0.5rem;
                border-radius: 0.5rem;
                font-size: 0.6rem;
                font-weight: 400;
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

            &.liked {
                svg {
                    fill: #a076f1;
                    color: #a076f1;
                }
            }

            @media (min-width: 1024px) {
                &:hover {
                    background-color: rgba(255, 255, 255, 0.1);
                }
            }
        }
    }
`

export default function MusicItem({
    albumName,
    albumCover,
    artistName,
    trackNumber,
    musicName,
    musicCodec,
    isLiked,
    onClick,
    onLongPress,
}: MusicItemProps) {
    return (
        <Container
            className="clickable"
            onClick={onClick}
            onContextMenu={(e) => {
                e.preventDefault()
                onLongPress?.()
            }}
            hasAlbumCover={typeof albumCover === 'string'}
            hasLongPress={typeof onLongPress === 'function'}
        >
            {typeof albumCover === 'string' && (
                <Image className="album-art" src={albumCover} alt={albumName} />
            )}
            <div className="row">
                <div className="info">
                    <div className="title">
                        {!!trackNumber && (
                            <span className="track-number">{trackNumber}.</span>
                        )}
                        {musicName}
                        {musicCodec && musicCodec.toLocaleLowerCase() === 'flac' && (
                            <span className="codec">{musicCodec}</span>
                        )}
                    </div>
                    <div className="artist">
                        {artistName}
                    </div>
                </div>
                {onLongPress && (
                    <button
                        className={`icon-button ${isLiked ? 'liked' : ''}`}
                        onClick={(e) => {
                            e.stopPropagation()
                            onLongPress?.()
                        }}>
                        {isLiked ? (
                            <Heart />
                        ) : (
                            <MoreVerticalFill />
                        )}
                    </button>
                )}
            </div>
        </Container>
    )
}
