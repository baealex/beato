import classNames from 'classnames';
const cx = classNames;

import React from 'react';

interface GridProps {
    children?: React.ReactNode;
}

const Grid = ({ children }: GridProps) => {
    return (
        <div className={cx('ow-grid-Grid')}>{children}</div>
    );
};

export default Grid;
