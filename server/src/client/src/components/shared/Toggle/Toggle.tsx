import styles from './Toggle.module.scss';
import classNames from 'classnames/bind';
import React from 'react';
import Text from '../Text';

const cx = classNames.bind(styles);

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
            className={cx('Toggle', { disabled }, className)}
            onClick={() => onChange(!value)}>
            <span className={cx('ToggleSwitch', { 'is-toggled': value })}>
                <span className={cx('ToggleKnob')} />
            </span>
            {children && (
                <Text
                    as="span"
                    variant="secondary"
                    size="sm"
                    className={cx('ToggleLabel')}>
                    {children}
                </Text>
            )}
        </button>
    );
};

export default Toggle;
