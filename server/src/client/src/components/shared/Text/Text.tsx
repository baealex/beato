import styles from './Text.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export type TextElement = 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div';
export type TextVariant = 'primary' | 'secondary' | 'tertiary' | 'muted';
export type TextSize = 'xs' | 'sm' | 'md' | 'base' | 'lg' | 'title' | 'xl' | '2xl';
export type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold';

interface TextProps {
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
    children
}: TextProps) => {
    return (
        <Component
            className={cx(
                'Text',
                `variant-${variant}`,
                `size-${size}`,
                `weight-${weight}`,
                { truncate },
                className
            )}>
            {children}
        </Component>
    );
};

export default Text;
