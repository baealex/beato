import { describe, expect, it } from 'vitest';

import {
    createVividVisualizerPalette,
    DEFAULT_VISUALIZER_PALETTE
} from './types';

describe('visualizer palette', () => {
    it('uses the Ocean Wave violet identity color by default', () => {
        expect(DEFAULT_VISUALIZER_PALETTE.hueStart).toBe(258);
        expect(DEFAULT_VISUALIZER_PALETTE.glowHue).toBe(258);
    });

    it('keeps the player primary color in the violet hue range', () => {
        const palette = createVividVisualizerPalette({
            r: 139,
            g: 92,
            b: 246
        });

        expect(palette.hueStart).toBeGreaterThan(240);
        expect(palette.hueStart).toBeLessThan(275);
    });
});
