import type { ChangeEvent, CSSProperties } from 'react';
import styles from './EqualizerSlider.module.scss';

interface EqualizerSliderProps {
    name: string;
    label?: string;
    frequency?: string;
    tone?: string;
    value: number;
    min?: number;
    max?: number;
    disabled?: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onReset?: () => void;
}

const EqualizerSlider = ({
    name,
    label,
    frequency,
    tone,
    value,
    min = -10,
    max = 10,
    disabled = false,
    onChange,
    onReset
}: EqualizerSliderProps) => {
    // Format the display name (e.g., "lowMid" -> "Low Mid")
    const displayName = label ?? name
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (str) => str.toUpperCase());
    const zeroPosition = ((0 - min) / (max - min)) * 100;
    const valuePosition = ((value - min) / (max - min)) * 100;
    const rangeStart = Math.min(zeroPosition, valuePosition);
    const rangeEnd = Math.max(zeroPosition, valuePosition);
    const valueLabel = value > 0 ? `+${value} dB` : `${value} dB`;
    const sliderStyle = {
        '--eq-zero': `${zeroPosition}%`,
        '--eq-start': `${rangeStart}%`,
        '--eq-end': `${rangeEnd}%`
    } as CSSProperties;

    return (
        <div className={styles.sliderRow}>
            <div className={styles.labelGroup}>
                <span className={styles.label}>{displayName}</span>
                <span className={styles.meta}>
                    {frequency}
                    {tone && ` · ${tone}`}
                </span>
            </div>
            <div className={styles.sliderControl}>
                <input
                    className={styles.sliderInput}
                    type="range"
                    name={name}
                    min={min}
                    max={max}
                    value={value}
                    disabled={disabled}
                    aria-label={`${displayName} gain`}
                    style={sliderStyle}
                    onChange={onChange}
                />
            </div>
            <div className={styles.valueGroup}>
                <span className={styles.valueDisplay}>{valueLabel}</span>
                <button
                    type="button"
                    className={styles.resetButton}
                    disabled={disabled || value === 0}
                    onClick={onReset}>
                    Reset
                </button>
            </div>
        </div>
    );
};

export default EqualizerSlider;
