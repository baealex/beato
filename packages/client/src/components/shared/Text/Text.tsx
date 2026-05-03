import classNames from 'classnames';
const cx = classNames;

export type TextElement = 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'strong';
export type TextVariant = 'primary' | 'secondary' | 'tertiary' | 'muted';
export type TextSize = 'xs' | 'sm' | 'md' | 'title' | 'xl' | '2xl';
export type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold';

interface TextProps extends React.HTMLAttributes<HTMLElement> {
    as?: TextElement;
    variant?: TextVariant;
    size?: TextSize;
    weight?: TextWeight;
    truncate?: boolean;
    className?: string;
    children: React.ReactNode;
}

const Text = ({
    as: Component = 'span',
    variant = 'primary',
    size = 'md',
    weight = 'normal',
    truncate = false,
    className,
    children,
    ...props
}: TextProps) => {
    return (
        <Component
            className={cx(
                'ow-text-Text',
                `ow-text-variant-${variant}`,
                `ow-text-size-${size}`,
                `ow-text-weight-${weight}`,
                { truncate },
                className
            )}
            {...props}>
            {children}
        </Component>
    );
};

export default Text;
