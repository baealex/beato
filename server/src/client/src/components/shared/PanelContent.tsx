import styles from './PanelContent.module.scss';

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
        <div className={styles.container}>
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
        </div>
    );
}
