type RenderVisualizer = (
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    bufferLength: number,
    dataArray: Uint8Array
) => void;

export const round: RenderVisualizer = (
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

export const ring: RenderVisualizer = (
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

export const digital: RenderVisualizer = (
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

export const line: RenderVisualizer = (
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
