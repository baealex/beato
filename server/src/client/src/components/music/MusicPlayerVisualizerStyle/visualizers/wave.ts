import type { RenderVisualizer } from './types';

// A unique wave visualizer that creates a DNA-like double helix pattern
const wave: RenderVisualizer = (
    canvas,
    ctx,
    bufferLength,
    dataArray
) => {
    const maxAmplitude = 255;
    const centerY = canvas.height / 2;

    // Calculate average amplitude for effects
    const avgAmplitude = dataArray.reduce((sum, val) => sum + val, 0) / bufferLength / maxAmplitude;

    // Create a more dramatic gradient background
    const bgGradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width
    );
    bgGradient.addColorStop(0, `rgba(25, 25, 60, ${0.5 + avgAmplitude * 0.2})`);
    bgGradient.addColorStop(0.6, `rgba(15, 15, 45, ${0.4 + avgAmplitude * 0.1})`);
    bgGradient.addColorStop(1, `rgba(5, 5, 25, ${0.5 + avgAmplitude * 0.1})`);

    // Apply the background
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add subtle stars in the background for cosmic effect
    for (let i = 0; i < 50; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 1.5;
        const opacity = 0.1 + Math.random() * 0.3 * avgAmplitude;

        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
    }

    // Time-based animation
    const time = Date.now() / 1000;
    const waveSpeed = 2;
    const waveFrequency = 0.02;

    // Draw enhanced connecting strands between the helixes
    for (let i = 0; i < bufferLength; i += 3) { // More frequent strands for denser effect
        const amplitude = dataArray[i];
        const normalizedAmplitude = amplitude / maxAmplitude;
        const x = (canvas.width / bufferLength) * i;

        // Calculate wave positions with time-based movement
        const wave1Y = centerY - 80 * Math.sin(x * waveFrequency + time * waveSpeed) * (0.5 + normalizedAmplitude * 0.5);
        const wave2Y = centerY + 80 * Math.sin(x * waveFrequency + time * waveSpeed) * (0.5 + normalizedAmplitude * 0.5);

        // Draw connecting strand with glow effect
        const strandOpacity = 0.3 + normalizedAmplitude * 0.6; // More visible
        const strandWidth = 1 + normalizedAmplitude * 2; // Thicker for high amplitudes

        // Add glow to strands
        ctx.shadowBlur = 5 * normalizedAmplitude;
        ctx.shadowColor = `rgba(150, 200, 255, ${strandOpacity})`;

        // Use gradient for strand to create depth
        const strandGradient = ctx.createLinearGradient(x, wave1Y, x, wave2Y);
        strandGradient.addColorStop(0, `rgba(150, 200, 255, ${strandOpacity})`);
        strandGradient.addColorStop(0.5, `rgba(180, 220, 255, ${strandOpacity * 0.5})`);
        strandGradient.addColorStop(1, `rgba(150, 200, 255, ${strandOpacity})`);

        ctx.strokeStyle = strandGradient;
        ctx.lineWidth = strandWidth;
        ctx.beginPath();
        ctx.moveTo(x, wave1Y);
        ctx.lineTo(x, wave2Y);
        ctx.stroke();

        ctx.shadowBlur = 0;
    }

    // Draw the two main wave paths with enhanced effects
    const drawWave = (offset: number, baseColor: string, glowColor: string) => {
        let prevY = 0;

        // Create a path for the wave
        ctx.beginPath();

        for (let i = 0; i < bufferLength; i++) {
            const amplitude = dataArray[i];
            const normalizedAmplitude = amplitude / maxAmplitude;
            const x = (canvas.width / bufferLength) * i;

            // Wave with time-based movement and more amplitude impact
            const amplitudeFactor = 0.5 + normalizedAmplitude * 0.8; // More reactive to audio
            const y = centerY + offset * Math.sin(x * waveFrequency + time * waveSpeed) * amplitudeFactor;

            if (i === 0) {
                ctx.moveTo(x, y);
                prevY = y;
            } else {
                // Enhanced smooth curve
                const prevX = (canvas.width / bufferLength) * (i - 1);
                const midX = (prevX + x) / 2;
                ctx.quadraticCurveTo(prevX, prevY, midX, (prevY + y) / 2);
                ctx.quadraticCurveTo(midX, (prevY + y) / 2, x, y);
                prevY = y;
            }

            // Draw enhanced particles at wave points
            if (i % 3 === 0) { // More frequent particles
                const particleSize = 3 + normalizedAmplitude * 7; // Larger particles
                const particleGlow = 8 + normalizedAmplitude * 15; // More glow

                ctx.save();

                // Use color based on amplitude for more visual impact
                const particleOpacity = 0.7 + normalizedAmplitude * 0.3;
                ctx.fillStyle = baseColor.replace(')', `, ${particleOpacity})`);
                ctx.shadowBlur = particleGlow;
                ctx.shadowColor = glowColor;

                ctx.beginPath();
                ctx.arc(x, y, particleSize, 0, Math.PI * 2);
                ctx.fill();

                // Add a smaller, brighter core for more depth
                if (normalizedAmplitude > 0.5) {
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                    ctx.beginPath();
                    ctx.arc(x, y, particleSize * 0.4, 0, Math.PI * 2);
                    ctx.fill();
                }

                ctx.restore();
            }
        }

        // Finish the path with glow effect
        ctx.save();
        ctx.strokeStyle = baseColor;
        ctx.lineWidth = 3; // Thicker line
        ctx.shadowBlur = 10; // Add glow to the entire path
        ctx.shadowColor = glowColor;
        ctx.stroke();
        ctx.restore();
    };

    // Draw top wave (blue) with enhanced glow
    drawWave(-80, `rgba(100, 180, 255, ${0.7 + avgAmplitude * 0.3})`, 'rgba(120, 200, 255, 0.8)');

    // Draw bottom wave (purple) with enhanced glow
    drawWave(80, `rgba(180, 120, 255, ${0.7 + avgAmplitude * 0.3})`, 'rgba(200, 140, 255, 0.8)');

    // Add an enhanced glow overlay based on audio intensity
    const glowGradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width / 2
    );
    glowGradient.addColorStop(0, `rgba(120, 170, 255, ${0.1 + avgAmplitude * 0.2})`);
    glowGradient.addColorStop(0.5, `rgba(100, 130, 220, ${0.08 + avgAmplitude * 0.15})`);
    glowGradient.addColorStop(1, 'rgba(0, 0, 30, 0)');

    ctx.fillStyle = glowGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add dramatic light streaks when audio is intense
    if (avgAmplitude > 0.6) {
        const streakIntensity = (avgAmplitude - 0.6) / 0.4;

        ctx.save();
        ctx.globalAlpha = 0.3 * streakIntensity;
        ctx.globalCompositeOperation = 'screen';

        // Horizontal streak
        const hStreakGradient = ctx.createLinearGradient(
            0, canvas.height / 2, canvas.width, canvas.height / 2
        );
        hStreakGradient.addColorStop(0, 'rgba(100, 150, 255, 0)');
        hStreakGradient.addColorStop(0.5, 'rgba(150, 200, 255, 0.7)');
        hStreakGradient.addColorStop(1, 'rgba(100, 150, 255, 0)');

        ctx.fillStyle = hStreakGradient;
        ctx.fillRect(0, canvas.height / 2 - 5 - avgAmplitude * 15, canvas.width, 10 + avgAmplitude * 30);

        ctx.restore();
    }
};

export default wave;
