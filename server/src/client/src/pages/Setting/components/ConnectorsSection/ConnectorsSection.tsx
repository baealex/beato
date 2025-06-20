import { useStore } from 'badland-react';

import { SettingSection } from '~/components/shared';
import { ConnectorListener, socket } from '~/socket';
import { connectorStore } from '~/store/connector';

import styles from './ConnectorsSection.module.scss';

const DevicesIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round">
        <rect
            x="2"
            y="3"
            width="20"
            height="14"
            rx="2"
            ry="2"
        />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
);

export const ConnectorsSection = () => {
    const [{ connectors }] = useStore(connectorStore);

    return (
        <SettingSection
            title="Connected Devices"
            icon={<DevicesIcon />}
            description="Manage devices connected to your Beato account.">
            <div>
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
            </div>
        </SettingSection>
    );
};
