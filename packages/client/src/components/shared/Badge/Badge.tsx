import classNames from 'classnames';
const cx = classNames;

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
            className={cx('ow-badge-Badge', `ow-badge-tone-${tone}`, `ow-badge-size-${size}`, className)}
            {...props}>
            {children}
        </span>
    );
});

Badge.displayName = 'ow-badge-Badge';

export default Badge;
