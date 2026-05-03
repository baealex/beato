import type { CSSProperties, ReactNode } from 'react';

type PageContainerWidth = 'narrow' | 'wide' | 'full';

interface PageContainerProps {
    width?: PageContainerWidth;
    className?: string;
    children: ReactNode;
}

const WIDTH_MAP: Record<PageContainerWidth, string> = {
    narrow: '800px',
    wide: '960px',
    full: '100%'
};

const PageContainer = ({
    width = 'narrow',
    className,
    children
}: PageContainerProps) => {
    const style = {
        width: `min(${WIDTH_MAP[width]}, 100%)`,
        margin: '0 auto',
        padding: 'clamp(20px, 3vw, 40px)',
        paddingBottom: 'calc(clamp(20px, 3vw, 40px) + env(safe-area-inset-bottom))'
    } satisfies CSSProperties;

    return (
        <div className={className} style={style}>
            {children}
        </div>
    );
};

export default PageContainer;
