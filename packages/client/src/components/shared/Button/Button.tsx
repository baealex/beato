import classNames from 'classnames';
const cx = classNames;

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
                'ow-button-Button',
                `ow-button-variant-${variant}`,
                `ow-button-size-${size}`,
                { fullWidth },
                className
            )}
            {...props}>
            {children}
        </button>
    );
});

Button.displayName = 'ow-button-Button';

export default Button;
