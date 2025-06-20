import { useStore } from 'badland-react';
import { useState, useEffect, useCallback } from 'react';
import { Button } from '~/components/shared';
import EqualizerSlider from '~/components/shared/EqualizerSlider';
import EqualizerPreset, { Preset } from '~/components/shared/EqualizerPreset';
import { equalizerStore } from '~/store/equalizer';
import styles from './Equalizer.module.scss';

const DEFAULT_PRESETS: Preset[] = [
    {
        id: 'flat',
        name: 'Flat',
        values: { bass: 0, lowMid: 0, mid: 0, highMid: 0, treble: 0 }
    },
    {
        id: 'bass-boost',
        name: 'Bass Boost',
        values: { bass: 8, lowMid: 4, mid: 0, highMid: 0, treble: 2 }
    },
    {
        id: 'treble-boost',
        name: 'Treble Boost',
        values: { bass: 0, lowMid: 0, mid: 2, highMid: 6, treble: 8 }
    },
    {
        id: 'vocal',
        name: 'Vocal',
        values: { bass: -2, lowMid: 0, mid: 6, highMid: 4, treble: 0 }
    },
];

const Equalizer = () => {
    const [isStabilityModeEnabled] = useState(Boolean(localStorage.getItem('stability-mode::on')));
    const [equalizerState, setEqState] = useStore(equalizerStore);
    const [presets, setPresets] = useState<Preset[]>([]);
    const loadPresets = useCallback(() => {
        const savedPresets = localStorage.getItem('audio::eq::presets');
        if (savedPresets) {
            try {
                const parsedPresets = JSON.parse(savedPresets);
                setPresets([...DEFAULT_PRESETS, ...parsedPresets]);
            } catch (e) {
                console.error('Failed to parse saved presets', e);
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

    const handleSaveCurrentAsPreset = () => {
        const presetName = prompt('Enter a name for this preset:');
        if (!presetName) return;

        const newPreset: Preset = {
            id: `custom-${Date.now()}`,
            name: presetName,
            values: { ...equalizerState }
        };

        const customPresets = [...presets.filter(p => p.id.startsWith('custom-')), newPreset];
        localStorage.setItem('audio::eq::presets', JSON.stringify(customPresets));

        setPresets([...DEFAULT_PRESETS, ...customPresets]);
    };

    const handleDeletePreset = (presetId: string) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this preset?');
        if (!confirmDelete) return;

        const customPresets = presets.filter(p => p.id.startsWith('custom-') && p.id !== presetId);

        localStorage.setItem('audio::eq::presets', JSON.stringify(customPresets));

        setPresets([...DEFAULT_PRESETS, ...customPresets]);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Audio Equalizer</h1>
                <p className={styles.description}>Adjust the sliders to fine-tune your audio experience</p>
            </div>

            <EqualizerPreset
                presets={presets}
                onSelectPreset={handlePresetSelect}
                onSaveCurrentAsPreset={handleSaveCurrentAsPreset}
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
        </div>
    );
};

export default Equalizer;
