import styles from './Tag.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

import React from 'react';

type TagTone = 'neutral' | 'accent';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
    tone?: TagTone;
    selected?: boolean;
}

const Tag = React.forwardRef<HTMLSpanElement, TagProps>(({
    tone = 'neutral',
    selected = false,
    className,
    children,
    ...props
}, ref) => {
    return (
        <span
            ref={ref}
            className={cx('Tag', `tone-${tone}`, { selected }, className)}
            {...props}>
            {children}
        </span>
    );
});

Tag.displayName = 'Tag';

export default Tag;
