import classNames from 'classnames';
const cx = classNames;

import React from 'react';

interface StickyHeaderProps {
    children?: React.ReactNode;
}

interface StickyHeaderActionsProps {
    children?: React.ReactNode;
}

const StickyHeader = ({ children }: StickyHeaderProps) => {
    return (
        <div className={cx('ow-sticky-header-StickyHeader')}>{children}</div>
    );
};

export const StickyHeaderActions = ({ children }: StickyHeaderActionsProps) => {
    return (
        <div className={cx('ow-sticky-header-actions')}>{children}</div>
    );
};

export default StickyHeader;
