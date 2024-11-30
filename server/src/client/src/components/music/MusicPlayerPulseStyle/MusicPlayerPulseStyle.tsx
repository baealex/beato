import styles from './MusicPlayerPulseStyle.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useMemo, useRef } from 'react';
const cx = classNames.bind(styles);

import { Image } from '~/components/shared';
import { webAudioContext } from '~/modules/web-audio-context';
import { blur, grid, pulse, round } from './visualizer';

interface MusicPlayerPulseStyleProps {
    type: string;
    isPlaying: boolean;
    src: string;
    alt: string;
}

const MusicPlayerPulseStyle = ({ type, isPlaying, src, alt }: MusicPlayerPulseStyleProps) => {
    const ref = useRef<HTMLCanvasElement>(null);
    const bufferLength = 144;
    const dataArray = useMemo(() => new Uint8Array(bufferLength), []);
    console.log(type);

    const draw = (ctx: CanvasRenderingContext2D) => {
        if (!ref.current) return;

        const canvas = ref.current;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        webAudioContext.getAnalyser()?.getByteFrequencyData(dataArray);

        if (type === 'pulse') {
            pulse(canvas, ctx, bufferLength, dataArray);
        } else if (type === 'round') {
            round(canvas, ctx, bufferLength, dataArray);
        } else if (type === 'grid') {
            grid(canvas, ctx, bufferLength, dataArray);
        } else {
            blur(canvas, ctx, bufferLength, dataArray);
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
        <div className={cx('MusicPlayerPulseStyle')}>
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

export default MusicPlayerPulseStyle;
