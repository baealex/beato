export function useLongPress({
    onClick = () => { },
    onLongPress = () => { },
}, ms = 500) {
    let timer: NodeJS.Timeout;
    let touchStart = false;
    let moveTolerance = 40;

    function handleTouchStart() {
        touchStart = true;
        timer = setTimeout(() => {
            touchStart = false;
            onLongPress();
        }, ms);
    }

    function handleTouchMove(e: TouchEvent) {
        if (!touchStart) return;
        const touch = e.touches[0];
        if (
            Math.abs(touch.clientX - touch.screenX) > moveTolerance ||
            Math.abs(touch.clientY - touch.screenY) > moveTolerance
        ) {
            clearTimeout(timer);
            touchStart = false;
        }
    }

    function handleTouchEnd() {
        if (!touchStart) return;
        clearTimeout(timer);
        touchStart = false;
        onClick();
    }

    return {
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
    }
}