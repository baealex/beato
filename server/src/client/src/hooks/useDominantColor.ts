import { useState, useEffect } from 'react';

interface RGB {
    r: number;
    g: number;
    b: number;
}

function extractDominantColor(img: HTMLImageElement): RGB {
    const canvas = document.createElement('canvas');
    const size = 64;
    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext('2d');
    if (!ctx) return { r: 20, g: 20, b: 20 };

    ctx.drawImage(img, 0, 0, size, size);

    const data = ctx.getImageData(0, 0, size, size).data;

    let r = 0, g = 0, b = 0, count = 0;

    for (let i = 0; i < data.length; i += 16) {
        const pr = data[i];
        const pg = data[i + 1];
        const pb = data[i + 2];
        const brightness = (pr + pg + pb) / 3;

        // skip very dark and very bright pixels — keep mid-range for color identity
        if (brightness < 20 || brightness > 220) continue;

        r += pr;
        g += pg;
        b += pb;
        count++;
    }

    if (count === 0) return { r: 20, g: 20, b: 20 };

    return {
        r: Math.round(r / count),
        g: Math.round(g / count),
        b: Math.round(b / count),
    };
}

export default function useDominantColor(imageUrl: string | undefined): RGB | null {
    const [color, setColor] = useState<RGB | null>(null);

    useEffect(() => {
        if (!imageUrl) {
            setColor(null);
            return;
        }

        const img = new Image();
        img.crossOrigin = 'anonymous';

        img.onload = () => {
            try {
                setColor(extractDominantColor(img));
            } catch {
                setColor(null);
            }
        };

        img.onerror = () => setColor(null);
        img.src = imageUrl;

        return () => {
            img.onload = null;
            img.onerror = null;
        };
    }, [imageUrl]);

    return color;
}
