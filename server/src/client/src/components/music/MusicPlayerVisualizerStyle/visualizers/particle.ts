import type { RenderVisualizer } from './types';

// A dynamic cosmic particle system visualizer
const particle: RenderVisualizer = (
    canvas,
    ctx,
    bufferLength,
    dataArray
) => {
    const maxAmplitude = 255;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Create a cosmic background with stronger colors
    const bgGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, canvas.width
    );
    bgGradient.addColorStop(0, 'rgba(30, 10, 50, 0.7)');
    bgGradient.addColorStop(0.6, 'rgba(15, 5, 35, 0.5)');
    bgGradient.addColorStop(1, 'rgba(5, 2, 15, 0.7)');

    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Calculate energy level from audio data with amplification
    const rawEnergyLevel = dataArray.reduce((sum, val) => sum + val, 0) / bufferLength / maxAmplitude;
    const energyLevel = Math.min(1, rawEnergyLevel * 1.5); // Amplify energy for more impact

    // Time-based animation - slower for more stability
    const time = Date.now() / 3000;

    // Draw more cosmic dust for better background effect
    for (let i = 0; i < 200; i++) {
        const dustSize = Math.random() * 5;
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * canvas.width * 0.7;

        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;

        const opacity = Math.random() * 0.7;
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.beginPath();
        ctx.arc(x, y, dustSize, 0, Math.PI * 2);
        ctx.fill();
    }

    // Create more dramatic spiral arms
    const arms = 3; // Increased from 3 for more impact
    const particlesPerArm = Math.floor(bufferLength / arms);

    // Draw connecting lines between arms first (for depth)
    ctx.lineWidth = 1;
    ctx.strokeStyle = `rgba(120, 180, 255, ${0.1 + energyLevel * 0.2})`;

    for (let arm = 0; arm < arms; arm++) {
        const nextArm = (arm + 1) % arms;
        const armOffset = (arm / arms) * Math.PI * 2;
        const nextArmOffset = (nextArm / arms) * Math.PI * 2;

        for (let i = 0; i < particlesPerArm; i += 3) {
            if (i + 3 >= particlesPerArm) continue;

            const dataIndex = arm * particlesPerArm + i;
            const nextDataIndex = nextArm * particlesPerArm + i;

            if (dataIndex >= bufferLength || nextDataIndex >= bufferLength) continue;

            const amplitude = dataArray[dataIndex];
            const nextAmplitude = dataArray[nextDataIndex];
            const normalizedAmplitude = amplitude / maxAmplitude;

            // Enhanced spiral formula for more dramatic effect
            const growthFactor = 0.25;
            const spiralTightness = 8 + energyLevel * 5;
            const angle = armOffset + i * 0.1 + time * (0.3 + normalizedAmplitude * 0.4);
            const nextAngle = nextArmOffset + i * 0.1 + time * (0.3 + normalizedAmplitude * 0.4);

            const distance = 40 + Math.exp(growthFactor * angle) * spiralTightness;
            const nextDistance = 40 + Math.exp(growthFactor * nextAngle) * spiralTightness;

            // Apply stronger audio reactivity
            const reactiveDistance = distance * (0.6 + normalizedAmplitude * 0.8);
            const nextReactiveDistance = nextDistance * (0.6 + (nextAmplitude / maxAmplitude) * 0.8);

            const x = centerX + Math.cos(angle) * reactiveDistance;
            const y = centerY + Math.sin(angle) * reactiveDistance;
            const nextX = centerX + Math.cos(nextAngle) * nextReactiveDistance;
            const nextY = centerY + Math.sin(nextAngle) * nextReactiveDistance;

            // Draw connecting line between arms for web effect
            if (Math.random() > 0.7) {
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(nextX, nextY);
                ctx.stroke();
            }
        }
    }

    // Draw particles on each arm
    for (let arm = 0; arm < arms; arm++) {
        const armOffset = (arm / arms) * Math.PI * 2;
        const armHue = (arm / arms) * 360;

        for (let i = 0; i < particlesPerArm; i++) {
            const dataIndex = arm * particlesPerArm + i;
            if (dataIndex >= bufferLength) continue;

            const amplitude = dataArray[dataIndex];
            const normalizedAmplitude = amplitude / maxAmplitude;

            // Skip drawing particles with very low amplitude for cleaner look
            if (normalizedAmplitude < 0.05) continue;

            // Enhanced spiral formula
            const growthFactor = 0.25;
            const spiralTightness = 8 + energyLevel * 5;
            const angle = armOffset + i * 0.1 + time * (0.3 + normalizedAmplitude * 0.4);
            const distance = 40 + Math.exp(growthFactor * angle) * spiralTightness;

            // Apply stronger audio reactivity
            const reactiveDistance = distance * (0.6 + normalizedAmplitude * 0.8);

            const x = centerX + Math.cos(angle) * reactiveDistance;
            const y = centerY + Math.sin(angle) * reactiveDistance;

            // Larger particle size for more impact
            const particleSize = 3 + normalizedAmplitude * 10;
            const hue = (armHue + i * 0.5) % 360;
            const saturation = 90 + normalizedAmplitude * 10;
            const lightness = 60 + normalizedAmplitude * 30;

            // Draw larger glow
            const glowSize = particleSize * (2 + normalizedAmplitude);
            // Ensure all parameters are finite numbers
            if (isFinite(x) && isFinite(y) && isFinite(glowSize)) {
                const gradient = ctx.createRadialGradient(
                    x, y, 0,
                    x, y, glowSize
                );
                gradient.addColorStop(0, `hsla(${hue}, ${saturation}%, ${lightness}%, ${0.8 * normalizedAmplitude})`);
                gradient.addColorStop(1, `hsla(${hue}, ${saturation}%, ${lightness}%, 0)`);

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(x, y, glowSize, 0, Math.PI * 2);
                ctx.fill();
            }

            // Draw particle core with shadow for 3D effect only if coordinates are valid
            if (isFinite(x) && isFinite(y) && isFinite(particleSize)) {
                ctx.shadowBlur = 10 * normalizedAmplitude;
                ctx.shadowColor = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.8)`;
                ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${0.9 + normalizedAmplitude * 0.1})`;
                ctx.beginPath();
                ctx.arc(x, y, particleSize, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }
    }

    // Draw larger, more dramatic galactic core
    const coreSize = 80 + energyLevel * 50;
    // Ensure all parameters are finite numbers
    if (isFinite(centerX) && isFinite(centerY) && isFinite(coreSize)) {
        const coreGradient = ctx.createRadialGradient(
            centerX, centerY, 0,
            centerX, centerY, coreSize
        );
        coreGradient.addColorStop(0, `rgba(255, 230, 200, ${0.9 + energyLevel * 0.1})`);
        coreGradient.addColorStop(0.3, `rgba(255, 180, 120, ${0.7 * energyLevel})`);
        coreGradient.addColorStop(0.7, `rgba(180, 100, 200, ${0.5 * energyLevel})`);
        coreGradient.addColorStop(1, 'rgba(80, 40, 120, 0)');

        ctx.fillStyle = coreGradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, coreSize, 0, Math.PI * 2);
        ctx.fill();
    }

    // Add dramatic lens flare effect
    if (energyLevel > 0.3) { // Lower threshold to show more often
        const flareIntensity = (energyLevel - 0.3) / 0.7;
        // Ensure all parameters are finite numbers
        if (isFinite(centerX) && isFinite(centerY) && isFinite(canvas.width)) {
            const flareGradient = ctx.createRadialGradient(
                centerX, centerY, 0,
                centerX, centerY, canvas.width
            );
            flareGradient.addColorStop(0, `rgba(255, 230, 200, ${0.15 * flareIntensity})`);
            flareGradient.addColorStop(0.1, `rgba(255, 200, 150, ${0.1 * flareIntensity})`);
            flareGradient.addColorStop(0.3, 'rgba(0, 0, 0, 0)');

            ctx.fillStyle = flareGradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        // Add cross-screen light streaks for dramatic effect
        if (energyLevel > 0.6) {
            ctx.save();
            ctx.globalAlpha = (energyLevel - 0.6) / 0.4 * 0.4;
            ctx.globalCompositeOperation = 'screen';

            const streakGradient = ctx.createLinearGradient(
                centerX - canvas.width / 2, centerY,
                centerX + canvas.width / 2, centerY
            );
            streakGradient.addColorStop(0, 'rgba(100, 100, 255, 0)');
            streakGradient.addColorStop(0.5, 'rgba(200, 200, 255, 0.5)');
            streakGradient.addColorStop(1, 'rgba(100, 100, 255, 0)');

            ctx.fillStyle = streakGradient;
            ctx.fillRect(0, centerY - 2 - energyLevel * 10, canvas.width, 4 + energyLevel * 20);

            ctx.restore();
        }
    }
};

export default particle;
