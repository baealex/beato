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

    const handleDeleteClick = (presetId: string) => {
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
                    <div key={preset.id} className={styles.presetItem}>
                        <button
                            type="button"
                            className={`${styles.presetButton} ${activePreset === preset.id ? styles.active : ''}`}
                            aria-pressed={activePreset === preset.id}
                            onClick={() => handlePresetClick(preset)}>
                            {preset.name}
                        </button>
                        {isCustomPreset(preset.id) && onDeletePreset && (
                            <button
                                type="button"
                                className={styles.deleteButton}
                                aria-label={`Delete ${preset.name} preset`}
                                onClick={() => handleDeleteClick(preset.id)}>
                                ✕
                            </button>
                        )}
                    </div>
                ))}
                <button
                    type="button"
                    className={styles.saveButton}
                    onClick={onSaveCurrentAsPreset}>
                    Save Current
                </button>
            </div>
        </div>
    );
};

export default EqualizerPreset;
