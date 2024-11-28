import classNames from 'classnames/bind';
import styles from './Flex.module.scss';
import { forwardRef } from 'react';
const cx = classNames.bind(styles);

type Gap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

interface FlexProps {
    direction?: 'row' | 'column';
    justify?: 'start' | 'end' | 'center' | 'between' | 'around';
    align?: 'start' | 'end' | 'center' | 'stretch' | 'baseline';
    wrap?: 'wrap' | 'nowrap' | 'reverse';
    gap?: Gap;
    rowGap?: Gap;
    columnGap?: Gap;
    className?: string;
    children?: React.ReactNode;
}

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
            className={
                cx([
                    'flex',
                    {
                        [`d-${direction}`]: direction,
                        [`j-${justify}`]: justify,
                        [`a-${align}`]: align,
                        [`w-${wrap}`]: wrap,
                        [`g-${gap}`]: gap,
                        [`rg-${rowGap}`]: rowGap,
                        [`cg-${columnGap}`]: columnGap
                    },
                    className])
            }
            {...props}>
            {children}
        </div>
    );
});

export default Flex;
