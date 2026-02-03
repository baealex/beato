import styles from './Glass.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

type GlassIntensity = 'light' | 'medium' | 'heavy';
type GlassPadding = 'none' | 'sm' | 'md' | 'lg';
type GlassRadius = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

interface GlassProps {
    intensity?: GlassIntensity;
    padding?: GlassPadding;
    radius?: GlassRadius;
    className?: string;
    children: React.ReactNode;
}

const Glass = ({
    intensity = 'medium',
    padding = 'md',
    radius = 'lg',
    className,
    children
}: GlassProps) => {
    return (
        <div
            className={cx(
                'Glass',
                `intensity-${intensity}`,
                `padding-${padding}`,
                `radius-${radius}`,
                className
            )}>
            {children}
        </div>
    );
};

export default Glass;
