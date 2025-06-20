import { useState } from 'react';
import styles from './EqualizerPreset.module.scss';

export interface Preset {
    id: string;
    name: string;
    values: {
        bass: number;
        lowMid: number;
        mid: number;
        highMid: number;
        treble: number;
    };
}

interface EqualizerPresetProps {
    presets: Preset[];
    onSelectPreset: (preset: Preset) => void;
    onSaveCurrentAsPreset: () => void;
    onDeletePreset?: (presetId: string) => void;
}

const EqualizerPreset = ({
    presets,
    onSelectPreset,
    onSaveCurrentAsPreset,
    onDeletePreset
}: EqualizerPresetProps) => {
    const [activePreset, setActivePreset] = useState<string | null>(null);

    const handlePresetClick = (preset: Preset) => {
        setActivePreset(preset.id);
        onSelectPreset(preset);
    };

    const handleDeleteClick = (e: React.MouseEvent, presetId: string) => {
        e.stopPropagation(); // Prevent triggering the preset selection
        if (onDeletePreset) {
            onDeletePreset(presetId);
            if (activePreset === presetId) {
                setActivePreset(null);
            }
        }
    };

    const isCustomPreset = (presetId: string) => presetId.startsWith('custom-');

    return (
        <div className={styles.presetContainer}>
            <div className={styles.presetButtonGroup}>
                {presets.map((preset) => (
                    <button
                        key={preset.id}
                        className={`${styles.presetButton} ${activePreset === preset.id ? styles.active : ''}`}
                        onClick={() => handlePresetClick(preset)}
                    >
                        {preset.name}
                        {isCustomPreset(preset.id) && onDeletePreset && (
                            <span
                                className={styles.deleteIcon}
                                onClick={(e) => handleDeleteClick(e, preset.id)}
                                title="Delete preset"
                            >
                                ✕
                            </span>
                        )}
                    </button>
                ))}
                <button
                    className={styles.saveButton}
                    onClick={onSaveCurrentAsPreset}
                >
                    Save Current
                </button>
            </div>
        </div>
    );
};

export default EqualizerPreset;
