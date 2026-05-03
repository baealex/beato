import classNames from 'classnames';
import { cva, type VariantProps } from 'class-variance-authority';
const cx = classNames;

import React from 'react';

type SurfaceElement = 'div' | 'section' | 'article' | 'aside';

const surfaceVariants = cva('border border-[var(--b-color-border-subtle)] text-[var(--b-color-text)]', {
    variants: {
        variant: {
            subtle: 'bg-[var(--b-color-surface-subtle)]',
            panel: 'bg-[var(--b-color-background-layer-1)]',
            modal: 'bg-[var(--b-color-surface-modal)]'
        },
        radius: {
            none: 'rounded-none',
            lg: 'rounded-[var(--b-radius-lg)]',
            xl: 'rounded-[var(--b-radius-xl)]',
            '2xl': 'rounded-[var(--b-radius-2xl)]'
        },
        padding: {
            none: '',
            md: 'p-4',
            lg: 'p-6'
        }
    },
    defaultVariants: {
        variant: 'subtle',
        radius: 'xl',
        padding: 'none'
    }
});

type SurfaceVariantProps = VariantProps<typeof surfaceVariants>;

export interface SurfaceProps extends React.HTMLAttributes<HTMLElement>, SurfaceVariantProps {
    as?: SurfaceElement;
}

const Surface = ({
    as = 'div',
    variant,
    radius,
    padding,
    className,
    children,
    ...props
}: SurfaceProps) => React.createElement(
    as,
    {
        className: cx(surfaceVariants({ variant, radius, padding }), className),
        ...props
    },
    children
);

export default Surface;
