import styled from '@emotion/styled';

interface PanelContentProps {
    header?: React.ReactNode;
    items?: {
        icon: React.ReactNode;
        text: string;
        isActive?: boolean;
        onClick: () => void;
    }[];
    footer?: React.ReactNode;
}

const Container = styled.div`
    .panel-content {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        margin-top: 1.5rem;
        padding-bottom: 1.5rem;
        border-bottom: 1px solid var(--b-color-border);
    }

    .panel-album {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
        overflow: hidden;
        border-radius: 0.5rem;

        & > img {
            width: 60px;
            height: 60px;
            object-fit: cover;
            border-radius: 0.5rem;
        }

        .album-cover-grid {
            width: 60px;
            height: 60px;
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
        border-bottom: 1px solid var(--b-color-border);
        padding: 1rem 0;

        .item {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem 0;
            border-radius: 0.5rem;

            svg {
                width: 1.125rem;
                height: 1.125rem;
            }

            &.active {
                svg {
                    fill: var(--b-color-point);
                    color: var(--b-color-point);
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
`;

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
                            key={text}
                            className={`clickable item ${isActive ? 'active' : ''}`}
                            onClick={onClick}>
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
    );
}
