import classNames from 'classnames';
const cx = classNames;

import React from 'react';

interface TwoToneLayoutProps {
    backgroundImage?: string;
    header: React.ReactNode;
    primaryAction?: React.ReactNode;
    children: React.ReactNode;
}

const TwoToneLayout = ({
    backgroundImage,
    header,
    primaryAction,
    children
}: TwoToneLayoutProps) => {
    return (
        <div className={cx('ow-two-tone-layout-TwoToneLayout', { 'ow-two-tone-layout-hasPrimaryAction': !!primaryAction })}>
            <div className={cx('ow-two-tone-layout-header')}>
                {backgroundImage && (
                    <div className={cx('ow-two-tone-layout-background')} />
                )}
                <div className={cx('ow-two-tone-layout-headerContent')}>
                    {header}
                    {primaryAction && (
                        <div className={cx('ow-two-tone-layout-primaryAction')}>
                            {primaryAction}
                        </div>
                    )}
                </div>
            </div>

            <div className={cx('ow-two-tone-layout-content')}>
                {children}
            </div>
        </div>
    );
};

export default TwoToneLayout;
