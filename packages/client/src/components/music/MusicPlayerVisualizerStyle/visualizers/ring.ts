import {
    visualizerColor,
    type RenderVisualizer
} from './types';

interface Point {
    x: number;
    y: number;
}

let segmentMemory: Float32Array | null = null;
let energyBaseline: Float32Array | null = null;
let frameEnergy: Float32Array | null = null;

const getBuffer = (
    source: Float32Array | null,
    length: number
) => (source && source.length === length ? source : new Float32Array(length));

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const smooth = (current: number, target: number, rise = 0.36, fall = 0.1) => {
    const amount = target > current ? rise : fall;

    return current + (target - current) * amount;
};

const roundedRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
) => {
    const resolvedRadius = Math.min(radius, width / 2, height / 2);

    ctx.beginPath();
    ctx.moveTo(x + resolvedRadius, y);
    ctx.lineTo(x + width - resolvedRadius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + resolvedRadius);
    ctx.lineTo(x + width, y + height - resolvedRadius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - resolvedRadius, y + height);
    ctx.lineTo(x + resolvedRadius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - resolvedRadius);
    ctx.lineTo(x, y + resolvedRadius);
    ctx.quadraticCurveTo(x, y, x + resolvedRadius, y);
    ctx.closePath();
};

const getRoundedRectPoint = (
    progress: number,
    x: number,
    y: number,
    size: number,
    radius: number
): Point => {
    const straight = size - radius * 2;
    const halfStraight = straight / 2;
    const cornerLength = Math.PI * radius / 2;
    const perimeter = straight * 3 + halfStraight * 2 + cornerLength * 4;
    let distance = ((progress % 1) + 1) % 1 * perimeter;

    const consume = (length: number) => {
        if (distance <= length) {
            return false;
        }

        distance -= length;

        return true;
    };

    if (!consume(halfStraight)) {
        return {
            x: x + size / 2 - distance,
            y: y + size
        };
    }

    if (!consume(cornerLength)) {
        const angle = Math.PI / 2 + distance / cornerLength * Math.PI / 2;

        return {
            x: x + radius + Math.cos(angle) * radius,
            y: y + size - radius + Math.sin(angle) * radius
        };
    }

    if (!consume(straight)) {
        return {
            x,
            y: y + size - radius - distance
        };
    }

    if (!consume(cornerLength)) {
        const angle = Math.PI + distance / cornerLength * Math.PI / 2;

        return {
            x: x + radius + Math.cos(angle) * radius,
            y: y + radius + Math.sin(angle) * radius
        };
    }

    if (!consume(straight)) {
        return {
            x: x + radius + distance,
            y
        };
    }

    if (!consume(cornerLength)) {
        const angle = Math.PI * 1.5 + distance / cornerLength * Math.PI / 2;

        return {
            x: x + size - radius + Math.cos(angle) * radius,
            y: y + radius + Math.sin(angle) * radius
        };
    }

    if (!consume(straight)) {
        return {
            x: x + size,
            y: y + radius + distance
        };
    }

    if (!consume(cornerLength)) {
        const angle = distance / cornerLength * Math.PI / 2;

        return {
            x: x + size - radius + Math.cos(angle) * radius,
            y: y + size - radius + Math.sin(angle) * radius
        };
    }

    return {
        x: x + size - radius - distance,
        y: y + size
    };
};

const drawRoundedRectSegment = (
    ctx: CanvasRenderingContext2D,
    start: number,
    end: number,
    x: number,
    y: number,
    size: number,
    radius: number
) => {
    const sampleCount = 10;

    ctx.beginPath();

    for (let sample = 0; sample <= sampleCount; sample++) {
        const progress = start + (end - start) * (sample / sampleCount);
        const point = getRoundedRectPoint(progress, x, y, size, radius);

        if (sample === 0) {
            ctx.moveTo(point.x, point.y);
        } else {
            ctx.lineTo(point.x, point.y);
        }
    }
};

const getSpectrumEnergy = (
    energies: Float32Array,
    pitch: number
) => {
    const centerIndex = clamp(Math.round(pitch * (energies.length - 1)), 0, energies.length - 1);
    let sum = 0;
    let weightSum = 0;

    for (let offset = -2; offset <= 2; offset++) {
        const index = clamp(centerIndex + offset, 0, energies.length - 1);
        const weight = 3 - Math.abs(offset);

        sum += energies[index] * weight;
        weightSum += weight;
    }

    return sum / weightSum;
};

const ring: RenderVisualizer = (
    canvas,
    ctx,
    bufferLength,
    dataArray,
    palette
) => {
    const segmentCount = 24;

    segmentMemory = getBuffer(segmentMemory, segmentCount);
    energyBaseline = getBuffer(energyBaseline, bufferLength);
    frameEnergy = getBuffer(frameEnergy, bufferLength);

    const memory = segmentMemory;
    const baseline = energyBaseline;
    const energies = frameEnergy;
    const maxAmplitude = 255;
    const canvasSize = Math.min(canvas.width, canvas.height);
    const artSize = canvasSize / 1.68;
    const rectX = (canvas.width - artSize) / 2;
    const rectY = (canvas.height - artSize) / 2;
    const cornerRadius = artSize * 0.078;

    let sumEnergy = 0;
    let peakEnergy = 0;

    for (let i = 0; i < bufferLength; i++) {
        const previous = dataArray[(i - 1 + bufferLength) % bufferLength];
        const current = dataArray[i];
        const next = dataArray[(i + 1) % bufferLength];
        const smoothedAmplitude = (previous + current * 1.7 + next) / 3.7;
        const rawEnergy = Math.pow(smoothedAmplitude / maxAmplitude, 0.94);

        sumEnergy += rawEnergy;
        peakEnergy = Math.max(peakEnergy, rawEnergy);
        energies[i] = rawEnergy;
    }

    const meanEnergy = sumEnergy / bufferLength;
    const activeRange = Math.max(0.14, peakEnergy - meanEnergy * 0.68);

    for (let i = 0; i < bufferLength; i++) {
        const rawEnergy = energies[i];
        const learnedEnergy = baseline[i] || rawEnergy;
        const relativePulse = clamp((rawEnergy - meanEnergy * 0.72) / activeRange, 0, 1);
        const localPulse = clamp((rawEnergy - learnedEnergy * 0.88) / 0.24, 0, 1);

        energies[i] = Math.max(rawEnergy * 0.08, relativePulse * 1.04, localPulse * 0.94);
        baseline[i] = learnedEnergy * 0.95 + rawEnergy * 0.05;
    }

    ctx.save();
    ctx.globalCompositeOperation = 'screen';

    const basePulse = Math.pow(clamp(meanEnergy * 0.34 + peakEnergy * 0.12, 0, 1), 0.9);
    const baseGlowColor = visualizerColor(palette, basePulse, 0.32);

    ctx.save();
    ctx.filter = `blur(${14 + basePulse * 10}px)`;
    ctx.fillStyle = visualizerColor(palette, basePulse, 0.018 + basePulse * 0.024);
    roundedRect(ctx, rectX - 5, rectY - 5, artSize + 10, artSize + 10, cornerRadius + 5);
    ctx.fill();
    ctx.shadowBlur = 34 + basePulse * 28;
    ctx.shadowColor = baseGlowColor;
    roundedRect(ctx, rectX, rectY, artSize, artSize, cornerRadius);
    ctx.fill();
    ctx.restore();

    for (let segment = 0; segment < segmentCount; segment++) {
        const pitch = segment / Math.max(1, segmentCount - 1);
        const targetEnergy = getSpectrumEnergy(energies, pitch);

        memory[segment] = smooth(memory[segment], targetEnergy, 0.58, 0.18);
    }

    for (let segment = 0; segment < segmentCount; segment++) {
        const previousEnergy = memory[Math.max(0, segment - 1)];
        const currentEnergy = memory[segment];
        const nextEnergy = memory[Math.min(segmentCount - 1, segment + 1)];
        const energy = previousEnergy * 0.22 + currentEnergy * 0.56 + nextEnergy * 0.22;

        if (energy < 0.035) {
            continue;
        }

        const pitch = segment / Math.max(1, segmentCount - 1);
        const spread = 7 + energy * 15;
        const expandedX = rectX - spread;
        const expandedY = rectY - spread;
        const expandedSize = artSize + spread * 2;
        const expandedRadius = cornerRadius + spread;
        const topStart = 0.32;
        const topRange = 0.36;
        const segmentWidth = topRange / segmentCount;
        const start = topStart + segment * segmentWidth - segmentWidth * 0.18;
        const end = topStart + (segment + 1) * segmentWidth + segmentWidth * 0.18;
        const softGlowColor = visualizerColor(palette, pitch, Math.min(0.56, 0.1 + energy * 0.34));
        const nearGlowColor = visualizerColor(palette, pitch, Math.min(0.38, 0.07 + energy * 0.22));

        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.filter = `blur(${13 + energy * 12}px)`;
        ctx.strokeStyle = softGlowColor;
        ctx.lineWidth = 28 + energy * 46;
        drawRoundedRectSegment(ctx, start, end, expandedX, expandedY, expandedSize, expandedRadius);
        ctx.stroke();
        ctx.restore();

        if (energy < 0.28) {
            continue;
        }

        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.filter = `blur(${6 + energy * 7}px)`;
        ctx.strokeStyle = nearGlowColor;
        ctx.lineWidth = 13 + energy * 24;
        drawRoundedRectSegment(ctx, start, end, rectX - 5, rectY - 5, artSize + 10, cornerRadius + 5);
        ctx.stroke();
        ctx.restore();
    }

    ctx.restore();
};

export default ring;
