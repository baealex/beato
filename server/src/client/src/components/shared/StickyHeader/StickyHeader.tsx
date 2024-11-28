import styles from './StickyHeader.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

import React from 'react';

interface StickyHeaderProps {
    children?: React.ReactNode;
}

const StickyHeader = ({ children }: StickyHeaderProps) => {
    return (
        <div className={cx('StickyHeader')}>{children}</div>
    );
};

export default StickyHeader;
