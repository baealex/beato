import type { RenderVisualizer } from './types';

const ring: RenderVisualizer = (
    canvas,
    ctx,
    bufferLength,
    dataArray
) => {
    const maxAmplitude = 255;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(canvas.width, canvas.height) / 2 * 0.6;

    const averageAmplitude = dataArray.reduce((sum, value) => sum + value, 0) / bufferLength;
    const normalizedAverageAmplitude = averageAmplitude / maxAmplitude;

    const gradient = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
    gradient.addColorStop(0.6, `rgba(255, 30, 50, ${normalizedAverageAmplitude})`);
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = 'white';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.stroke();

    for (let i = 0; i < bufferLength; i++) {
        const amplitude = dataArray[i];
        const normalizedAmplitude = amplitude / maxAmplitude;
        const circleRadius = normalizedAmplitude * 50;

        const hue = -50 + (normalizedAmplitude * 100);
        const angle = (i / bufferLength) * Math.PI * 2;
        const circleX = centerX + Math.cos(angle) * radius;
        const circleY = centerY + Math.sin(angle) * radius;

        ctx.fillStyle = `hsla(${hue}, 80%, 60%, ${normalizedAmplitude * 50}%)`;
        ctx.beginPath();
        ctx.arc(circleX, circleY, circleRadius, 0, Math.PI * 2);
        ctx.fill();
    }
};

export default ring;
