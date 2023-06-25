interface SnackBarOptions {
    onClick?: (e: MouseEvent) => void;
}

const container = (function () {
    if (typeof window !== 'undefined') {
        const containerName = 'toast-container';

        if (!document.getElementById(containerName)) {
            const div = document.createElement('div');
            div.id = containerName;
            div.className = containerName;
            document.body.appendChild(div);
        }
        return document.getElementById(containerName);
    }
}()) as HTMLElement;

export function toast(text: string, options?: SnackBarOptions) {
    container.childNodes.forEach(($node) => {
        $node.remove();
    });

    const toast = document.createElement('div');
    toast.textContent = text;
    toast.classList.add('toast');

    if (options?.onClick) {
        toast.classList.add('have-event');
        toast.addEventListener('click', options.onClick);
    }

    container.appendChild(toast);
    toast.addEventListener('animationend', () => {
        toast.remove();
    });
}
