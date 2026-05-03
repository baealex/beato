import classNames from 'classnames';
const cx = classNames;

import React from 'react';

type IconButtonSize = 'sm' | 'md';
type IconButtonTone = 'neutral' | 'danger';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    active?: boolean;
    size?: IconButtonSize;
    tone?: IconButtonTone;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(({
    active = false,
    size = 'md',
    tone = 'neutral',
    className,
    type = 'button',
    children,
    ...props
}, ref) => {
    return (
        <button
            ref={ref}
            type={type}
            className={cx('ow-icon-button-IconButton', `ow-icon-button-size-${size}`, `ow-icon-button-tone-${tone}`, { 'ow-icon-button-active': active }, className)}
            {...props}>
            {children}
        </button>
    );
});

IconButton.displayName = 'ow-icon-button-IconButton';

export default IconButton;
