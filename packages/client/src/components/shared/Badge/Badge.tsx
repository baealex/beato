import styles from './Badge.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

import React from 'react';

type BadgeTone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger';
type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    tone?: BadgeTone;
    size?: BadgeSize;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(({
    tone = 'neutral',
    size = 'sm',
    className,
    children,
    ...props
}, ref) => {
    return (
        <span
            ref={ref}
            className={cx('Badge', `tone-${tone}`, `size-${size}`, className)}
            {...props}>
            {children}
        </span>
    );
});

Badge.displayName = 'Badge';

export default Badge;
