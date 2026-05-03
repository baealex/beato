import classNames from 'classnames';

import Image from '../Image';

const cx = classNames;

interface GridImageProps {
    images: string[];
    className?: string;
}

const gridClassByColumn = {
    1: 'grid-cols-1 grid-rows-1',
    2: 'grid-cols-2 grid-rows-2',
    3: 'grid-cols-3 grid-rows-3',
    4: 'grid-cols-4 grid-rows-4'
} as const;

export default function GridImage({
    images,
    className
}: GridImageProps) {
    const col = images.length >= 16 ? 4 : images.length >= 9 ? 3 : images.length >= 4 ? 2 : 1;

    return (
        <div className={cx('grid aspect-square overflow-hidden', gridClassByColumn[col], '[&_img]:h-full [&_img]:w-full [&_img]:object-cover', className)}>
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
