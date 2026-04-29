import styles from './SummaryTitle.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

import React from 'react';
import Text, { type TextElement } from '../Text';

interface SummaryTitleProps {
    as?: TextElement;
    className?: string;
    children?: React.ReactNode;
}

const SummaryTitle = ({ as = 'div', className, children }: SummaryTitleProps) => {
    return (
        <Text
            as={as}
            size="title"
            weight="bold"
            className={cx('SummaryTitle', className)}>
            {children}
        </Text>
    );
};

export default SummaryTitle;
