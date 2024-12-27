import styles from './Toggle.module.scss';
import classNames from 'classnames/bind';
import React from 'react';

const cx = classNames.bind(styles);

interface ToggleProps {
    value: boolean;
    onChange: (value: boolean) => void;
    children?: React.ReactNode;
}

const Toggle = ({ value, onChange, children }: ToggleProps) => {    const handleToggle = () => {
    onChange(!value);
};

return (
    <div className={cx('Toggle')} onClick={handleToggle}>
        <div className={cx('ToggleSwitch', { 'is-toggled': value })}>
            <div className={cx('ToggleKnob')} />
        </div>
        {children && <span className={cx('ToggleLabel')}>{children}</span>}
    </div>
);
};

export default Toggle;
