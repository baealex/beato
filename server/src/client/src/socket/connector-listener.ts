import { socket } from './socket'
import { Listener } from './listener'

export const GET_CONNECTORS = 'get-connectors'
export const KICK_CONNECTOR = 'kick-connector'

interface ConnectorListenerEventHandler {
    onConnectors: (connectors: Connector[]) => void
}

export interface Connector {
    id: string;
    userAgent: string;
    connectedAt: string;
}

export class ConnectorListener implements Listener {
    handler: ConnectorListenerEventHandler | null

    constructor() {
        this.handler = null
    }

    connect(handler: ConnectorListenerEventHandler) {
        if (this.handler !== null) {
            this.disconnect()
        }
        this.handler = handler

        socket.on(GET_CONNECTORS, this.handler.onConnectors)
    }

    static kick(id: string) {
        socket.emit(KICK_CONNECTOR, { id })
    }

    disconnect() {
        if (this.handler === null) return

        socket.off(GET_CONNECTORS, this.handler.onConnectors)

        this.handler = null
    }
}
