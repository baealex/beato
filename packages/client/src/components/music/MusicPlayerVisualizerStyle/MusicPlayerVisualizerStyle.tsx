import { useEffect, useMemo, useRef } from 'react';

import { Image } from '~/components/shared';
import { getOriginalImage } from '~/modules/image';
import { webAudioContext } from '~/modules/web-audio-context';

import {
    line,
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

const MusicPlayerVisualizerStyle = ({ type, src, alt, accentColor }: MusicPlayerVisualizerStyleProps) => {
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
        <div className="relative aspect-square h-full w-full">
            <div className="absolute inset-0 z-0 aspect-square overflow-hidden rounded-2xl">
                <Image
                    className="absolute inset-0 h-full w-full rounded-2xl object-cover"
                    src={getOriginalImage(src)}
                    alt={alt}
                />
            </div>
            <canvas
                ref={ref}
                className="pointer-events-none absolute left-0 top-0 z-[1] h-full w-full rounded-2xl"
                width={900}
                height={900}
            />
        </div>
    );
};

export default MusicPlayerVisualizerStyle;
