import {
    drawVisualizerContrastLayer,
    visualizerColor,
    visualizerUnderlayColor,
    type RenderVisualizer
} from './types';

interface DigitalCell {
    alpha: number;
    energy: number;
    x: number;
    y: number;
}

const CELL_THRESHOLD = 0.5;
const NODE_THRESHOLD = 0.58;
const MAX_NODES = 42;
const MAX_CONNECTIONS = 72;
const MAX_CONNECTION_DISTANCE = 2.35;

const drawConnectionLayer = (
    ctx: CanvasRenderingContext2D,
    nodes: DigitalCell[],
    gridStep: number,
    gridSize: number,
    palette: Parameters<typeof visualizerColor>[0]
) => {
    const activeNodes = [...nodes]
        .sort((a, b) => b.energy - a.energy)
        .slice(0, MAX_NODES);
    let connectionCount = 0;

    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    ctx.lineCap = 'round';

    for (let fromIndex = 0; fromIndex < activeNodes.length; fromIndex++) {
        const from = activeNodes[fromIndex];

        for (let toIndex = fromIndex + 1; toIndex < activeNodes.length; toIndex++) {
            if (connectionCount >= MAX_CONNECTIONS) {
                ctx.restore();

                return;
            }

            const to = activeNodes[toIndex];
            const distance = Math.hypot(from.x - to.x, from.y - to.y);

            if (distance > gridStep * MAX_CONNECTION_DISTANCE) {
                continue;
            }

            const energy = (from.energy + to.energy) / 2;
            const distanceFalloff = 1 - distance / (gridStep * MAX_CONNECTION_DISTANCE);
            const alpha = Math.min(0.56, 0.16 + energy * 0.26 + distanceFalloff * 0.14);

            ctx.strokeStyle = visualizerColor(palette, energy, alpha);
            ctx.lineWidth = Math.max(1.8, gridSize * (0.032 + energy * 0.022));
            ctx.beginPath();
            ctx.moveTo(from.x + gridSize / 2, from.y + gridSize / 2);
            ctx.lineTo(to.x + gridSize / 2, to.y + gridSize / 2);
            ctx.stroke();

            connectionCount++;
        }
    }

    ctx.restore();
};

const digital: RenderVisualizer = (
    canvas,
    ctx,
    bufferLength,
    dataArray,
    palette
) => {
    const gap = 5;
    const maxAmplitude = 255;
    const columns = Math.ceil(Math.sqrt(bufferLength));
    const totalGapWidth = gap * (columns - 2);
    const gridSize = Math.floor((Math.min(canvas.width, canvas.height) - totalGapWidth) / columns);
    const gridStep = gridSize + gap;
    const cells: DigitalCell[] = [];
    const nodes: DigitalCell[] = [];

    drawVisualizerContrastLayer(canvas, ctx, palette);

    ctx.save();
    ctx.fillStyle = visualizerUnderlayColor(palette, 0.42);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();

    for (let i = 0; i < bufferLength; i++) {
        const amplitude = dataArray[bufferLength - 1 - i];
        const normalizedAmplitude = amplitude / maxAmplitude;

        if (normalizedAmplitude <= CELL_THRESHOLD) {
            continue;
        }

        const x = (i % columns) * gridStep;
        const y = Math.floor(i / columns) * gridStep;
        const alpha = (normalizedAmplitude - CELL_THRESHOLD) / (1 - CELL_THRESHOLD);
        const cell = {
            alpha,
            energy: normalizedAmplitude,
            x,
            y
        };

        cells.push(cell);

        if (normalizedAmplitude > NODE_THRESHOLD) {
            nodes.push(cell);
        }
    }

    for (const cell of cells) {
        const backgroundAlpha = Math.min(0.36, cell.alpha * 0.34);

        ctx.fillStyle = visualizerUnderlayColor(palette, 0.08 + cell.energy * 0.1);
        ctx.fillRect(cell.x - 1, cell.y - 1, gridSize + 2, gridSize + 2);

        ctx.fillStyle = visualizerColor(palette, cell.energy, backgroundAlpha);
        ctx.fillRect(cell.x, cell.y, gridSize, gridSize);
    }

    drawConnectionLayer(ctx, nodes, gridStep, gridSize, palette);
};

export default digital;
