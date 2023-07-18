import type { Socket } from 'socket.io';

type Connector = Socket & {
    userAgent: string;
    connectedAt: number;
};

export const connectors = (() => {
    let connectors: Connector[] = [];

    return {
        get: () => connectors,
        set: (newConnectors: Connector[]) => {
            connectors = newConnectors;
        },
        remove: (id: string) => {
            connectors = connectors.filter((c) => c.id !== id);
        },
        append: (connector: Connector) => {
            connectors = [...connectors, connector];
        },
        broadcast: <T>(event: string, data: T) => {
            const promises = connectors.map((connector) => {
                return new Promise((resolve) => {
                    connector.emit(event, data, resolve);
                });
            });
            return Promise.all(promises);
        }
    };
})();