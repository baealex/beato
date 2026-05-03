import classNames from 'classnames';
const cx = classNames;

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
            className={cx('ow-tag-Tag', `ow-tag-tone-${tone}`, { 'ow-tag-selected': selected }, className)}
            {...props}>
            {children}
        </span>
    );
});

Tag.displayName = 'ow-tag-Tag';

export default Tag;
