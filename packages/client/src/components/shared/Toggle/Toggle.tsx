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
            className={cx('ow-toggle-Toggle', { disabled }, className)}
            onClick={() => onChange(!value)}>
            <span className={cx('ow-toggle-ToggleSwitch', { 'ow-toggle-is-toggled': value })}>
                <span className={cx('ow-toggle-ToggleKnob')} />
            </span>
            {children && (
                <Text
                    as="span"
                    variant="secondary"
                    size="sm"
                    className={cx('ow-toggle-ToggleLabel')}>
                    {children}
                </Text>
            )}
        </button>
    );
};

export default Toggle;
