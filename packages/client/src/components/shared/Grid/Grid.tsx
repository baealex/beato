import classNames from 'classnames';
import React from 'react';

const cx = classNames;

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
}

const Grid = ({ children, className, ...props }: GridProps) => {
    return (
        <div
            className={cx('grid list-none grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-[var(--b-spacing-md)] px-[var(--b-spacing-lg)] py-[var(--b-spacing-md)] max-md:grid-cols-2', className)}
            {...props}>
            {children}
        </div>
    );
};

export default Grid;
