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

const cx = classNames;

const sliderInputClass = [
    'h-1.5 w-full cursor-pointer appearance-none rounded-full outline-none disabled:cursor-not-allowed disabled:opacity-50',
    'bg-[linear-gradient(90deg,var(--b-color-hover)_0%,var(--b-color-hover)_var(--eq-start),var(--b-color-point)_var(--eq-start),var(--b-color-point)_var(--eq-end),var(--b-color-hover)_var(--eq-end),var(--b-color-hover)_100%)]',
    'focus-visible:shadow-[0_0_0_3px_var(--b-color-focus-ring)]',
    '[&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[var(--b-color-background)] [&::-webkit-slider-thumb]:bg-[var(--b-color-point)] [&::-webkit-slider-thumb]:shadow-none',
    '[&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[var(--b-color-background)] [&::-moz-range-thumb]:bg-[var(--b-color-point)] [&::-moz-range-thumb]:shadow-none'
].join(' ');

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
    const isVertical = orientation === 'vertical';

    if (isVertical) {
        return (
            <div className="flex h-full min-h-[22rem] min-w-0 flex-col items-center justify-between gap-3 rounded-[var(--b-radius-lg)] px-1 py-2">
                <div className="flex min-w-0 flex-col items-center gap-1 text-center">
                    <span className="max-w-full truncate text-sm font-semibold text-[var(--b-color-text)]">{displayName}</span>
                    <span className="max-w-full truncate text-xs text-[var(--b-color-text-muted)]">
                        {frequency}
                        {tone && ` · ${tone}`}
                    </span>
                </div>

                <div className="flex h-40 w-8 shrink-0 items-center justify-center">
                    <input
                        className={cx(sliderInputClass, 'w-40 -rotate-90')}
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

                <div className="flex flex-col items-center justify-center gap-2">
                    <span className="text-center text-xs font-semibold text-[var(--b-color-text-secondary)]">{valueLabel}</span>
                    <button
                        type="button"
                        className="rounded-full border border-[var(--b-color-border-subtle)] bg-transparent px-2.5 py-1 text-xs font-semibold text-[var(--b-color-text-tertiary)] transition-[color,background-color,border-color] duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--b-color-focus)] disabled:cursor-not-allowed disabled:opacity-40 enabled:hover:border-[var(--b-color-border)] enabled:hover:bg-[var(--b-color-hover)] enabled:hover:text-[var(--b-color-text)]"
                        disabled={disabled || value === 0}
                        onClick={onReset}>
                        Reset
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-[minmax(7rem,0.8fr)_minmax(8rem,1.5fr)_auto] items-center gap-4 py-3 max-md:grid-cols-1 max-md:gap-2">
            <div className="flex min-w-0 flex-col gap-1">
                <span className="text-sm font-semibold text-[var(--b-color-text)]">{displayName}</span>
                <span className="text-xs text-[var(--b-color-text-muted)]">
                    {frequency}
                    {tone && ` · ${tone}`}
                </span>
            </div>
            <div className="min-w-0">
                <input
                    className={sliderInputClass}
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
            <div className="flex items-center justify-end gap-2">
                <span className="min-w-14 text-right text-xs font-semibold text-[var(--b-color-text-secondary)]">{valueLabel}</span>
                <button
                    type="button"
                    className="rounded-full border border-[var(--b-color-border-subtle)] bg-transparent px-2.5 py-1 text-xs font-semibold text-[var(--b-color-text-tertiary)] transition-[color,background-color,border-color] duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--b-color-focus)] disabled:cursor-not-allowed disabled:opacity-40 enabled:hover:border-[var(--b-color-border)] enabled:hover:bg-[var(--b-color-hover)] enabled:hover:text-[var(--b-color-text)]"
                    disabled={disabled || value === 0}
                    onClick={onReset}>
                    Reset
                </button>
            </div>
        </div>
    );
};

export default EqualizerSlider;
