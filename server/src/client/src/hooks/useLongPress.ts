export function useLongPress({
    onClick = () => { },
    onLongPress = () => { },
}, ms = 500) {
    let timer: NodeJS.Timeout;

    function handleTouchStart() {
        timer = setTimeout(() => {
            onLongPress();
        }, ms);
    }

    function handleTouchEnd() {
        clearTimeout(timer);
        onClick();
    }

    return {
        handleTouchStart,
        handleTouchEnd,
    }
}