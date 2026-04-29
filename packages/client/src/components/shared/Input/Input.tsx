import styles from './Input.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

import React from 'react';

type InputSize = 'md' | 'lg';
type InputTone = 'default' | 'panel';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    inputSize?: InputSize;
    tone?: InputTone;
    fullWidth?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({
    inputSize = 'md',
    tone = 'default',
    fullWidth = true,
    className,
    ...props
}, ref) => {
    return (
        <input
            ref={ref}
            className={cx(
                'Input',
                `size-${inputSize}`,
                `tone-${tone}`,
                { fullWidth },
                className
            )}
            {...props}
        />
    );
});

Input.displayName = 'Input';

export default Input;
