import classNames from 'classnames';
const cx = classNames;

import React from 'react';

interface ActionBarProps {
    children?: React.ReactNode;
}

export interface ActionBarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
}

const ActionBar = ({ children }: ActionBarProps) => {
    return (
        <div className={cx('ow-action-bar-ActionBar')}>{children}</div>
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
            className={cx('ow-action-bar-ActionBarButton', className)}
            {...props}>
            {children}
        </button>
    );
});

ActionBarButton.displayName = 'ow-action-bar-ActionBarButton';

export default ActionBar;
