import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { ConnectorListener, PlaybackListener, socket, type Connector } from '~/socket';
import { useStore } from 'badland-react';
import { queueStore } from '~/store/queue';

const Container = styled.div`
    padding: 1rem;
    min-width: 300px;

    .device-list {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .device-item {
        display: flex;
        align-items: center;
        padding: 1rem;
        border-radius: 0.5rem;
        background-color: var(--b-color-background-layer-1);
        cursor: pointer;
        transition: background-color 0.2s;

        &:hover {
            background-color: var(--b-color-background-layer-2);
        }

        &.active {
            background-color: var(--b-color-point);
            color: var(--b-color-background);

            .device-status {
                color: var(--b-color-background);
            }
        }
    }

    .device-info {
        flex: 1;

        .device-name {
            font-weight: bold;
            margin-bottom: 0.25rem;
        }

        .device-status {
            font-size: 0.875rem;
            opacity: 0.7;
        }
    }

    .device-icon {
        margin-right: 1rem;
        width: 2rem;
        height: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;

        svg {
            width: 1.5rem;
            height: 1.5rem;
        }
    }

    .empty-state {
        padding: 2rem;
        text-align: center;
        opacity: 0.6;
    }
`;

interface DeviceSelectorProps {
    onClose?: () => void;
}

export function DeviceSelector({ onClose }: DeviceSelectorProps) {
    const [connectors, setConnectors] = useState<Connector[]>([]);
    const [state] = useStore(queueStore);

    useEffect(() => {
        const connectorListener = new ConnectorListener();

        connectorListener.connect({
            onConnectors: (newConnectors) => {
                setConnectors(newConnectors);
            }
        });

        return () => {
            connectorListener.disconnect();
        };
    }, []);

    const handleDeviceClick = (deviceId: string) => {
        PlaybackListener.transferPlayback(deviceId);
        onClose?.();
    };

    const getDeviceName = (userAgent: string) => {
        // User Agent에서 브라우저와 OS 정보 추출
        if (userAgent.includes('Chrome')) {
            if (userAgent.includes('Android')) return 'Android Chrome';
            if (userAgent.includes('iPhone') || userAgent.includes('iPad')) return 'iOS Chrome';
            if (userAgent.includes('Mac')) return 'Mac Chrome';
            if (userAgent.includes('Windows')) return 'Windows Chrome';
            return 'Chrome Browser';
        }
        if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
            if (userAgent.includes('iPhone') || userAgent.includes('iPad')) return 'iOS Safari';
            if (userAgent.includes('Mac')) return 'Mac Safari';
            return 'Safari Browser';
        }
        if (userAgent.includes('Firefox')) {
            if (userAgent.includes('Android')) return 'Android Firefox';
            if (userAgent.includes('Windows')) return 'Windows Firefox';
            if (userAgent.includes('Mac')) return 'Mac Firefox';
            return 'Firefox Browser';
        }
        if (userAgent.includes('Edg')) {
            if (userAgent.includes('Windows')) return 'Windows Edge';
            if (userAgent.includes('Mac')) return 'Mac Edge';
            return 'Edge Browser';
        }
        return 'Unknown Device';
    };

    const isActiveDevice = (deviceId: string) => {
        return state.activeDeviceId === deviceId;
    };

    const isCurrentDevice = (deviceId: string) => {
        return deviceId === socket.id;
    };

    return (
        <Container>
            <h3>Available Devices</h3>
            {connectors.length === 0 ? (
                <div className="empty-state">
                    No devices connected
                </div>
            ) : (
                <div className="device-list">
                    {connectors.map((connector) => (
                        <div
                            key={connector.id}
                            className={`device-item ${isActiveDevice(connector.id) ? 'active' : ''}`}
                            onClick={() => handleDeviceClick(connector.id)}>
                            <div className="device-icon">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                            <div className="device-info">
                                <div className="device-name">
                                    {getDeviceName(connector.userAgent)}
                                    {isCurrentDevice(connector.id) && ' (This Device)'}
                                </div>
                                <div className="device-status">
                                    {isActiveDevice(connector.id)
                                        ? 'Currently Playing'
                                        : 'Available'}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </Container>
    );
}
