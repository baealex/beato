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
            connectors.forEach((connector) => {
                connector.emit(event, data);
            });
        }
    };
})();