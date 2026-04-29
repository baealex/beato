import styles from './IconButton.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

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
            className={cx('IconButton', `size-${size}`, `tone-${tone}`, { active }, className)}
            {...props}>
            {children}
        </button>
    );
});

IconButton.displayName = 'IconButton';

export default IconButton;
