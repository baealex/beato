import styled from '@emotion/styled'

interface PanelContentProps {
    header?: React.ReactNode
    items?: {
        icon: React.ReactNode
        text: string
        isActive?: boolean
        onClick: () => void
    }[]
    footer?: React.ReactNode
}

const Container = styled.div`
    .panel-content {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        margin-top: 1.5rem;
        padding-bottom: 1.5rem;
        border-bottom: 1px solid #333;
    }

    .panel-album {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;

        img {
            width: 60px;
            height: 60px;
            object-fit: cover;
            border-radius: 5px;
            transition: border-radius 0.25s ease-in-out;
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
                
                &:nth-of-type(1) {
                    border-radius: 5px 0 0 0;
                }

                &:nth-of-type(2) {
                    border-radius: 0 5px 0 0;
                }

                &:nth-of-type(3) {
                    border-radius: 0 0 0 5px;
                }

                &:nth-of-type(4) {
                    border-radius: 0 0 5px 0;
                }
            }
        }
    }

    .panel-artist {
        display: flex;
        flex-direction: column;
    }

    .panel-sub-title {
        font-size: 0.875rem;
        color: #888;
        margin-bottom: 0.25rem;
    }

    .panel-sub-content {
        font-size: 0.875rem;
        font-weight: bold;
    }

    .items {
        padding: 0;
        margin: 0;
        list-style: none;
        display: flex;
        flex-direction: column;
        border-bottom: 1px solid #333;
        padding: 1rem 0;

        .item {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem 0;
            border-radius: 0.5rem;

            @media (min-width: 1024px) {
                &:hover {
                    background-color: #333;
                }
            }

            svg {
                width: 1.125rem;
                height: 1.125rem;
            }

            &.active {
                svg {
                    fill: #a076f1;
                    color: #a076f1;
                }
            }
        }
    }

    .detail-info {
        padding: 1rem 0 0;
        font-size: 0.8rem;
        color: #aaa;
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;
        gap: 0.5rem;
    }
`

export default function PanelContent({ header, items, footer }: PanelContentProps) {
    return (
        <Container>
            {header && (
                <div className="panel-content">
                    {header}
                </div>
            )}
            {items && (
                <div className="items">
                    {items.map(({ icon, text, isActive, onClick }) => (
                        <button
                            className={`clickable item ${isActive ? 'active' : ''}`}
                            onClick={onClick}
                        >
                            {icon}
                            <span className="text">{text}</span>
                        </button>
                    ))}
                </div>
            )}
            {footer && (
                <div className="detail-info">
                    {footer}
                </div>
            )}
        </Container>
    )
}