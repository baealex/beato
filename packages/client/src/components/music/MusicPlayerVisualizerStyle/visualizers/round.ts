import type { RenderVisualizer } from './types';

const round: RenderVisualizer = (
    canvas,
    ctx,
    bufferLength,
    dataArray
) => {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const barCount = bufferLength;
    const dotRadius = 50;
    const maxRadius = 500;
    const maxAmplitude = 256;

    for (let i = 0; i < barCount; i++) {
        const amplitude = dataArray[i];
        const normalizedAmplitude = amplitude / maxAmplitude;
        const angle = (i / barCount) * (2 * Math.PI);
        const radius = (amplitude / 255) * maxRadius;

        const hue = -50 + (normalizedAmplitude * 100);
        ctx.fillStyle = `hsla(${hue}, 80%, 60%, ${normalizedAmplitude * 100}%)`;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        ctx.beginPath();
        ctx.arc(x, y, dotRadius * normalizedAmplitude, 0, Math.PI * 2);
        ctx.fill();
    }
};

export default round;
