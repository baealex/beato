import { useStore } from 'badland-react';

import { ConnectorListener, socket } from '~/socket';
import { connectorStore } from '~/store/connector';

import styles from './ConnectorsSection.module.scss';

export const ConnectorsSection = () => {
    const [{ connectors }] = useStore(connectorStore);

    return (
        <section>
            <h3>Connectors</h3>
            {connectors.map((connector) => (
                <div key={connector.id} className={styles.connector}>
                    <span>{connector.userAgent}</span>
                    <span className={styles.date}>{new Date(connector.connectedAt).toLocaleDateString()}</span>
                    {connector.id === socket.id ? (
                        <span className={styles.thisDevice}>This device</span>
                    ) : (
                        <button
                            className={styles.kick}
                            onClick={() => ConnectorListener.remove(connector.id)}>
                            Remove
                        </button>
                    )}
                </div>
            ))}
        </section>
    );
};
