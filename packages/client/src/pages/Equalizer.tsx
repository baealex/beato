import { useAppStore as useStore } from '~/store/base-store';
import {
    useState,
    useEffect,
    useCallback,
    useMemo,
    type ChangeEvent,
    type CSSProperties
} from 'react';

import { useModal } from '~/components/app/ModalProvider';
import { Button } from '~/components/shared';
import EqualizerPreset from '~/components/shared/EqualizerPreset';
import type { Preset } from '~/components/shared/EqualizerPreset';
import EqualizerSlider from '~/components/shared/EqualizerSlider';
import { TextEntryDialog } from '~/components/shared/Modal';
import { equalizerStore } from '~/store/equalizer';

import styles from './Equalizer.module.scss';

type EqualizerValues = Preset['values'];
type EqualizerBand = keyof EqualizerValues;

const EQUALIZER_BANDS = [
    {
        id: 'bass',
        label: 'Bass',
        frequency: '60 Hz',
        tone: 'Weight'
    },
    {
        id: 'lowMid',
        label: 'Low Mid',
        frequency: '250 Hz',
        tone: 'Warmth'
    },
    {
        id: 'mid',
        label: 'Mid',
        frequency: '1 kHz',
        tone: 'Presence'
    },
    {
        id: 'highMid',
        label: 'High Mid',
        frequency: '4 kHz',
        tone: 'Clarity'
    },
    {
        id: 'treble',
        label: 'Treble',
        frequency: '12 kHz',
        tone: 'Air'
    }
] as const satisfies ReadonlyArray<{
    id: EqualizerBand;
    label: string;
    frequency: string;
    tone: string;
}>;

const FLAT_VALUES: EqualizerValues = {
    bass: 0,
    lowMid: 0,
    mid: 0,
    highMid: 0,
    treble: 0
};

const DEFAULT_PRESETS: Preset[] = [
    {
        id: 'flat',
        name: 'Flat',
        values: FLAT_VALUES
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

const isEqualizerValues = (values: unknown): values is EqualizerValues => {
    if (!values || typeof values !== 'object') {
        return false;
    }

    const record = values as Record<string, unknown>;

    return EQUALIZER_BANDS.every(({ id }) => typeof record[id] === 'number');
};

const parseCustomPresets = (savedPresets: string | null) => {
    if (!savedPresets) {
        return [];
    }

    try {
        const parsedPresets: unknown = JSON.parse(savedPresets);

        if (!Array.isArray(parsedPresets)) {
            return [];
        }

        return parsedPresets.filter((preset): preset is Preset => {
            return Boolean(
                preset &&
                typeof preset === 'object' &&
                typeof (preset as Preset).id === 'string' &&
                (preset as Preset).id.startsWith('custom-') &&
                typeof (preset as Preset).name === 'string' &&
                isEqualizerValues((preset as Preset).values)
            );
        });
    } catch {
        return [];
    }
};

const isSameCurve = (a: EqualizerValues, b: EqualizerValues) => {
    return EQUALIZER_BANDS.every(({ id }) => a[id] === b[id]);
};

const getToneSummary = (values: EqualizerValues) => {
    const lowEnergy = values.bass + values.lowMid;
    const highEnergy = values.highMid + values.treble;
    const totalAbsGain = EQUALIZER_BANDS.reduce((sum, { id }) => sum + Math.abs(values[id]), 0);

    if (totalAbsGain <= 2) {
        return 'Balanced';
    }

    if (lowEnergy - highEnergy >= 4) {
        return 'Warm';
    }

    if (highEnergy - lowEnergy >= 4) {
        return 'Bright';
    }

    if (values.mid + values.highMid >= 5) {
        return 'Forward';
    }

    return 'Custom';
};

const Equalizer = () => {
    const { confirm } = useModal();
    const [isStabilityModeEnabled] = useState(Boolean(localStorage.getItem('stability-mode::on')));
    const [equalizerState, setEqState] = useStore(equalizerStore);
    const [presets, setPresets] = useState<Preset[]>([]);
    const [isSavePresetDialogOpen, setIsSavePresetDialogOpen] = useState(false);
    const [presetNameDraft, setPresetNameDraft] = useState('');
    const loadPresets = useCallback(() => {
        const savedPresets = localStorage.getItem('audio::eq::presets');
        setPresets([...DEFAULT_PRESETS, ...parseCustomPresets(savedPresets)]);
    }, []);

    useEffect(() => {
        loadPresets();
    }, [loadPresets]);

    const activePreset = useMemo(() => {
        return presets.find((preset) => isSameCurve(preset.values, equalizerState)) ?? null;
    }, [equalizerState, presets]);
    const isFlat = isSameCurve(equalizerState, FLAT_VALUES);
    const toneSummary = getToneSummary(equalizerState);

    const curvePoints = EQUALIZER_BANDS.map(({ id }, index) => {
        const x = 8 + (index / (EQUALIZER_BANDS.length - 1)) * 84;
        const y = 50 - (equalizerState[id] / 10) * 38;

        return {
            id,
            style: {
                '--eq-x': `${x}%`,
                '--eq-y': `${y}%`
            } as CSSProperties
        };
    });

    const handleSliderChange = (name: EqualizerBand) => (e: ChangeEvent<HTMLInputElement>) => {
        setEqState((state) => ({
            ...state,
            [name]: Number(e.currentTarget.value)
        }));
    };

    const handlePresetSelect = (preset: Preset) => {
        setEqState(() => ({ ...preset.values }));
    };

    const handleBandReset = (name: EqualizerBand) => {
        setEqState((state) => ({
            ...state,
            [name]: 0
        }));
    };

    const handleResetCurve = () => {
        setEqState(() => ({ ...FLAT_VALUES }));
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
        const trimmedPresetName = presetName.trim();

        if (!trimmedPresetName) {
            return;
        }

        const newPreset: Preset = {
            id: `custom-${Date.now()}`,
            name: trimmedPresetName,
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
            <section className={styles.hero}>
                <div className={styles.header}>
                    <span className={styles.eyebrow}>Playback tone</span>
                    <h1 className={styles.title}>Audio Equalizer</h1>
                    <p className={styles.description}>
                        Shape the current listening room with a focused 5-band curve.
                    </p>
                    <div className={styles.headerActions}>
                        <Button
                            size="sm"
                            variant="primary"
                            disabled={isStabilityModeEnabled}
                            onClick={handleOpenSavePresetDialog}>
                            Save preset
                        </Button>
                        <Button
                            size="sm"
                            disabled={isFlat || isStabilityModeEnabled}
                            onClick={handleResetCurve}>
                            Reset curve
                        </Button>
                    </div>
                </div>

                <div className={styles.curvePanel} aria-label="Equalizer curve summary">
                    <div className={styles.curveHeader}>
                        <span>{activePreset?.name ?? 'Custom curve'}</span>
                        <strong>{toneSummary}</strong>
                    </div>
                    <div className={styles.curveGraph} aria-hidden="true">
                        <span className={styles.curveLine} />
                        {curvePoints.map(({ id, style }) => (
                            <span
                                key={id}
                                className={styles.curvePoint}
                                style={style}
                            />
                        ))}
                    </div>
                    <div className={styles.curveLabels} aria-hidden="true">
                        {EQUALIZER_BANDS.map(({ id, frequency }) => (
                            <span key={id}>{frequency}</span>
                        ))}
                    </div>
                </div>
            </section>

            {isStabilityModeEnabled && (
                <div className={styles.stabilityMode} role="status">
                    <strong>Stability mode is on.</strong>
                    Equalizer controls are paused until stability mode is turned off in Settings.
                </div>
            )}

            <div className={styles.contentGrid}>
                <section className={styles.panel} aria-labelledby="equalizer-presets-title">
                    <div className={styles.panelHeader}>
                        <div>
                            <span className={styles.panelEyebrow}>Starting points</span>
                            <h2 id="equalizer-presets-title">Presets</h2>
                        </div>
                    </div>
                    <EqualizerPreset
                        presets={presets}
                        activePresetId={activePreset?.id ?? null}
                        disabled={isStabilityModeEnabled}
                        onSelectPreset={handlePresetSelect}
                        onSaveCurrentAsPreset={handleOpenSavePresetDialog}
                        onDeletePreset={handleDeletePreset}
                    />
                </section>

                <section className={styles.panel} aria-labelledby="equalizer-bands-title">
                    <div className={styles.panelHeader}>
                        <div>
                            <span className={styles.panelEyebrow}>Fine tuning</span>
                            <h2 id="equalizer-bands-title">Frequency bands</h2>
                        </div>
                        <span className={styles.rangeLabel}>-10 dB · +10 dB</span>
                    </div>

                    <div className={styles.sliderGroup}>
                        {EQUALIZER_BANDS.map(({ id, label, frequency, tone }) => (
                            <EqualizerSlider
                                key={id}
                                name={id}
                                label={label}
                                frequency={frequency}
                                tone={tone}
                                value={equalizerState[id]}
                                disabled={isStabilityModeEnabled}
                                onChange={handleSliderChange(id)}
                                onReset={() => handleBandReset(id)}
                            />
                        ))}
                    </div>
                </section>
            </div>

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
