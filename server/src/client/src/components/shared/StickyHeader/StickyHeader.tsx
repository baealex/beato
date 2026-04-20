import styles from './StickyHeader.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

import React from 'react';

interface StickyHeaderProps {
    children?: React.ReactNode;
}

interface StickyHeaderActionsProps {
    children?: React.ReactNode;
}

const StickyHeader = ({ children }: StickyHeaderProps) => {
    return (
        <div className={cx('StickyHeader')}>{children}</div>
    );
};

export const StickyHeaderActions = ({ children }: StickyHeaderActionsProps) => {
    return (
        <div className={cx('actions')}>{children}</div>
    );
};

export default StickyHeader;
