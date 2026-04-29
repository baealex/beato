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
    activePresetId?: string | null;
    disabled?: boolean;
    onSelectPreset: (preset: Preset) => void;
    onSaveCurrentAsPreset: () => void;
    onDeletePreset?: (presetId: string) => void;
}

const EqualizerPreset = ({
    presets,
    activePresetId = null,
    disabled = false,
    onSelectPreset,
    onSaveCurrentAsPreset,
    onDeletePreset
}: EqualizerPresetProps) => {
    const handlePresetClick = (preset: Preset) => {
        onSelectPreset(preset);
    };

    const handleDeleteClick = (presetId: string) => {
        if (onDeletePreset) {
            onDeletePreset(presetId);
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
                            className={`${styles.presetButton} ${activePresetId === preset.id ? styles.active : ''}`}
                            aria-pressed={activePresetId === preset.id}
                            disabled={disabled}
                            onClick={() => handlePresetClick(preset)}>
                            {preset.name}
                        </button>
                        {isCustomPreset(preset.id) && onDeletePreset && (
                            <button
                                type="button"
                                className={styles.deleteButton}
                                aria-label={`Delete ${preset.name} preset`}
                                disabled={disabled}
                                onClick={() => handleDeleteClick(preset.id)}>
                                ✕
                            </button>
                        )}
                    </div>
                ))}
                <button
                    type="button"
                    className={styles.saveButton}
                    disabled={disabled}
                    onClick={onSaveCurrentAsPreset}>
                    Save Current
                </button>
            </div>
        </div>
    );
};

export default EqualizerPreset;
