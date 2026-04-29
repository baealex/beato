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
    const triangleRotation = time * 0.2;

    // Split data array into lower and upper half
    const halfIndex = Math.floor(bufferLength / 2);
    const lowerHalfData = dataArray.slice(0, halfIndex);
    const upperHalfData = dataArray.slice(halfIndex);
    const lowerHalfAmplitude = lowerHalfData.reduce((sum, val) => sum + val, 0) / bufferLength / maxAmplitude;
    const upperHalfAmplitude = upperHalfData.reduce((sum, val) => sum + val, 0) / bufferLength / maxAmplitude;

    // Draw the red triangle (lower half of data)
    drawDynamicTriangle(
        ctx,
        centerX,
        centerY,
        250 + 250 * lowerHalfAmplitude,
        triangleRotation,
        lowerHalfData,
        'red'
    );

    // Draw the green triangle (upper half of data)
    drawDynamicTriangle(
        ctx,
        centerX,
        centerY,
        250 + 250 * upperHalfAmplitude,
        triangleRotation + Math.PI / 3, // Slightly offset rotation
        upperHalfData,
        'green'
    );

    // Add glitch effect on high amplitude
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

/**
 * Draw a dynamic triangle where each line segment reacts to audio data
 */
function drawDynamicTriangle(
    ctx: CanvasRenderingContext2D,
    centerX: number,
    centerY: number,
    baseSize: number,
    rotation: number,
    dataSegment: Uint8Array,
    baseColor: 'red' | 'green'
) {
    const trianglePoints = 3;
    const maxAmplitude = 255;

    // Calculate the vertex positions
    const vertices: { x: number; y: number }[] = [];
    for (let i = 0; i < trianglePoints; i++) {
        const angle = (i / trianglePoints) * Math.PI * 2 + rotation;
        const x = centerX + Math.cos(angle) * baseSize;
        const y = centerY + Math.sin(angle) * baseSize;
        vertices.push({
            x,
            y
        });
    }

    // Close the loop by adding the first vertex again
    vertices.push({ ...vertices[0] });

    // Calculate how many data points to use for each line segment
    const dataPointsPerSegment = Math.floor(dataSegment.length / trianglePoints);

    // Draw each line segment with its own glow based on data
    for (let segmentIndex = 0; segmentIndex < trianglePoints; segmentIndex++) {
        // Get start and end vertices for this segment
        const startVertex = vertices[segmentIndex];
        const endVertex = vertices[segmentIndex + 1];

        // Calculate the number of sub-segments to draw
        const subSegmentCount = dataPointsPerSegment;

        // Draw multiple small line segments between each vertex pair
        for (let subIndex = 0; subIndex < subSegmentCount; subIndex++) {
            // Calculate the position along the line for this sub-segment
            const ratio = subIndex / subSegmentCount;
            const startX = startVertex.x + (endVertex.x - startVertex.x) * ratio;
            const startY = startVertex.y + (endVertex.y - startVertex.y) * ratio;

            const nextRatio = (subIndex + 1) / subSegmentCount;
            const endX = startVertex.x + (endVertex.x - startVertex.x) * nextRatio;
            const endY = startVertex.y + (endVertex.y - startVertex.y) * nextRatio;

            // Get the data value for this sub-segment
            const dataIndex = segmentIndex * dataPointsPerSegment + subIndex;
            const dataValue = dataSegment[dataIndex % dataSegment.length];
            const normalizedData = dataValue / maxAmplitude;

            // Set color and glow based on data value
            ctx.save();

            // Choose color based on triangle type (red or green)
            let glowColor: string;
            if (baseColor === 'red') {
                glowColor = `rgba(255, ${Math.floor(normalizedData * 50)}, ${Math.floor(normalizedData * 100)}, ${0.5 + normalizedData * 0.5})`;
            } else { // green
                glowColor = `rgba(${Math.floor(normalizedData * 50)}, 255, ${Math.floor(normalizedData * 255)}, ${0.5 + normalizedData * 0.5})`;
            }

            ctx.strokeStyle = glowColor;
            ctx.lineWidth = 2 + normalizedData * 12;
            ctx.shadowBlur = 5 + normalizedData * 30;
            ctx.shadowColor = glowColor;

            // Draw the sub-segment
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();

            ctx.restore();
        }
    }
}

export default neon;
