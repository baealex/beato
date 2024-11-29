import styles from './MusicPlayerPulseStyle.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useMemo, useRef } from 'react';
const cx = classNames.bind(styles);

import { Image } from '~/components/shared';
import { webAudioContext } from '~/modules/web-audio-context';

interface MusicPlayerPulseStyleProps {
    isPlaying: boolean;
    src: string;
    alt: string;
}

const MusicPlayerPulseStyle = ({ isPlaying, src, alt }: MusicPlayerPulseStyleProps) => {
    const ref = useRef<HTMLCanvasElement>(null);
    const bufferLength = 256;
    const dataArray = useMemo(() => new Uint8Array(bufferLength), []);

    const draw = (ctx: CanvasRenderingContext2D) => {
        if (!ref.current) return;

        const canvas = ref.current;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        webAudioContext.getAnalyser()?.getByteFrequencyData(dataArray);

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const barCount = bufferLength;
        const maxRadius = 500;

        for (let i = 0; i < barCount; i++) {
            const amplitude = dataArray[i];
            const angle = (i / barCount) * (2 * Math.PI);
            const radius = (amplitude / 255) * maxRadius;

            const hue = (i * 360 / barCount + (Date.now() / 50)) % 360;
            ctx.fillStyle = `hsl(${hue}, 80%, 60%)`;

            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;

            ctx.beginPath();
            ctx.arc(x, y, 24, 0, Math.PI * 2);
            ctx.fill();
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
