import styles from './ActionBar.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

import React from 'react';

interface ActionBarProps {
    children?: React.ReactNode;
}

const ActionBar = ({ children }: ActionBarProps) => {
    return (
        <div className={cx('ActionBar')}>{children}</div>
    );
};

export default ActionBar;
