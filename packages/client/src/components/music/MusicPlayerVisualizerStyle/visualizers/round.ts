import {
    drawVisualizerContrastLayer,
    visualizerColor,
    visualizerUnderlayColor,
    type RenderVisualizer
} from './types';

const round: RenderVisualizer = (
    canvas,
    ctx,
    bufferLength,
    dataArray,
    palette
) => {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const canvasSize = Math.min(canvas.width, canvas.height);
    const baseRadius = canvasSize * 0.17;
    const pulseRadius = canvasSize * 0.27;
    const maxAmplitude = 255;
    const angleOffset = 0;
    const dotStep = 1;

    drawVisualizerContrastLayer(canvas, ctx, palette);

    ctx.strokeStyle = visualizerUnderlayColor(palette, 0.14);
    ctx.lineWidth = 1.25;
    ctx.beginPath();
    ctx.arc(centerX, centerY, baseRadius, 0, Math.PI * 2);
    ctx.stroke();

    ctx.save();
    ctx.shadowBlur = 0;

    for (let i = 0; i < bufferLength; i += dotStep) {
        const previous = dataArray[(i - 1 + bufferLength) % bufferLength];
        const current = dataArray[i];
        const next = dataArray[(i + 1) % bufferLength];
        const edgeBlend = Math.min(i, bufferLength - 1 - i) / Math.max(1, bufferLength * 0.08);
        const wrapPartner = dataArray[bufferLength - 1 - i];
        const edgeWeight = Math.max(0, 1 - Math.min(1, edgeBlend));
        const smoothedAmplitude = (previous + current * 1.55 + next + wrapPartner * edgeWeight * 0.6) / (3.55 + edgeWeight * 0.6);
        const normalizedAmplitude = smoothedAmplitude / maxAmplitude;
        const angle = (i / bufferLength) * (2 * Math.PI) + angleOffset;
        const energy = Math.pow(normalizedAmplitude, 0.78);
        const radius = baseRadius + energy * pulseRadius;
        const dotSize = 2.8 + Math.pow(normalizedAmplitude, 1.08) * 38;
        const alpha = Math.min(1, 0.2 + normalizedAmplitude * 0.8);
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        ctx.fillStyle = visualizerColor(palette, normalizedAmplitude, alpha);
        ctx.beginPath();
        ctx.arc(x, y, dotSize, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.restore();
};

export default round;
