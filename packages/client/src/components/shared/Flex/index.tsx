import classNames from 'classnames';
import { forwardRef } from 'react';
import type React from 'react';

const cx = classNames;

type Gap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

interface FlexProps {
    direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
    justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
    align?: 'start' | 'end' | 'center' | 'stretch' | 'baseline';
    wrap?: 'wrap' | 'nowrap' | 'reverse';
    gap?: Gap;
    rowGap?: Gap;
    columnGap?: Gap;
    className?: string;
    children?: React.ReactNode;
}

const directionClass: Record<NonNullable<FlexProps['direction']>, string> = {
    row: 'flex-row',
    column: 'flex-col',
    'row-reverse': 'flex-row-reverse',
    'column-reverse': 'flex-col-reverse'
};

const justifyClass: Record<NonNullable<FlexProps['justify']>, string> = {
    start: 'justify-start',
    end: 'justify-end',
    center: 'justify-center',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly'
};

const alignClass: Record<NonNullable<FlexProps['align']>, string> = {
    start: 'items-start',
    end: 'items-end',
    center: 'items-center',
    stretch: 'items-stretch',
    baseline: 'items-baseline'
};

const wrapClass: Record<NonNullable<FlexProps['wrap']>, string> = {
    wrap: 'flex-wrap',
    nowrap: 'flex-nowrap',
    reverse: 'flex-wrap-reverse'
};

const gapClass: Record<Gap, string> = {
    0: 'gap-0',
    1: 'gap-1',
    2: 'gap-2',
    3: 'gap-3',
    4: 'gap-4',
    5: 'gap-5',
    6: 'gap-6',
    7: 'gap-7'
};

const rowGapClass: Record<Gap, string> = {
    0: 'gap-y-0',
    1: 'gap-y-1',
    2: 'gap-y-2',
    3: 'gap-y-3',
    4: 'gap-y-4',
    5: 'gap-y-5',
    6: 'gap-y-6',
    7: 'gap-y-7'
};

const columnGapClass: Record<Gap, string> = {
    0: 'gap-x-0',
    1: 'gap-x-1',
    2: 'gap-x-2',
    3: 'gap-x-3',
    4: 'gap-x-4',
    5: 'gap-x-5',
    6: 'gap-x-6',
    7: 'gap-x-7'
};

const Flex = forwardRef<HTMLDivElement, FlexProps & React.HTMLAttributes<HTMLDivElement>>(({
    direction = 'row',
    justify = 'start',
    align = 'start',
    wrap = 'nowrap',
    gap = 0,
    rowGap = 0,
    columnGap = 0,
    children,
    className,
    ...props
}, ref) => {
    return (
        <div
            ref={ref}
            className={cx(
                'flex',
                directionClass[direction],
                justifyClass[justify],
                alignClass[align],
                wrapClass[wrap],
                gapClass[gap],
                rowGapClass[rowGap],
                columnGapClass[columnGap],
                className
            )}
            {...props}>
            {children}
        </div>
    );
});

export default Flex;
