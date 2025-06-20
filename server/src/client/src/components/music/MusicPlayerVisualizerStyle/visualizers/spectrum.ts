import type { RenderVisualizer } from './types';

// A unique spectrum visualizer that creates a circular equalizer with 3D effect
const spectrum: RenderVisualizer = (
    canvas,
    ctx,
    bufferLength,
    dataArray
) => {
    const maxAmplitude = 255;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const avgAmplitude = dataArray.reduce((sum, val) => sum + val, 0) / bufferLength / maxAmplitude;

    const bgGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, canvas.width
    );
    bgGradient.addColorStop(0, `rgba(25, 25, 45, ${0.5 + avgAmplitude * 0.2})`);
    bgGradient.addColorStop(0.7, `rgba(15, 15, 35, ${0.5 + avgAmplitude * 0.1})`);
    bgGradient.addColorStop(1, 'rgba(5, 5, 15, 0.2)');

    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const maxBarHeight = canvas.height * 0.3;
    const minRadius = canvas.height * 0.15;

    ctx.strokeStyle = `rgba(120, 140, 255, ${0.4 + avgAmplitude * 0.6})`;
    ctx.lineWidth = 2 + avgAmplitude * 2;
    ctx.shadowBlur = 15;
    ctx.shadowColor = `rgba(100, 150, 255, ${0.5 + avgAmplitude * 0.5})`;
    ctx.beginPath();
    ctx.arc(centerX, centerY, minRadius + maxBarHeight + 10, 0, Math.PI * 2);
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.strokeStyle = `rgba(150, 170, 255, ${0.4 + avgAmplitude * 0.6})`;
    ctx.lineWidth = 1.5 + avgAmplitude * 1.5;
    ctx.shadowBlur = 10;
    ctx.shadowColor = `rgba(120, 170, 255, ${0.5 + avgAmplitude * 0.5})`;
    ctx.beginPath();
    ctx.arc(centerX, centerY, minRadius - 5, 0, Math.PI * 2);
    ctx.stroke();
    ctx.shadowBlur = 0;

    const centerRadius = minRadius * 0.7;
    const centerGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, centerRadius
    );

    centerGradient.addColorStop(0, `rgba(50, 50, 100, ${0.85 + avgAmplitude * 0.15})`);
    centerGradient.addColorStop(0.5, `rgba(70, 70, 150, ${0.7 + avgAmplitude * 0.3})`);
    centerGradient.addColorStop(0.8, `rgba(40, 40, 120, ${0.6 + avgAmplitude * 0.4})`);
    centerGradient.addColorStop(1, `rgba(20, 20, 80, ${0.4 + avgAmplitude * 0.3})`);

    ctx.shadowBlur = 20 * avgAmplitude;
    ctx.shadowColor = 'rgba(100, 150, 255, 0.8)';

    ctx.fillStyle = centerGradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, centerRadius, 0, Math.PI * 2);
    ctx.fill();

    ctx.shadowBlur = 0;

    const rippleCount = 10;
    for (let i = 0; i < rippleCount; i++) {
        const rippleIndex = Math.floor(bufferLength / (i + 1)) % bufferLength;
        const rippleAmplitude = dataArray[rippleIndex] / maxAmplitude;

        if (rippleAmplitude > 0.15) {
            const rippleRadius = centerRadius * (0.3 + i * 0.45) * (0.5 + rippleAmplitude * 0.5);
            const rippleWidth = 2 + rippleAmplitude * 4;
            const rippleOpacity = 0.2 + rippleAmplitude * 0.6;

            ctx.shadowBlur = 8 * rippleAmplitude;
            ctx.shadowColor = `rgba(150, 200, 255, ${rippleOpacity})`;

            const rippleHue = 210 + i * 15;
            ctx.strokeStyle = `hsla(${rippleHue}, 80%, 70%, ${rippleOpacity})`;
            ctx.lineWidth = rippleWidth;
            ctx.beginPath();
            ctx.arc(centerX, centerY, rippleRadius, 0, Math.PI * 2);
            ctx.stroke();

            ctx.shadowBlur = 0;
        }
    }

    if (avgAmplitude > 0.3) {
        const glowIntensity = (avgAmplitude - 0.3) / 0.7;
        const glowRadius = canvas.width * 0.8;

        const glowGradient = ctx.createRadialGradient(
            centerX, centerY, 0,
            centerX, centerY, glowRadius
        );

        glowGradient.addColorStop(0, `rgba(100, 150, 255, ${0.2 * glowIntensity})`);
        glowGradient.addColorStop(0.5, `rgba(80, 120, 220, ${0.15 * glowIntensity})`);
        glowGradient.addColorStop(0.8, `rgba(60, 90, 180, ${0.1 * glowIntensity})`);
        glowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = glowGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (avgAmplitude > 0.6) {
            const streakIntensity = (avgAmplitude - 0.4) / 0.2;

            ctx.save();
            ctx.globalAlpha = 0.3 * streakIntensity;
            ctx.globalCompositeOperation = 'screen';

            const streakGradient = ctx.createLinearGradient(
                0, centerY, canvas.width, centerY
            );
            streakGradient.addColorStop(0, 'rgba(100, 150, 255, 0)');
            streakGradient.addColorStop(0.5, 'rgba(150, 200, 255, 0.7)');
            streakGradient.addColorStop(1, 'rgba(100, 150, 255, 0)');

            ctx.fillStyle = streakGradient;
            ctx.fillRect(0, centerY - 5 - avgAmplitude * 15, canvas.width, 10 + avgAmplitude * 30);

            ctx.restore();
        }
    }
};

export default spectrum;
