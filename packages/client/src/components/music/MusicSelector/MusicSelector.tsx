import styles from './MusicSelector.module.scss';

import { CheckBox, DoubleCheck } from '~/icon';

interface MusicSelectorProps {
    active: boolean;
    label: string;
    onClick: () => void;
    onSelectAll: () => void;
}

export default function MusicSelector({
    active,
    label,
    onClick,
    onSelectAll
}: MusicSelectorProps) {
    return (
        <>
            <button
                className={`${styles.MusicSelector} clickable ${active ? 'active' : ''}`}
                onClick={onClick}>
                <CheckBox />
                {label}
            </button>
            {active && (
                <button
                    className={`${styles.MusicSelector} clickable`}
                    onClick={onSelectAll}>
                    <DoubleCheck />
                    Select All
                </button>
            )}
        </>
    );
}
