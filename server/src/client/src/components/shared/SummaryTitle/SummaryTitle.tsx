import styles from './SummaryTitle.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

import React from 'react';

interface SummaryTitleProps {
    as?: React.ElementType;
    children?: React.ReactNode;
}

const SummaryTitle = ({ as = 'div', children }: SummaryTitleProps) => {
    return React.createElement(as, { className: cx('SummaryTitle') }, children);
};

export default SummaryTitle;
