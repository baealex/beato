import classNames from 'classnames';
import { cva, type VariantProps } from 'class-variance-authority';
const cx = classNames;

import React from 'react';

const iconButtonVariants = cva(
    [
        'inline-flex shrink-0 items-center justify-center rounded-full border-0 bg-transparent text-[var(--b-color-text-tertiary)] transition-colors',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--b-color-focus)]',
        '[&_svg]:h-4 [&_svg]:w-4'
    ],
    {
        variants: {
            size: {
                sm: 'h-10 w-10',
                md: 'h-11 w-11'
            },
            tone: {
                neutral: 'hover:bg-[var(--b-color-hover)]',
                danger: 'hover:bg-red-300/10'
            },
            active: {
                true: 'bg-[var(--b-color-active)] text-[var(--b-color-point)] [&_svg]:fill-none',
                false: 'hover:text-[var(--b-color-text)]'
            }
        },
        defaultVariants: {
            size: 'md',
            tone: 'neutral',
            active: false
        }
    }
);

type IconButtonVariantProps = VariantProps<typeof iconButtonVariants>;

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, IconButtonVariantProps {}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(({
    active,
    size,
    tone,
    className,
    type = 'button',
    children,
    ...props
}, ref) => {
    return (
        <button
            ref={ref}
            type={type}
            className={cx(iconButtonVariants({ active, size, tone }), className)}
            {...props}>
            {children}
        </button>
    );
});

IconButton.displayName = 'IconButton';

export default IconButton;
