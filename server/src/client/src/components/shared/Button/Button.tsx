import styles from './Button.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

import React from 'react';

interface ButtonProps {
    type?: 'primary' | 'secondary';
    disabled?: boolean;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    onClick?: () => void;
}

const Button = ({
    type='secondary',
    disabled,
    style,
    children,
    onClick
}: ButtonProps) => {
    return (
        <button
            type="button"
            disabled={disabled}
            style={style}
            className={cx('Button', type)}
            onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
