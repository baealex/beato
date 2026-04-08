import styles from './Button.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger';
type ButtonSize = 'sm' | 'md';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
    variant = 'secondary',
    size = 'md',
    fullWidth = false,
    className,
    type = 'button',
    children,
    ...props
}, ref) => {
    return (
        <button
            ref={ref}
            type={type}
            className={cx(
                'Button',
                `variant-${variant}`,
                `size-${size}`,
                { fullWidth },
                className
            )}
            {...props}>
            {children}
        </button>
    );
});

Button.displayName = 'Button';

export default Button;
