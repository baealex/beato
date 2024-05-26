import styles from './TwoToneLayout.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

import React from 'react';

interface TwoToneLayoutProps {
    header: React.ReactNode;
    primaryAction?: React.ReactNode;
    children: React.ReactNode;
}

const TwoToneLayout = ({
    header,
    primaryAction,
    children
}: TwoToneLayoutProps) => {
    return (
        <div className={cx('TwoToneLayout', { hasPrimaryAction: !!primaryAction })}>
            <div className={cx('header')}>
                {header}
                {primaryAction && (
                    <div className={cx('primaryAction')}>
                        {primaryAction}
                    </div>
                )}
            </div>
            <div className={cx('content')}>
                {children}
            </div>
        </div>
    );
};

export default TwoToneLayout;
