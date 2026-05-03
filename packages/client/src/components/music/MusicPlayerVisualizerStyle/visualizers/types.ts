export type RenderVisualizer = (
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    bufferLength: number,
    dataArray: Uint8Array,
    palette?: VisualizerPalette
) => void;

export interface RGB {
    r: number;
    g: number;
    b: number;
}

export interface VisualizerPalette {
    hueStart: number;
    hueRange: number;
    saturation: number;
    lightnessBase: number;
    lightnessRange: number;
    glowHue: number;
    scrimAlpha: number;
    underlayAlpha: number;
}

const IDENTITY_GREEN_HUE = 141;
const ALBUM_HUE_IDENTITY_PULL = 0;

export const DEFAULT_VISUALIZER_PALETTE: VisualizerPalette = {
    hueStart: IDENTITY_GREEN_HUE,
    hueRange: 0,
    saturation: 98,
    lightnessBase: 54,
    lightnessRange: 10,
    glowHue: IDENTITY_GREEN_HUE,
    scrimAlpha: 0.22,
    underlayAlpha: 0.34
};

const normalizeHue = (hue: number) => ((hue % 360) + 360) % 360;

const getHueDelta = (from: number, to: number) => ((to - from + 540) % 360) - 180;

const mixHue = (from: number, to: number, amount: number) => normalizeHue(
    from + getHueDelta(from, to) * amount
);

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const getLuminance = ({ r, g, b }: RGB) => (
    0.2126 * r + 0.7152 * g + 0.0722 * b
) / 255;

const rgbToHue = ({ r, g, b }: RGB) => {
    const red = r / 255;
    const green = g / 255;
    const blue = b / 255;
    const max = Math.max(red, green, blue);
    const min = Math.min(red, green, blue);
    const delta = max - min;

    if (delta === 0) {
        return IDENTITY_GREEN_HUE;
    }

    if (max === red) {
        return normalizeHue(60 * (((green - blue) / delta) % 6));
    }

    if (max === green) {
        return normalizeHue(60 * ((blue - red) / delta + 2));
    }

    return normalizeHue(60 * ((red - green) / delta + 4));
};

export const createVividVisualizerPalette = (accentColor?: RGB | null): VisualizerPalette => {
    const albumHue = accentColor ? rgbToHue(accentColor) : IDENTITY_GREEN_HUE;
    const luminance = accentColor ? getLuminance(accentColor) : 0.5;
    const seedHue = accentColor
        ? mixHue(albumHue, IDENTITY_GREEN_HUE, ALBUM_HUE_IDENTITY_PULL)
        : IDENTITY_GREEN_HUE;

    return {
        hueStart: seedHue,
        hueRange: 0,
        saturation: 98,
        lightnessBase: 54,
        lightnessRange: 10,
        glowHue: seedHue - 12,
        scrimAlpha: clamp(0.14 + luminance * 0.18, 0.14, 0.32),
        underlayAlpha: clamp(0.24 + luminance * 0.2, 0.24, 0.44)
    };
};

export const hslaColor = (
    hue: number,
    saturation: number,
    lightness: number,
    alpha = 1
) => `hsla(${normalizeHue(hue)}, ${saturation}%, ${lightness}%, ${alpha})`;

export const visualizerColor = (
    palette: VisualizerPalette | undefined,
    normalizedAmplitude: number,
    alpha = 1
) => {
    const resolvedPalette = palette ?? DEFAULT_VISUALIZER_PALETTE;
    const hue = resolvedPalette.hueStart + normalizedAmplitude * resolvedPalette.hueRange;
    const lightness = resolvedPalette.lightnessBase + normalizedAmplitude * resolvedPalette.lightnessRange;

    return hslaColor(hue, resolvedPalette.saturation, lightness, alpha);
};

export const visualizerUnderlayColor = (
    palette: VisualizerPalette | undefined,
    alpha = 1
) => {
    const resolvedPalette = palette ?? DEFAULT_VISUALIZER_PALETTE;

    return `rgba(0, 10, 12, ${resolvedPalette.underlayAlpha * alpha})`;
};

export const drawVisualizerContrastLayer = (
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    palette?: VisualizerPalette
) => {
    const resolvedPalette = palette ?? DEFAULT_VISUALIZER_PALETTE;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.max(canvas.width, canvas.height) * 0.72;

    ctx.save();

    const scrim = ctx.createLinearGradient(0, 0, 0, canvas.height);
    scrim.addColorStop(0, `rgba(0, 12, 16, ${resolvedPalette.scrimAlpha * 0.7})`);
    scrim.addColorStop(0.55, `rgba(0, 8, 12, ${resolvedPalette.scrimAlpha * 0.36})`);
    scrim.addColorStop(1, `rgba(0, 8, 12, ${resolvedPalette.scrimAlpha})`);
    ctx.fillStyle = scrim;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const primaryWash = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
    primaryWash.addColorStop(0, hslaColor(resolvedPalette.glowHue, 100, 62, resolvedPalette.scrimAlpha * 0.22));
    primaryWash.addColorStop(0.62, hslaColor(resolvedPalette.glowHue, 100, 54, resolvedPalette.scrimAlpha * 0.06));
    primaryWash.addColorStop(1, `rgba(0, 0, 0, ${resolvedPalette.scrimAlpha * 0.24})`);
    ctx.fillStyle = primaryWash;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.restore();
};
