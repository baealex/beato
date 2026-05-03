import { cva, type VariantProps } from 'class-variance-authority';
import classNames from 'classnames';
import React from 'react';

const cx = classNames;

const tagVariants = cva(
    [
        'inline-flex min-w-0 items-center justify-center rounded-full border border-[var(--b-color-border-subtle)]',
        'min-h-8 px-3 py-1.5 text-sm font-semibold leading-tight transition-[border-color,background-color,color,box-shadow] duration-150'
    ],
    {
        variants: {
            tone: {
                neutral: 'bg-[var(--b-color-surface-input)] text-[var(--b-color-text-secondary)]',
                accent: 'bg-[var(--b-color-surface-input)] text-[var(--b-color-point-light)]'
            },
            selected: {
                true: 'border-[var(--b-color-focus)] bg-[var(--b-color-active)] text-[var(--b-color-text)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]',
                false: ''
            }
        },
        defaultVariants: {
            tone: 'neutral',
            selected: false
        }
    }
);

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof tagVariants> {}

const Tag = React.forwardRef<HTMLSpanElement, TagProps>(({
    tone,
    selected,
    className,
    children,
    ...props
}, ref) => {
    return (
        <span
            ref={ref}
            className={cx(tagVariants({ tone, selected }), className)}
            {...props}>
            {children}
        </span>
    );
});

Tag.displayName = 'Tag';

export default Tag;
