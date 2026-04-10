import styles from './TwoToneLayout.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

import React from 'react';

import { Image } from '~/components/shared';

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
        <div className={cx('TwoToneLayout', { hasPrimaryAction: !!primaryAction })}>
            {backgroundImage && (
                <div className={cx('background')}>
                    <Image src={backgroundImage} alt="" aria-hidden="true" loading="eager" />
                    <div className={cx('overlay')} />
                </div>
            )}
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
