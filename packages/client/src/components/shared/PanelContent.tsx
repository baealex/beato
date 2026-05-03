
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

export default function PanelContent({ header, items, footer }: PanelContentProps) {
    return (
        <div className={'ow-panel-content-container'}>
            {header && (
                <div className="ow-panel-content-panel-content">
                    {header}
                </div>
            )}
            {items && (
                <div className="ow-panel-content-items">
                    {items.map(({ icon, text, isActive, onClick }) => (
                        <button
                            key={text}
                            className={`clickable ow-panel-content-item ${isActive ? 'ow-panel-content-active' : ''}`}
                            onClick={onClick}>
                            {icon}
                            <span className="ow-panel-content-text">{text}</span>
                        </button>
                    ))}
                </div>
            )}
            {footer && (
                <div className="ow-panel-content-detail-info">
                    {footer}
                </div>
            )}
        </div>
    );
}
