import { useStore } from 'badland-react';
import { useState, useEffect, useCallback } from 'react';

import { useModal } from '~/components/app/ModalProvider';
import EqualizerPreset from '~/components/shared/EqualizerPreset';
import type { Preset } from '~/components/shared/EqualizerPreset';
import EqualizerSlider from '~/components/shared/EqualizerSlider';
import { TextEntryDialog } from '~/components/shared/Modal';
import { equalizerStore } from '~/store/equalizer';

import styles from './Equalizer.module.scss';

const DEFAULT_PRESETS: Preset[] = [
    {
        id: 'flat',
        name: 'Flat',
        values: {
            bass: 0,
            lowMid: 0,
            mid: 0,
            highMid: 0,
            treble: 0
        }
    },
    {
        id: 'bass-boost',
        name: 'Bass Boost',
        values: {
            bass: 8,
            lowMid: 4,
            mid: 0,
            highMid: 0,
            treble: 2
        }
    },
    {
        id: 'treble-boost',
        name: 'Treble Boost',
        values: {
            bass: 0,
            lowMid: 0,
            mid: 2,
            highMid: 6,
            treble: 8
        }
    },
    {
        id: 'vocal',
        name: 'Vocal',
        values: {
            bass: -2,
            lowMid: 0,
            mid: 6,
            highMid: 4,
            treble: 0
        }
    }
];

const Equalizer = () => {
    const { confirm } = useModal();
    const [isStabilityModeEnabled] = useState(Boolean(localStorage.getItem('stability-mode::on')));
    const [equalizerState, setEqState] = useStore(equalizerStore);
    const [presets, setPresets] = useState<Preset[]>([]);
    const [isSavePresetDialogOpen, setIsSavePresetDialogOpen] = useState(false);
    const [presetNameDraft, setPresetNameDraft] = useState('');
    const loadPresets = useCallback(() => {
        const savedPresets = localStorage.getItem('audio::eq::presets');
        if (savedPresets) {
            try {
                const parsedPresets = JSON.parse(savedPresets);
                setPresets([...DEFAULT_PRESETS, ...parsedPresets]);
            } catch (e) {
                setPresets(DEFAULT_PRESETS);
            }
        } else {
            setPresets(DEFAULT_PRESETS);
        }
    }, []);

    useEffect(() => {
        loadPresets();
    }, [loadPresets]);

    const handleSliderChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setEqState((state) => ({
            ...state,
            [name]: Number(e.currentTarget.value)
        }));
    };

    const handlePresetSelect = (preset: Preset) => {
        setEqState(() => ({ ...preset.values }));
    };

    const handleOpenSavePresetDialog = () => {
        setPresetNameDraft('');
        setIsSavePresetDialogOpen(true);
    };

    const handleCloseSavePresetDialog = () => {
        setIsSavePresetDialogOpen(false);
        setPresetNameDraft('');
    };

    const handleSaveCurrentAsPreset = (presetName: string) => {
        const newPreset: Preset = {
            id: `custom-${Date.now()}`,
            name: presetName,
            values: { ...equalizerState }
        };

        const customPresets = [...presets.filter(p => p.id.startsWith('custom-')), newPreset];
        localStorage.setItem('audio::eq::presets', JSON.stringify(customPresets));

        setPresets([...DEFAULT_PRESETS, ...customPresets]);
        handleCloseSavePresetDialog();
    };

    const handleDeletePreset = async (presetId: string) => {
        const confirmDelete = await confirm({
            title: 'Delete preset?',
            description: 'This custom preset will be removed from saved equalizer settings.',
            confirmLabel: 'Delete preset',
            tone: 'danger'
        });
        if (!confirmDelete) return;

        const customPresets = presets.filter(p => p.id.startsWith('custom-') && p.id !== presetId);

        localStorage.setItem('audio::eq::presets', JSON.stringify(customPresets));

        setPresets([...DEFAULT_PRESETS, ...customPresets]);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Audio Equalizer</h1>
                <p className={styles.description}>Adjust playback tone by frequency band.</p>
            </div>

            <EqualizerPreset
                presets={presets}
                onSelectPreset={handlePresetSelect}
                onSaveCurrentAsPreset={handleOpenSavePresetDialog}
                onDeletePreset={handleDeletePreset}
            />

            <div className={styles.sliderGroup}>
                {Object.entries(equalizerState).map(([name, value]) => (
                    <EqualizerSlider
                        key={name}
                        name={name}
                        value={value}
                        onChange={handleSliderChange(name)}
                    />
                ))}
            </div>

            {isStabilityModeEnabled && (
                <div className={styles.stabilityMode}>
                    You're in stability mode.
                </div>
            )}

            <TextEntryDialog
                open={isSavePresetDialogOpen}
                title="Save preset"
                description="Store the current equalizer curve as a reusable preset."
                value={presetNameDraft}
                placeholder="Late night"
                confirmLabel="Save preset"
                onValueChange={setPresetNameDraft}
                onConfirm={handleSaveCurrentAsPreset}
                onClose={handleCloseSavePresetDialog}
            />
        </div>
    );
};

export default Equalizer;
