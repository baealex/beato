import styles from './MusicPlayerVisualizerStyle.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useMemo, useRef } from 'react';
const cx = classNames.bind(styles);

import { Image } from '~/components/shared';
import { getOriginalImage } from '~/modules/image';
import { webAudioContext } from '~/modules/web-audio-context';

import {
    digital,
    line,
    ring,
    round
} from './visualizers';
import {
    createVividVisualizerPalette,
    type RGB
} from './visualizers/types';

interface MusicPlayerVisualizerStyleProps {
    type: string;
    isPlaying: boolean;
    src: string;
    alt: string;
    accentColor?: RGB | null;
}

const MusicPlayerVisualizerStyle = ({ type, isPlaying, src, alt, accentColor }: MusicPlayerVisualizerStyleProps) => {
    const ref = useRef<HTMLCanvasElement>(null);
    const bufferLength = 144;
    const dataArray = useMemo(() => new Uint8Array(bufferLength), []);
    const palette = useMemo(() => createVividVisualizerPalette(accentColor), [accentColor]);

    const draw = (ctx: CanvasRenderingContext2D) => {
        if (!ref.current) return;

        const canvas = ref.current;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        webAudioContext.getAnalyser()?.getByteFrequencyData(dataArray);

        switch (type) {
            case 'line':
                line(canvas, ctx, bufferLength, dataArray, palette);
                break;
            case 'ring':
                ring(canvas, ctx, bufferLength, dataArray, palette);
                break;
            case 'digital':
                digital(canvas, ctx, bufferLength, dataArray, palette);
                break;
            default:
                round(canvas, ctx, bufferLength, dataArray, palette);
                break;
        }
    };

    useEffect(() => {
        if (!ref.current) return;

        const canvas = ref.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId = 0;

        const animate = () => {
            draw(ctx);
            animationId = requestAnimationFrame(animate);
        };

        animationId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationId);
        };
    }, [dataArray, palette, type]);

    return (
        <div className={cx('MusicPlayerVisualizerStyle', { halo: type === 'ring' })}>
            <div className={cx('foreground-wrapper')}>
                <Image
                    className={cx('foreground', { isPlaying })}
                    src={getOriginalImage(src)}
                    alt={alt}
                />
            </div>
            <canvas
                ref={ref}
                width={type === 'ring' ? 640 : 900}
                height={type === 'ring' ? 640 : 900}
            />
        </div>
    );
};

export default MusicPlayerVisualizerStyle;
