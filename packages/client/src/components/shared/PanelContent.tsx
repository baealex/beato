import classNames from 'classnames';

const cx = classNames;

interface PanelContentProps {
    header?: React.ReactNode;
    items?: {
        icon: React.ReactNode;
        text: string;
        isActive?: boolean;
        onClick: () => void;
    }[];
    footer?: React.ReactNode;
}

export const panelContentClass = {
    actionLink: 'relative w-full border-0 bg-transparent pr-10 text-left font-inherit text-inherit after:absolute after:right-4 after:top-1/2 after:h-2.5 after:w-2.5 after:-translate-y-1/2 after:rotate-45 after:border-r-2 after:border-t-2 after:border-[var(--b-color-text-muted)] after:content-[""]',
    albumLink: 'flex flex-row items-center gap-4 overflow-hidden rounded-lg',
    cover: 'h-[60px] w-[60px] rounded-lg object-cover',
    coverGrid: 'h-[60px] w-[60px]',
    artistLink: 'flex flex-col',
    subTitle: 'mb-1 text-sm text-[var(--b-color-text-muted)]',
    subContent: 'text-sm font-bold'
};

export default function PanelContent({ header, items, footer }: PanelContentProps) {
    return (
        <div>
            {header && (
                <div className="mt-6 flex flex-col gap-6 border-b border-[var(--b-color-border)] pb-6">
                    {header}
                </div>
            )}
            {items && (
                <div className="m-0 flex list-none flex-col border-b border-[var(--b-color-border)] py-4">
                    {items.map(({ icon, text, isActive, onClick }) => (
                        <button
                            key={text}
                            className={cx(
                                'flex w-full items-center gap-4 rounded-lg border-0 bg-transparent py-4 text-left font-inherit text-[var(--b-color-text)]',
                                '[&_svg]:h-[1.125rem] [&_svg]:w-[1.125rem]',
                                isActive && '[&_svg]:fill-[var(--b-color-point)] [&_svg]:text-[var(--b-color-point)]'
                            )}
                            onClick={onClick}>
                            {icon}
                            <span className="min-w-0 truncate text-base font-medium">{text}</span>
                        </button>
                    ))}
                </div>
            )}
            {footer && (
                <div className="flex flex-row flex-wrap items-center gap-2 pt-4 text-sm text-[var(--b-color-text-muted)]">
                    {footer}
                </div>
            )}
        </div>
    );
}
