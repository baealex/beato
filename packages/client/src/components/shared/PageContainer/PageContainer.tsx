import type { ReactNode } from 'react';

import classNames from 'classnames';

const cx = classNames;

export type PageContainerWidth = 'narrow' | 'content' | 'wide' | 'focus' | 'player' | 'full';
export type PageContainerPadding = 'page' | 'content' | 'focus' | 'none';

export interface PageContainerProps {
    width?: PageContainerWidth;
    padding?: PageContainerPadding;
    className?: string;
    children: ReactNode;
}

const WIDTH_MAP: Record<PageContainerWidth, string> = {
    narrow: 'w-[min(100%,50rem)]',
    content: 'w-full max-w-[860px]',
    wide: 'w-[min(100%,72rem)]',
    focus: 'w-[min(100%,38rem)]',
    player: 'w-[min(100%,30rem)]',
    full: 'w-full'
};

const PADDING_MAP: Record<PageContainerPadding, string> = {
    page: 'p-[clamp(1rem,3vw,2rem)] pb-[calc(clamp(1.5rem,4vw,3rem)+env(safe-area-inset-bottom))] max-sm:p-[var(--b-spacing-md)] max-sm:pb-[calc(var(--b-spacing-xl)+env(safe-area-inset-bottom))]',
    content: 'px-4 py-6 sm:px-6 sm:py-10 lg:px-10 lg:py-12',
    focus: 'px-4 pb-[calc(1.5rem+env(safe-area-inset-bottom))] max-sm:px-3.5',
    none: ''
};

const PageContainer = ({
    width = 'narrow',
    padding = 'page',
    className,
    children
}: PageContainerProps) => {
    return (
        <div className={cx('mx-auto text-[var(--b-color-text)]', WIDTH_MAP[width], PADDING_MAP[padding], className)}>
            {children}
        </div>
    );
};

export default PageContainer;
