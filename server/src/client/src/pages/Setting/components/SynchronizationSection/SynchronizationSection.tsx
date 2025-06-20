import { toast } from '@baejino/ui';
import { useEffect, useState } from 'react';

import { Button, SettingSection, SettingItem } from '~/components/shared';
import { socket } from '~/socket';

import styles from './SynchronizationSection.module.scss';

export interface SynchronizationSectionProps {
    onSyncMusic: (force: boolean) => Promise<void>;
}

const SyncIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round">
        <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38" />
    </svg>
);

export const SynchronizationSection = ({ onSyncMusic }: SynchronizationSectionProps) => {
    const [progressMessage, setProgressMessage] = useState('');
    const [isSyncing, setIsSyncing] = useState(false);

    useEffect(() => {
        socket.on('sync-music', (serverMessage: string | 'done' | 'error') => {
            if (serverMessage === 'done' || serverMessage === 'error') {
                if (serverMessage === 'done') {
                    toast('Completed sync music');
                } else if (serverMessage === 'error') {
                    toast('Error while sync music');
                }

                setIsSyncing(false);
                setTimeout(() => {
                    setProgressMessage('');
                }, 1000);
            } else {
                setIsSyncing(true);
            }
            setProgressMessage(serverMessage);
        });

        return () => {
            socket.off('sync-music');
        };
    }, []);

    const handleSync = async (force: boolean) => {
        setIsSyncing(true);
        await onSyncMusic(force);
    };

    return (
        <SettingSection
            title="Synchronization"
            icon={<SyncIcon />}
            description="Keep your music library up to date with the server.">
            <SettingItem
                title="Sync Music from Server"
                description="Update your local music library with the latest content from the server">
                <div>
                    {progressMessage && (
                        <div className={styles.progressContainer}>
                            <div className={styles.progressBar}>
                                <div
                                    className={`${styles.progressIndicator} ${isSyncing ? styles.animating : ''}`}
                                />
                            </div>
                            <p className={styles.progressMessage}>{progressMessage}</p>
                        </div>
                    )}

                    <div className={styles.buttonContainer}>
                        <Button
                            onClick={() => handleSync(false)}
                            style={{
                                opacity: isSyncing ? 0.5 : 1,
                                pointerEvents: isSyncing ? 'none' : 'auto'
                            }}>
                            Sync
                        </Button>
                        <Button
                            onClick={() => handleSync(true)}
                            style={{
                                opacity: isSyncing ? 0.5 : 1,
                                pointerEvents: isSyncing ? 'none' : 'auto'
                            }}>
                            Force Sync
                        </Button>
                    </div>
                </div>
            </SettingItem>
        </SettingSection>
    );
};
