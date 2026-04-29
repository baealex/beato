import type { RenderVisualizer } from './types';

const line: RenderVisualizer = (
    canvas,
    ctx,
    bufferLength,
    dataArray
) => {
    const maxAmplitude = 255;

    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0.75)');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < bufferLength; i++) {
        const amplitude = dataArray[i];
        const normalizedAmplitude = amplitude / maxAmplitude;
        const lineOffset = normalizedAmplitude * (canvas.height / 3);

        const yPosition = canvas.height - lineOffset;

        const hue = -50 + (normalizedAmplitude * 100);
        const saturation = 80;
        const lightness = 50 + (normalizedAmplitude * 20);
        ctx.strokeStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

        ctx.lineWidth = normalizedAmplitude * 20;
        ctx.lineCap = 'round';

        ctx.beginPath();
        ctx.moveTo((canvas.width / bufferLength) * i, yPosition);
        ctx.lineTo((canvas.width / bufferLength) * (i + 1), yPosition);
        ctx.stroke();
    }
};

export default line;
