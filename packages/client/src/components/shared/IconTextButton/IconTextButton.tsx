import classNames from 'classnames';
const cx = classNames;

import React from 'react';

type IconTextButtonVariant = 'primary' | 'secondary' | 'ghost';
type IconTextButtonSize = 'sm' | 'md' | 'lg';

export interface IconTextButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: React.ReactNode;
    label: React.ReactNode;
    meta?: React.ReactNode;
    variant?: IconTextButtonVariant;
    size?: IconTextButtonSize;
}

const IconTextButton = React.forwardRef<HTMLButtonElement, IconTextButtonProps>(({
    icon,
    label,
    meta,
    variant = 'secondary',
    size = 'md',
    className,
    type = 'button',
    ...props
}, ref) => {
    return (
        <button
            ref={ref}
            type={type}
            className={cx(
                'ow-icon-text-button-IconTextButton',
                `ow-icon-text-button-variant-${variant}`,
                `ow-icon-text-button-size-${size}`,
                { 'ow-icon-text-button-hasMeta': Boolean(meta) },
                className
            )}
            {...props}>
            {icon && <span className={cx('ow-icon-text-button-icon')}>{icon}</span>}
            <span className={cx('ow-icon-text-button-copy')}>
                <span className={cx('ow-icon-text-button-label')}>{label}</span>
                {meta && <span className={cx('ow-icon-text-button-meta')}>{meta}</span>}
            </span>
        </button>
    );
});

IconTextButton.displayName = 'ow-icon-text-button-IconTextButton';

export default IconTextButton;
