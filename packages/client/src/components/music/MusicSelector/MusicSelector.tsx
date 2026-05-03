
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
                className={`${'ow-music-selector-MusicSelector'} clickable ${active ? 'ow-music-selector-active' : ''}`}
                onClick={onClick}>
                <CheckBox />
                {label}
            </button>
            {active && (
                <button
                    className={`${'ow-music-selector-MusicSelector'} clickable`}
                    onClick={onSelectAll}>
                    <DoubleCheck />
                    Select All
                </button>
            )}
        </>
    );
}
