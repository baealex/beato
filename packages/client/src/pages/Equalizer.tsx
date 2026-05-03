import { useAppStore as useStore } from '~/store/base-store';
import {
    useState,
    useEffect,
    useCallback,
    useMemo,
    type ChangeEvent
} from 'react';

import { useModal } from '~/components/app/ModalProvider';
import { Button, Card, PageContainer, Text } from '~/components/shared';
import EqualizerPreset from '~/components/shared/EqualizerPreset';
import type { Preset } from '~/components/shared/EqualizerPreset';
import EqualizerSlider from '~/components/shared/EqualizerSlider';
import { TextEntryDialog } from '~/components/shared/Modal';
import {
    EQUALIZER_BAND_IDS,
    createFlatEqualizerState,
    equalizerStore
} from '~/store/equalizer';

type EqualizerValues = Preset['values'];
type EqualizerBand = keyof EqualizerValues;

const layoutClass = {
    container: 'flex min-h-full flex-col gap-4 text-[var(--b-color-text)]',
    status: 'bg-[var(--b-color-glow-ambient)]',
    panel: 'min-w-0 bg-[var(--b-color-surface-subtle)]',
    panelBody: 'flex flex-col gap-4',
    panelHeader: 'flex items-start justify-between gap-3 max-[640px]:flex-col',
    rangeLabel: 'shrink-0 rounded-full border border-[var(--b-color-border-subtle)] bg-[var(--b-color-surface-item)] px-2.5 py-1.5 text-xs font-medium text-[var(--b-color-text-tertiary)] max-[640px]:self-start',
    eqDeck: 'overflow-x-auto rounded-[var(--b-radius-lg)] border border-[var(--b-color-border-subtle)] bg-[rgba(202,247,249,0.025)]',
    eqDeckInner: 'min-w-[42rem] p-4',
    sliderGroup: 'grid min-h-[24rem] grid-cols-7 gap-3'
};

const EQUALIZER_BANDS = [
    {
        id: 'lowBass',
        label: 'Low Bass',
        frequency: '63 Hz',
        tone: 'Depth'
    },
    {
        id: 'bass',
        label: 'Bass',
        frequency: '125 Hz',
        tone: 'Punch'
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
        frequency: '500 Hz',
        tone: 'Body'
    },
    {
        id: 'highMid',
        label: 'High Mid',
        frequency: '1 kHz',
        tone: 'Focus'
    },
    {
        id: 'presence',
        label: 'Presence',
        frequency: '4 kHz',
        tone: 'Clarity'
    },
    {
        id: 'treble',
        label: 'Treble',
        frequency: '10 kHz',
        tone: 'Air'
    }
] as const satisfies ReadonlyArray<{
    id: EqualizerBand;
    label: string;
    frequency: string;
    tone: string;
}>;

const FLAT_VALUES: EqualizerValues = createFlatEqualizerState();

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
            ...FLAT_VALUES,
            lowBass: 5,
            bass: 6,
            lowMid: 2,
            treble: 1
        }
    },
    {
        id: 'warm',
        name: 'Warm',
        values: {
            ...FLAT_VALUES,
            lowBass: 2,
            bass: 3,
            lowMid: 2,
            highMid: -1,
            presence: -2
        }
    },
    {
        id: 'pop',
        name: 'Pop',
        values: {
            ...FLAT_VALUES,
            lowBass: 2,
            bass: 2,
            mid: -1,
            presence: 3,
            treble: 2
        }
    },
    {
        id: 'rock',
        name: 'Rock',
        values: {
            ...FLAT_VALUES,
            lowBass: 3,
            bass: 4,
            lowMid: 1,
            highMid: 3,
            presence: 3,
            treble: 2
        }
    },
    {
        id: 'jazz',
        name: 'Jazz',
        values: {
            ...FLAT_VALUES,
            lowBass: 2,
            bass: 1,
            lowMid: 2,
            mid: 1,
            presence: 2,
            treble: 3
        }
    },
    {
        id: 'classical',
        name: 'Classical',
        values: {
            ...FLAT_VALUES,
            lowBass: 1,
            bass: 1,
            lowMid: 1,
            presence: 2,
            treble: 3
        }
    },
    {
        id: 'bright',
        name: 'Bright',
        values: {
            ...FLAT_VALUES,
            lowBass: -2,
            bass: -1,
            highMid: 2,
            presence: 3,
            treble: 4
        }
    },
    {
        id: 'night',
        name: 'Night',
        values: {
            ...FLAT_VALUES,
            lowBass: -3,
            bass: -2,
            presence: -2,
            treble: -3
        }
    },
    {
        id: 'loudness',
        name: 'Loudness',
        values: {
            ...FLAT_VALUES,
            lowBass: 4,
            bass: 3,
            presence: 2,
            treble: 3
        }
    },
    {
        id: 'treble-boost',
        name: 'Treble Boost',
        values: {
            ...FLAT_VALUES,
            mid: 2,
            highMid: 3,
            presence: 5,
            treble: 6
        }
    },
    {
        id: 'vocal',
        name: 'Vocal',
        values: {
            ...FLAT_VALUES,
            lowBass: -3,
            bass: -2,
            mid: 2,
            highMid: 4,
            presence: 3,
            treble: -1
        }
    }
];

const parseCustomPresets = (savedPresets: string | null) => {
    if (!savedPresets) {
        return [];
    }

    try {
        const parsedPresets: unknown = JSON.parse(savedPresets);

        if (!Array.isArray(parsedPresets)) {
            return [];
        }

        return parsedPresets.flatMap((preset): Preset[] => {
            const isValidPreset = Boolean(
                preset &&
                typeof preset === 'object' &&
                typeof (preset as Preset).id === 'string' &&
                (preset as Preset).id.startsWith('custom-') &&
                typeof (preset as Preset).name === 'string'
            );

            if (!isValidPreset) {
                return [];
            }

            const values = normalizeEqualizerValues((preset as Preset).values);

            if (!values) {
                return [];
            }

            return [{
                id: (preset as Preset).id,
                name: (preset as Preset).name,
                values
            }];
        });
    } catch {
        return [];
    }
};

const normalizeEqualizerValues = (values: unknown): EqualizerValues | null => {
    if (!values || typeof values !== 'object') {
        return null;
    }

    const record = values as Partial<Record<keyof EqualizerValues, unknown>>;
    const normalized = createFlatEqualizerState();

    EQUALIZER_BAND_IDS.forEach((id) => {
        normalized[id] = typeof record[id] === 'number' ? record[id] : 0;
    });

    return normalized;
};

const isSameCurve = (a: EqualizerValues, b: EqualizerValues) => {
    return EQUALIZER_BAND_IDS.every((id) => a[id] === b[id]);
};

const getToneSummary = (values: EqualizerValues) => {
    const lowEnergy = values.lowBass + values.bass + values.lowMid;
    const highEnergy = values.presence + values.treble;
    const totalAbsGain = EQUALIZER_BAND_IDS.reduce((sum, id) => sum + Math.abs(values[id]), 0);

    if (totalAbsGain <= 2) {
        return 'Balanced';
    }

    if (lowEnergy - highEnergy >= 4) {
        return 'Warm';
    }

    if (highEnergy - lowEnergy >= 4) {
        return 'Bright';
    }

    if (values.highMid + values.presence >= 5) {
        return 'Forward';
    }

    return 'Custom';
};

const Equalizer = () => {
    const { confirm } = useModal();
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
        <PageContainer width="full" className={layoutClass.container}>
            <section aria-labelledby="equalizer-presets-title">
                <Card variant="outlined" padding="md" radius="lg" className={layoutClass.panel}>
                    <div className={layoutClass.panelBody}>
                        <div className={layoutClass.panelHeader}>
                            <div>
                                <Text as="span" size="xs" weight="semibold" className="tracking-[0.08em] text-[var(--b-color-point-light)] uppercase">
                                    Preset
                                </Text>
                                <Text as="h2" id="equalizer-presets-title" size="title" weight="semibold" className="mt-1 mb-0">
                                    {activePreset?.name ?? 'Custom curve'}
                                </Text>
                                <Text as="p" variant="tertiary" size="sm" className="mt-1 mb-0">
                                    {toneSummary}
                                </Text>
                            </div>
                        </div>
                        <EqualizerPreset
                            presets={presets}
                            activePresetId={activePreset?.id ?? null}
                            onSelectPreset={handlePresetSelect}
                            onSaveCurrentAsPreset={handleOpenSavePresetDialog}
                            onDeletePreset={handleDeletePreset}
                        />
                    </div>
                </Card>
            </section>

            <section aria-labelledby="equalizer-bands-title">
                <Card variant="outlined" padding="md" radius="lg" className={layoutClass.panel}>
                    <div className={layoutClass.panelBody}>
                        <div className={layoutClass.panelHeader}>
                            <div>
                                <Text as="span" size="xs" weight="semibold" className="tracking-[0.08em] text-[var(--b-color-point-light)] uppercase">
                                    7-band EQ
                                </Text>
                                <Text as="h2" id="equalizer-bands-title" size="title" weight="semibold" className="mt-1 mb-0">
                                    Frequency bands
                                </Text>
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                                <span className={layoutClass.rangeLabel}>-10 dB · +10 dB</span>
                                <Button
                                    size="sm"
                                    disabled={isFlat}
                                    onClick={handleResetCurve}>
                                    Reset curve
                                </Button>
                            </div>
                        </div>

                        <div className={layoutClass.eqDeck}>
                            <div className={layoutClass.eqDeckInner}>
                                <div className={layoutClass.sliderGroup}>
                                    {EQUALIZER_BANDS.map(({ id, label, frequency, tone }) => (
                                        <EqualizerSlider
                                            key={id}
                                            name={id}
                                            label={label}
                                            frequency={frequency}
                                            tone={tone}
                                            value={equalizerState[id]}
                                                            orientation="vertical"
                                            onChange={handleSliderChange(id)}
                                            onReset={() => handleBandReset(id)}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </section>

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
        </PageContainer>
    );
};

export default Equalizer;
