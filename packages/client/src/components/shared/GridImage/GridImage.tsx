import styles from './GridImage.module.scss';

import Image from '../Image';

interface GridImageProps {
    images: string[];
    className?: string;
}

export default function GridImage({
    images,
    className
}: GridImageProps) {
    const col = images.length >= 16 ? 4 : images.length >= 9 ? 3 : images.length >= 4 ? 2 : 1;

    return (
        <div className={`${styles.GridImage} ${className} ${styles[`col-${col}`]}`}>
            {images.length === 0 && (
                <Image />
            )}
            {images.slice(0, col * col).map((image, index) => (
                <Image
                    key={index}
                    src={image}
                    alt=""
                />
            ))}
        </div>
    );
}
