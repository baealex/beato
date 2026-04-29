import type { RenderVisualizer } from './types';

const dna: RenderVisualizer = (
    canvas,
    ctx,
    bufferLength,
    dataArray
) => {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const time = Date.now() * 0.001;
    const rotation = time * 0.3;

    // Create a gradient background
    const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, canvas.width
    );
    gradient.addColorStop(0, '#0f0f2faa');
    gradient.addColorStop(1, '#000018aa');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add some ambient particles in the background
    const particleCount = 40;
    for (let i = 0; i < particleCount; i++) {
        const particleSize = Math.random() * 2;
        const x = centerX + Math.cos(i + time) * (canvas.width * 0.4) * Math.random();
        const y = centerY + Math.sin(i + time * 0.5) * (canvas.height * 0.4) * Math.random();

        ctx.beginPath();
        ctx.arc(x, y, particleSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.2})`;
        ctx.fill();
    }

    // Create a subtle glow effect
    ctx.shadowBlur = 15;
    ctx.shadowColor = 'rgba(120, 200, 255, 0.5)';

    const segments = 150; // More segments for smoother curves
    const helixRadius = canvas.width * 0.12; // Responsive radius
    const verticalStretch = canvas.height / 30; // Responsive vertical stretch

    // Get an average of the audio data for global effects
    let avgAudio = 0;
    for (let i = 0; i < bufferLength; i++) {
        avgAudio += dataArray[i];
    }
    avgAudio = avgAudio / bufferLength / 255;

    // The main draw loop for DNA strands
    for (let i = 0; i < segments; i++) {
        // Map audio data to this segment
        const dataIndex = Math.floor((i / segments) * Math.min(bufferLength, 128));
        const audioValue = dataArray[dataIndex] / 255.0;

        // Create wave-like motion
        const wave = Math.sin(time * 2 + i / 10) * 5;

        // Calculate a dynamic radius that pulses with the music
        const dynamicRadius = helixRadius * (1 + audioValue * 0.5);

        // Calculate helix twist angle
        const angle = (i / 12) * Math.PI + time * 0.5;

        // Y position with wave effect
        const y = (i - segments / 2) * verticalStretch + wave;

        // Calculate points for both strands
        const x1 = dynamicRadius * Math.cos(angle);
        const z1 = dynamicRadius * Math.sin(angle);

        const x2 = dynamicRadius * Math.cos(angle + Math.PI);
        const z2 = dynamicRadius * Math.sin(angle + Math.PI);

        // Apply rotation
        const rotatedX1 = x1 * Math.cos(rotation) - z1 * Math.sin(rotation);
        const rotatedZ1 = x1 * Math.sin(rotation) + z1 * Math.cos(rotation);

        const rotatedX2 = x2 * Math.cos(rotation) - z2 * Math.sin(rotation);
        const rotatedZ2 = x2 * Math.sin(rotation) + z2 * Math.cos(rotation);

        // Project to 2D with perspective
        const perspective = 1.2;
        const distance = 400;

        const scale1 = perspective * distance / (distance - rotatedZ1);
        const scale2 = perspective * distance / (distance - rotatedZ2);

        const projectedX1 = rotatedX1 * scale1 + centerX;
        const projectedY1 = y * scale1 + centerY;

        const projectedX2 = rotatedX2 * scale2 + centerX;
        const projectedY2 = y * scale2 + centerY;

        // Set strand colors based on audio and position
        // First strand: vibrant blue-pink gradient
        const hue1 = (240 + audioValue * 60) % 360;
        const strand1Alpha = Math.max(0.1, Math.min(1, (rotatedZ1 / helixRadius + 1) * 0.8));
        ctx.fillStyle = `hsla(${hue1}, 100%, ${60 + audioValue * 20}%, ${strand1Alpha})`;

        ctx.beginPath();
        const strand1Size = Math.max(1, audioValue * 6 * scale1 * 0.8);
        ctx.arc(projectedX1, projectedY1, strand1Size, 0, 2 * Math.PI);
        ctx.fill();

        // Draw glow around first strand
        if (audioValue > 0.5) {
            ctx.beginPath();
            ctx.arc(projectedX1, projectedY1, strand1Size * 1.5, 0, 2 * Math.PI);
            ctx.fillStyle = `hsla(${hue1}, 100%, 70%, ${strand1Alpha * 0.3})`;
            ctx.fill();
        }

        // Second strand: purple-cyan gradient
        const hue2 = (170 + audioValue * 60) % 360;
        const strand2Alpha = Math.max(0.1, Math.min(1, (rotatedZ2 / helixRadius + 1) * 0.8));
        ctx.fillStyle = `hsla(${hue2}, 100%, ${70 + audioValue * 20}%, ${strand2Alpha})`;

        ctx.beginPath();
        const strand2Size = Math.max(1, audioValue * 5 * scale2 * 0.8);
        ctx.arc(projectedX2, projectedY2, strand2Size, 0, 2 * Math.PI);
        ctx.fill();

        // Draw glow around second strand
        if (audioValue > 0.5) {
            ctx.beginPath();
            ctx.arc(projectedX2, projectedY2, strand2Size * 1.5, 0, 2 * Math.PI);
            ctx.fillStyle = `hsla(${hue2}, 100%, 80%, ${strand2Alpha * 0.3})`;
            ctx.fill();
        }

        // Draw connecting rungs with dynamic spacing based on audio
        const rungSpacing = Math.max(2, Math.floor(8 - avgAudio * 4));
        if (i % rungSpacing === 0) {
            ctx.beginPath();
            ctx.moveTo(projectedX1, projectedY1);
            ctx.lineTo(projectedX2, projectedY2);

            // Create a vibrant gradient for the rungs
            const rungGradient = ctx.createLinearGradient(
                projectedX1, projectedY1,
                projectedX2, projectedY2
            );
            rungGradient.addColorStop(0, `hsla(${hue1}, 100%, 70%, ${strand1Alpha * 0.7})`);
            rungGradient.addColorStop(1, `hsla(${hue2}, 100%, 70%, ${strand2Alpha * 0.7})`);

            ctx.strokeStyle = rungGradient;
            ctx.lineWidth = Math.max(0.5, audioValue * 2);
            ctx.stroke();
        }
    }

    // Reset shadow for performance
    ctx.shadowBlur = 0;
};

export default dna;
