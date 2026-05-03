import classNames from 'classnames';
import type { EqualizerState } from '~/store/equalizer';

const cx = classNames;

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

const buttonClass = 'min-h-9 border-0 bg-transparent px-3 py-2 text-left text-xs font-semibold text-[var(--b-color-text-secondary)] transition-[color,background-color] duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--b-color-focus)] disabled:cursor-not-allowed disabled:opacity-50 enabled:hover:bg-[var(--b-color-hover)] enabled:hover:text-[var(--b-color-text)]';

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
        <div className="w-full">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(7rem,1fr))] gap-2 max-sm:grid-cols-1">
                {presets.map((preset) => (
                    <div key={preset.id} className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] overflow-hidden rounded-[var(--b-radius-md)] border border-[var(--b-color-border-subtle)] bg-[var(--b-color-surface-subtle)] transition-[border-color,background-color] duration-150 hover:border-[var(--b-color-border)]">
                        <button
                            type="button"
                            className={cx(buttonClass, 'truncate', activePresetId === preset.id && 'bg-[var(--b-color-active)] text-[var(--b-color-text)]')}
                            aria-pressed={activePresetId === preset.id}
                            disabled={disabled}
                            onClick={() => handlePresetClick(preset)}>
                            {preset.name}
                        </button>
                        {isCustomPreset(preset.id) && onDeletePreset && (
                            <button
                                type="button"
                                className={cx(buttonClass, 'border-l border-[var(--b-color-border-subtle)] px-2.5 text-[rgba(254,202,202,0.92)]')}
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
                    className="min-h-9 rounded-[var(--b-radius-md)] border border-[var(--b-color-focus)] bg-[var(--b-color-active)] px-3 py-2 text-xs font-semibold text-[var(--b-color-point-light)] transition-[color,background-color,border-color] duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--b-color-focus)] disabled:cursor-not-allowed disabled:opacity-50 enabled:hover:bg-[var(--b-color-hover)] enabled:hover:text-[var(--b-color-text)]"
                    disabled={disabled}
                    onClick={onSaveCurrentAsPreset}>
                    Save Current
                </button>
            </div>
        </div>
    );
};

export default EqualizerPreset;
