interface ConfirmOptions {
    onConfirm: (e: MouseEvent) => void;
}

const container = (function () {
    if (typeof window !== 'undefined') {
        const containerName = 'window-modal-container';

        if (!document.getElementById(containerName)) {
            const div = document.createElement('div');
            div.id = containerName;
            div.className = containerName;
            document.body.appendChild(div);
        }
        return document.getElementById(containerName);
    }
}()) as HTMLElement;

export function confirm(text: string, options: ConfirmOptions) {
    container.childNodes.forEach(($node) => {
        $node.remove();
    });

    const windowModal = document.createElement('div');
    windowModal.classList.add('window-modal');

    const window = document.createElement('div');
    window.classList.add('window');

    const windowContent = document.createElement('div');
    windowContent.classList.add('window-content');

    const windowText = document.createElement('div');
    windowText.classList.add('window-text');

    const windowButtons = document.createElement('div');
    windowButtons.classList.add('window-buttons');

    const windowConfirm = document.createElement('button');
    windowConfirm.classList.add('window-confirm');

    const windowCancel = document.createElement('button');
    windowCancel.classList.add('window-cancel');

    windowText.textContent = text;

    windowConfirm.textContent = 'OK';
    windowConfirm.addEventListener('click', (e) => {
        container.classList.remove('show');
        options.onConfirm(e);
    });

    windowCancel.textContent = 'Cancel';
    windowCancel.addEventListener('click', () => {
        container.classList.remove('show');
        windowModal.remove();
    });

    container.addEventListener('click', (e) => {
        if (e.target === container) {
            container.classList.remove('show');
            windowModal.remove();
        }
    });

    windowButtons.appendChild(windowCancel);
    windowButtons.appendChild(windowConfirm);
    windowContent.appendChild(windowText);
    windowContent.appendChild(windowButtons);
    window.appendChild(windowContent);
    windowModal.appendChild(window);
    container.appendChild(windowModal);
    container.classList.add('show');
}
