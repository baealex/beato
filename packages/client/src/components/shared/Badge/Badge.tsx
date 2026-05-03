import { cva, type VariantProps } from 'class-variance-authority';
import classNames from 'classnames';
import React from 'react';

const cx = classNames;

const badgeVariants = cva(
    'inline-flex w-fit max-w-full items-center justify-center whitespace-nowrap rounded-full border border-transparent text-xs font-semibold leading-tight',
    {
        variants: {
            tone: {
                neutral: 'border-[var(--b-color-border-subtle)] bg-[var(--b-color-surface-input)] text-[var(--b-color-text-secondary)]',
                accent: 'border-[var(--b-color-focus)] bg-[var(--b-color-active)] text-[var(--b-color-point-light)]',
                success: 'bg-[rgba(56,189,120,0.1)] text-[rgba(129,222,168,0.92)]',
                warning: 'bg-[rgba(245,158,11,0.12)] text-[rgba(255,210,138,0.95)]',
                danger: 'bg-[rgba(244,63,94,0.1)] text-[rgba(255,154,173,0.92)]'
            },
            size: {
                sm: 'min-h-6 px-2.5 py-1',
                md: 'min-h-7 px-3 py-1 text-sm'
            }
        },
        defaultVariants: {
            tone: 'neutral',
            size: 'sm'
        }
    }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(({
    tone,
    size,
    className,
    children,
    ...props
}, ref) => {
    return (
        <span
            ref={ref}
            className={cx(badgeVariants({ tone, size }), className)}
            {...props}>
            {children}
        </span>
    );
});

Badge.displayName = 'Badge';

export default Badge;
