import { useAppStore as useStore } from '~/store/base-store';

import { SettingSection, Text } from '~/components/shared';
import { appCopy } from '~/config/copy';
import { ConnectorListener, socket } from '~/socket';
import { connectorStore } from '~/store/connector';


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
            description={appCopy.connectors.description}>
            <div className={'ow-connectors-section-connectorList'}>
                {connectors.map((connector) => (
                    <div key={connector.id} className={'ow-connectors-section-connector'}>
                        <div className={'ow-connectors-section-connectorCopy'}>
                            <Text as="span" size="sm" className={'ow-connectors-section-userAgent'}>
                                {connector.userAgent}
                            </Text>
                            <Text as="span" size="xs" variant="muted">
                                Connected {new Date(connector.connectedAt).toLocaleDateString()}
                            </Text>
                        </div>
                        {connector.id === socket.id ? (
                            <span className={'ow-connectors-section-thisDevice'}>This device</span>
                        ) : (
                            <button
                                className={'ow-connectors-section-kick'}
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
