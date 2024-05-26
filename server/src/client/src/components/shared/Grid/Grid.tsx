import styles from './Grid.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

import React from 'react';

interface GridProps {
    children?: React.ReactNode;
}

const Grid = ({ children }: GridProps) => {
    return (
        <div className={cx('Grid')}>{children}</div>
    );
};

export default Grid;
