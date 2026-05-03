import classNames from 'classnames';
const cx = classNames;

type CardVariant = 'elevated' | 'flat' | 'outlined';
type CardPadding = 'none' | 'sm' | 'md' | 'lg';
type CardRadius = 'md' | 'lg' | 'xl' | '2xl';

interface CardProps {
    variant?: CardVariant;
    padding?: CardPadding;
    radius?: CardRadius;
    interactive?: boolean;
    overflow?: boolean;
    className?: string;
    onClick?: () => void;
    children: React.ReactNode;
}

const Card = ({
    variant = 'elevated',
    padding = 'md',
    radius = 'lg',
    interactive = false,
    overflow = false,
    className,
    onClick,
    children
}: CardProps) => {
    return (
        <div
            className={cx(
                'ow-card-Card',
                `ow-card-variant-${variant}`,
                `ow-card-padding-${padding}`,
                `ow-card-radius-${radius}`,
                {
                    interactive,
                    overflow
                },
                className
            )}
            onClick={onClick}>
            {children}
        </div>
    );
};

export default Card;
