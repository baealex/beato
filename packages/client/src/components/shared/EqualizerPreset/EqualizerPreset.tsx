import type { EqualizerState } from '~/store/equalizer';

export interface Preset {
    id: string;
    name: string;
    values: EqualizerState;
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
        <div className={'ow-equalizer-preset-presetContainer'}>
            <div className={'ow-equalizer-preset-presetButtonGroup'}>
                {presets.map((preset) => (
                    <div key={preset.id} className={'ow-equalizer-preset-presetItem'}>
                        <button
                            type="button"
                            className={`${'ow-equalizer-preset-presetButton'} ${activePresetId === preset.id ? 'ow-equalizer-preset-active' : ''}`}
                            aria-pressed={activePresetId === preset.id}
                            disabled={disabled}
                            onClick={() => handlePresetClick(preset)}>
                            {preset.name}
                        </button>
                        {isCustomPreset(preset.id) && onDeletePreset && (
                            <button
                                type="button"
                                className={'ow-equalizer-preset-deleteButton'}
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
                    className={'ow-equalizer-preset-saveButton'}
                    disabled={disabled}
                    onClick={onSaveCurrentAsPreset}>
                    Save Current
                </button>
            </div>
        </div>
    );
};

export default EqualizerPreset;
