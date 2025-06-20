export type RenderVisualizer = (
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    bufferLength: number,
    dataArray: Uint8Array
) => void;
