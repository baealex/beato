import type { RenderVisualizer } from './types';

const digital: RenderVisualizer = (
    canvas,
    ctx,
    bufferLength,
    dataArray
) => {
    const gap = 5;
    const maxAmplitude = 255;
    const totalGapWidth = gap * (Math.ceil(Math.sqrt(bufferLength)) - 2);
    const gridSize = Math.floor((Math.min(canvas.width, canvas.height) - totalGapWidth) / Math.ceil(Math.sqrt(bufferLength)));

    for (let i = 0; i < bufferLength; i++) {
        const amplitude = dataArray[bufferLength - 1 - i];
        const normalizedAmplitude = amplitude / maxAmplitude;

        const x = (i % Math.ceil(Math.sqrt(bufferLength))) * (gridSize + gap);
        const y = Math.floor(i / Math.ceil(Math.sqrt(bufferLength))) * (gridSize + gap);

        if (normalizedAmplitude > 0.5) {
            const hue = -200 + (normalizedAmplitude * 100);
            ctx.fillStyle = `hsla(${hue}, 80%, 60%, ${(normalizedAmplitude - 0.5) / 0.5 * 100}%)`;
            ctx.fillRect(x, y, gridSize, gridSize);
        }
    }
};

export default digital;
