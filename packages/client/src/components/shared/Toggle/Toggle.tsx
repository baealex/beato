import classNames from 'classnames';
import React from 'react';
import Text from '../Text';

const cx = classNames;

interface ToggleProps {
    value: boolean;
    onChange: (value: boolean) => void;
    children?: React.ReactNode;
    ariaLabel?: string;
    disabled?: boolean;
    className?: string;
}

const Toggle = ({
    value,
    onChange,
    children,
    ariaLabel,
    disabled = false,
    className
}: ToggleProps) => {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={value}
            aria-label={ariaLabel}
            disabled={disabled}
            className={cx('group/switch inline-flex cursor-pointer items-center gap-2.5 bg-transparent p-0 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none', className)}
            onClick={() => onChange(!value)}>
            <span
                className={cx(
                    'relative h-6 w-11 shrink-0 rounded-full border transition-[background-color,border-color,box-shadow] duration-200',
                    'group-focus-visible/switch:border-[var(--b-color-focus)] group-focus-visible/switch:shadow-[0_0_0_3px_var(--b-color-focus-ring)]',
                    value
                        ? 'border-transparent bg-[var(--b-color-point)]'
                        : 'border-[var(--b-color-border-subtle)] bg-[var(--b-color-surface-input)]'
                )}>
                <span
                    className={cx(
                        'absolute left-0.5 top-0.5 h-[18px] w-[18px] rounded-full transition-[transform,background-color] duration-200',
                        value
                            ? 'translate-x-5 bg-[var(--b-color-background)]'
                            : 'translate-x-0 bg-[var(--b-color-text-secondary)]'
                    )}
                />
            </span>
            {children && (
                <Text
                    as="span"
                    variant="secondary"
                    size="sm">
                    {children}
                </Text>
            )}
        </button>
    );
};

export default Toggle;
