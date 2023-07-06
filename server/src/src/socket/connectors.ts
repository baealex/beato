import type { Socket } from 'socket.io';

export const connectors = (() => {
    let connectors: Socket[] = [];

    return {
        get: () => connectors,
        set: (newUsers: Socket[]) => {
            connectors = newUsers;
        },
        remove: (connector: Socket) => {
            connectors = connectors.filter((c) => c.id !== connector.id);
        },
        append: (connector: Socket) => {
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