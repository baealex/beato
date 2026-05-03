import classNames from 'classnames';
import React from 'react';
import Text, { type TextElement } from '../Text';

const cx = classNames;

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
            className={cx('max-w-[450px] text-center', className)}>
            {children}
        </Text>
    );
};

export default SummaryTitle;
