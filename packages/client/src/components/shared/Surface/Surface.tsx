import classNames from 'classnames';
const cx = classNames;

import React from 'react';

type SurfaceElement = 'div' | 'section' | 'article' | 'aside';
type SurfaceVariant = 'subtle' | 'panel' | 'modal';
type SurfaceRadius = 'none' | 'lg' | 'xl' | '2xl';
type SurfacePadding = 'none' | 'md' | 'lg';

export interface SurfaceProps extends React.HTMLAttributes<HTMLElement> {
    as?: SurfaceElement;
    variant?: SurfaceVariant;
    radius?: SurfaceRadius;
    padding?: SurfacePadding;
}

const Surface = ({
    as = 'div',
    variant = 'subtle',
    radius = 'xl',
    padding = 'none',
    className,
    children,
    ...props
}: SurfaceProps) => React.createElement(
    as,
    {
        className: cx(
            'ow-surface-Surface',
            `ow-surface-variant-${variant}`,
            `ow-surface-radius-${radius}`,
            `ow-surface-padding-${padding}`,
            className
        ),
        ...props
    },
    children
);

export default Surface;
