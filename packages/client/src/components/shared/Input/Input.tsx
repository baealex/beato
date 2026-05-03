import classNames from 'classnames';
const cx = classNames;

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
                'ow-input-Input',
                `ow-input-size-${inputSize}`,
                `ow-input-tone-${tone}`,
                { fullWidth },
                className
            )}
            {...props}
        />
    );
});

Input.displayName = 'ow-input-Input';

export default Input;
