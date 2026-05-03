import classNames from 'classnames';
import type { ChangeEvent, CSSProperties } from 'react';

interface EqualizerSliderProps {
    name: string;
    label?: string;
    frequency?: string;
    tone?: string;
    value: number;
    min?: number;
    max?: number;
    disabled?: boolean;
    orientation?: 'horizontal' | 'vertical';
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
    orientation = 'horizontal',
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
        <div className={classNames('ow-equalizer-slider-sliderRow', orientation)}>
            <div className={'ow-equalizer-slider-labelGroup'}>
                <span className={'ow-equalizer-slider-label'}>{displayName}</span>
                <span className={'ow-equalizer-slider-meta'}>
                    {frequency}
                    {tone && ` · ${tone}`}
                </span>
            </div>
            <div className={'ow-equalizer-slider-sliderControl'}>
                <input
                    className={'ow-equalizer-slider-sliderInput'}
                    type="range"
                    name={name}
                    min={min}
                    max={max}
                    value={value}
                    disabled={disabled}
                    aria-label={`${displayName} gain`}
                    aria-orientation={orientation}
                    style={sliderStyle}
                    onChange={onChange}
                />
            </div>
            <div className={'ow-equalizer-slider-valueGroup'}>
                <span className={'ow-equalizer-slider-valueDisplay'}>{valueLabel}</span>
                <button
                    type="button"
                    className={'ow-equalizer-slider-resetButton'}
                    disabled={disabled || value === 0}
                    onClick={onReset}>
                    Reset
                </button>
            </div>
        </div>
    );
};

export default EqualizerSlider;
