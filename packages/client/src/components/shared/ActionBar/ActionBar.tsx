import styles from './ActionBar.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

import React from 'react';

interface ActionBarProps {
    children?: React.ReactNode;
}

export interface ActionBarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
}

const ActionBar = ({ children }: ActionBarProps) => {
    return (
        <div className={cx('ActionBar')}>{children}</div>
    );
};

export const ActionBarButton = React.forwardRef<HTMLButtonElement, ActionBarButtonProps>(({
    className,
    type = 'button',
    children,
    ...props
}, ref) => {
    return (
        <button
            ref={ref}
            type={type}
            className={cx('ActionBarButton', className)}
            {...props}>
            {children}
        </button>
    );
});

ActionBarButton.displayName = 'ActionBarButton';

export default ActionBar;
