import type { RenderVisualizer } from './types';

const neon: RenderVisualizer = (
    canvas,
    ctx,
    bufferLength,
    dataArray
) => {
    const maxAmplitude = 255;
    const centerY = canvas.height / 2;
    const centerX = canvas.width / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const rawAvgAmplitude = dataArray.reduce((sum, val) => sum + val, 0) / bufferLength / maxAmplitude;
    const avgAmplitude = Math.min(1, rawAvgAmplitude * 1.5);

    const bgGradient = ctx.createLinearGradient(
        0, 0, canvas.width, canvas.height
    );
    bgGradient.addColorStop(0, 'rgba(5, 5, 15, 0.1)');
    bgGradient.addColorStop(0.5, 'rgba(10, 10, 25, 0.7)');
    bgGradient.addColorStop(1, 'rgba(5, 5, 15, 0.9)');

    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const gridSize = 40;
    const gridOpacity = 0.15 + avgAmplitude * 0.1;
    ctx.strokeStyle = `rgba(0, 200, 255, ${gridOpacity})`;
    ctx.lineWidth = 0.5;

    for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }

    for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    const time = Date.now() / 800;

    const hexSize = 250;
    const hexPoints = 3;
    const hexRotation = time * 0.2;

    const isOdd = Math.floor(avgAmplitude * 10) % 2 === 1;
    const isEven = Math.floor(avgAmplitude * 10) % 2 === 0;

    ctx.save();
    ctx.strokeStyle = `rgba(0, 255, 200, ${0.5 + avgAmplitude * 0.5})`;
    ctx.lineWidth = isEven ? 5 + avgAmplitude * 8 : 5 + avgAmplitude * 8 / 2;
    ctx.shadowBlur = isEven ? 15 + avgAmplitude * 40 : 15 + avgAmplitude * 40 / 2;
    ctx.shadowColor = 'rgba(0, 255, 200, 0.8)';

    ctx.beginPath();
    for (let i = 0; i < hexPoints; i++) {
        const angle = (i / hexPoints) * Math.PI * 2 + hexRotation;
        const x = centerX + Math.cos(angle) * hexSize;
        const y = centerY + Math.sin(angle) * hexSize;

        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.closePath();
    ctx.stroke();

    ctx.strokeStyle = `rgba(255, 50, 120, ${0.5 + avgAmplitude * 0.5})`;
    ctx.lineWidth = isOdd ? 5 + avgAmplitude * 5 : 5 + avgAmplitude * 5 / 2;
    ctx.shadowBlur = isOdd ? 15 + avgAmplitude * 40 : 15 + avgAmplitude * 40 / 2;
    ctx.shadowColor = 'rgba(255, 50, 120, 0.8)';

    ctx.beginPath();
    for (let i = 0; i < hexPoints; i++) {
        const angle = (i / hexPoints) * Math.PI * 2 + hexRotation + Math.PI / 3; // Offset rotation
        const x = centerX + Math.cos(angle) * (hexSize * 1);
        const y = centerY + Math.sin(angle) * (hexSize * 1);

        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.closePath();
    ctx.stroke();
    ctx.restore();

    if (avgAmplitude > 0.5) {
        ctx.save();
        ctx.globalAlpha = (avgAmplitude - 0.5) / 0.3 * 0.3;
        ctx.globalCompositeOperation = 'screen';
        const glitchCount = Math.floor(avgAmplitude * 5);

        for (let i = 0; i < glitchCount; i++) {
            const glitchX = Math.random() * canvas.width;
            const glitchY = Math.random() * canvas.height;
            const glitchWidth = Math.random() * 100 + 50;
            const glitchHeight = Math.random() * 10 + 5;

            const colors = [
                'rgba(255, 0, 100, 0.3)',
                'rgba(0, 255, 200, 0.3)',
                'rgba(200, 255, 0, 0.3)'
            ];
            ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
            ctx.fillRect(glitchX, glitchY, glitchWidth, glitchHeight);
        }

        ctx.restore();
    }
};

export default neon;
