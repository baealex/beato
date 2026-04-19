import styles from './TwoToneLayout.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

import React from 'react';

import { useDominantColor } from '~/hooks';

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
    const color = useDominantColor(backgroundImage);

    const gradientStyle: React.CSSProperties = color
        ? {
            background: `
                radial-gradient(ellipse 120% 60% at 50% -10%,
                    rgba(${color.r}, ${color.g}, ${color.b}, 0.55) 0%,
                    rgba(${color.r}, ${color.g}, ${color.b}, 0.18) 45%,
                    transparent 100%
                )
            `
        }
        : {};

    return (
        <div className={cx('TwoToneLayout', { hasPrimaryAction: !!primaryAction })}>
            <div className={cx('header')}>
                {backgroundImage && (
                    <div className={cx('background')} style={gradientStyle} />
                )}
                <div className={cx('headerContent')}>
                    {header}
                    {primaryAction && (
                        <div className={cx('primaryAction')}>
                            {primaryAction}
                        </div>
                    )}
                </div>
            </div>

            <div className={cx('content')}>
                {children}
            </div>
        </div>
    );
};

export default TwoToneLayout;
