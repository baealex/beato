import Store from 'badland';
import type { Connector } from '~/socket';
import { ConnectorListener, socket } from '~/socket';

interface ConnectorStoreState {
    connectors: Connector[];
}

class ConnectorStore extends Store<ConnectorStoreState> {
    init = false;
    listener: ConnectorListener;

    constructor() {
        super();
        this.state = {
            connectors: [],
        };
        this.listener = new ConnectorListener();
        this.listener.connect({
            onConnectors: (connectors) => {
                this.set({
                    connectors,
                });
            }
        });
    }

    get state() {
        if (!this.init) {
            this.init = true;
            this.sync();
        }
        return super.state;
    }

    set state(state) {
        super.state = state;
    }

    async sync() {
        socket.emit('get-connectors');
    }
}

export const connectorStore = new ConnectorStore();
