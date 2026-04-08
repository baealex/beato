import type { PointerEventHandler } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

interface UseDragDismissOptions {
    enabled?: boolean;
    closeThreshold?: number;
    onDismiss?: () => void;
}

interface UseDragDismissResult {
    dragOffset: number;
    handlePointerDown: PointerEventHandler<HTMLDivElement>;
    handlePointerMove: PointerEventHandler<HTMLDivElement>;
    handlePointerEnd: PointerEventHandler<HTMLDivElement>;
}

const DEFAULT_CLOSE_THRESHOLD = 72;

const useDragDismiss = ({
    enabled = true,
    closeThreshold = DEFAULT_CLOSE_THRESHOLD,
    onDismiss
}: UseDragDismissOptions): UseDragDismissResult => {
    const pointerStartY = useRef<number | null>(null);
    const dragOffsetRef = useRef(0);
    const [dragOffset, setDragOffset] = useState(0);

    useEffect(() => {
        if (enabled) {
            return;
        }

        pointerStartY.current = null;
        dragOffsetRef.current = 0;
        setDragOffset(0);
    }, [enabled]);

    const handlePointerDown = useCallback<PointerEventHandler<HTMLDivElement>>((event) => {
        if (!enabled) {
            return;
        }

        pointerStartY.current = event.clientY;
        event.currentTarget.setPointerCapture(event.pointerId);
    }, [enabled]);

    const handlePointerMove = useCallback<PointerEventHandler<HTMLDivElement>>((event) => {
        if (!enabled || pointerStartY.current === null) {
            return;
        }

        const nextOffset = Math.max(0, event.clientY - pointerStartY.current);

        dragOffsetRef.current = nextOffset;
        setDragOffset(nextOffset);
    }, [enabled]);

    const handlePointerEnd = useCallback<PointerEventHandler<HTMLDivElement>>((event) => {
        if (!enabled || pointerStartY.current === null) {
            return;
        }

        event.currentTarget.releasePointerCapture(event.pointerId);

        const shouldDismiss = dragOffsetRef.current >= closeThreshold;

        pointerStartY.current = null;
        dragOffsetRef.current = 0;
        setDragOffset(0);

        if (shouldDismiss) {
            onDismiss?.();
        }
    }, [closeThreshold, enabled, onDismiss]);

    return {
        dragOffset,
        handlePointerDown,
        handlePointerMove,
        handlePointerEnd
    };
};

export default useDragDismiss;
