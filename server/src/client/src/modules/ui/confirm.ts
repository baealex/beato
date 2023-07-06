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

export function confirm(text: string): Promise<boolean> {
    return new Promise((resolve) => {
        container.childNodes.forEach(($node) => {
            $node.remove();
        });

        const html = [
            "<div class=\"window-modal\">",
            "<div class=\"window\">",
            "<div class=\"window-content\">",
            "<div class=\"window-text\">" + text + "</div>",
            "<div class=\"window-buttons\">",
            "<button class=\"window-cancel\">Cancel</button>",
            "<button class=\"window-confirm\">OK</button>",
            "</div>",
            "</div>",
            "</div>",
            "</div>"
        ].join('');

        container.innerHTML = html;

        container.querySelector('.window-cancel').addEventListener('click', () => {
            container.classList.remove('show');
            container.innerHTML = '';
            return resolve(false);
        });

        container.querySelector('.window-confirm').addEventListener('click', (e) => {
            container.classList.remove('show');
            container.innerHTML = '';
            return resolve(true);
        });

        container.addEventListener('click', (e) => {
            if (e.target === container) {
                container.classList.remove('show');
                container.innerHTML = '';
                return resolve(false);
            }
        });

        container.classList.add('show');
    });
}
