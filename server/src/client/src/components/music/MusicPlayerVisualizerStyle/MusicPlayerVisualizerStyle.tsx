import styles from './MusicPlayerVisualizerStyle.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useMemo, useRef } from 'react';
const cx = classNames.bind(styles);

import { Image } from '~/components/shared';
import { webAudioContext } from '~/modules/web-audio-context';
import { ring, digital, line, round } from './visualizer';

interface MusicPlayerVisualizerStyleProps {
    type: string;
    isPlaying: boolean;
    src: string;
    alt: string;
}

const MusicPlayerVisualizerStyle = ({ type, isPlaying, src, alt }: MusicPlayerVisualizerStyleProps) => {
    const ref = useRef<HTMLCanvasElement>(null);
    const bufferLength = 144;
    const dataArray = useMemo(() => new Uint8Array(bufferLength), []);

    const draw = (ctx: CanvasRenderingContext2D) => {
        if (!ref.current) return;

        const canvas = ref.current;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        webAudioContext.getAnalyser()?.getByteFrequencyData(dataArray);

        if (type === 'line') {
            line(canvas, ctx, bufferLength, dataArray);
        } else if (type === 'ring') {
            ring(canvas, ctx, bufferLength, dataArray);
        } else if (type === 'digital') {
            digital(canvas, ctx, bufferLength, dataArray);
        } else {
            round(canvas, ctx, bufferLength, dataArray);
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
    }, [dataArray]);

    return (
        <div className={cx('MusicPlayerVisualizerStyle')}>
            <div className={cx('foreground-wrapper')}>
                <Image
                    className={cx('foreground', { isPlaying })}
                    src={src.replace('/resized', '')}
                    alt={alt}
                />
            </div>
            <canvas ref={ref} width={1200} height={1200} />
        </div>
    );
};

export default MusicPlayerVisualizerStyle;
