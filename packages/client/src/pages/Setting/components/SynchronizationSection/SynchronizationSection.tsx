import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { Badge, Button, SettingSection, SettingItem, Text } from '~/components/shared';
import { getLatestSyncReport } from '~/api';
import { queryKeys } from '~/api/query-keys';
import { toast } from '~/modules/toast';
import { socket } from '~/socket';
import type { SyncReport } from '~/models/type';


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

const formatTimestamp = (value: string | null) => {
    if (!value) {
        return 'Unavailable';
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return 'Unavailable';
    }

    return date.toLocaleString();
};

const syncStatusTone = (status: SyncReport['status']) => {
    return status === 'success' ? 'success' : 'danger';
};

export const SynchronizationSection = ({ onSyncMusic }: SynchronizationSectionProps) => {
    const [progressMessage, setProgressMessage] = useState('');
    const [isSyncing, setIsSyncing] = useState(false);
    const queryClient = useQueryClient();
    const { data: latestSyncReport } = useQuery({
        queryKey: queryKeys.syncReports.latest(),
        queryFn: () => getLatestSyncReport().then((response) => response.data.latestSyncReport)
    });

    useEffect(() => {
        const handleSyncMusic = (serverMessage: string | 'done' | 'error') => {
            if (serverMessage === 'done' || serverMessage === 'error') {
                if (serverMessage === 'done') {
                    toast.success('Completed sync music');
                } else if (serverMessage === 'error') {
                    toast.error('Error while sync music');
                }

                setIsSyncing(false);
                queryClient.invalidateQueries({
                    queryKey: queryKeys.syncReports.listAll(),
                    exact: false
                });
                setTimeout(() => {
                    setProgressMessage('');
                }, 1000);
            } else {
                setIsSyncing(true);
            }
            setProgressMessage(serverMessage);
        };

        socket.on('sync-music', handleSyncMusic);

        return () => {
            socket.off('sync-music', handleSyncMusic);
        };
    }, [queryClient]);

    const handleSync = async (force: boolean) => {
        setIsSyncing(true);
        await onSyncMusic(force);
    };

    return (
        <SettingSection
            title="Synchronization"
            icon={<SyncIcon />}
            description="Update the local library from the server.">
            <SettingItem
                title="Sync Music from Server"
                description="Run a normal sync, or force one when needed."
                divider={!latestSyncReport}>
                <div>
                    {progressMessage && (
                        <div className={'ow-synchronization-section-progressContainer'}>
                            <div className={'ow-synchronization-section-progressBar'}>
                                <div
                                    className={`${'ow-synchronization-section-progressIndicator'} ${isSyncing ? 'ow-synchronization-section-animating' : ''}`}
                                />
                            </div>
                            <Text as="p" size="sm" variant="secondary" className={'ow-synchronization-section-progressMessage'}>
                                {progressMessage}
                            </Text>
                        </div>
                    )}

                    <div className={'ow-synchronization-section-buttonContainer'}>
                        <Button disabled={isSyncing} onClick={() => handleSync(false)}>
                            Sync
                        </Button>
                        <Button disabled={isSyncing} onClick={() => handleSync(true)}>
                            Force Sync
                        </Button>
                    </div>
                </div>
            </SettingItem>

            {latestSyncReport && (
                <div className={'ow-synchronization-section-reportRow'}>
                    <div className={'ow-synchronization-section-reportCopy'}>
                        <Text as="span" size="sm" weight="semibold">
                            Latest sync
                        </Text>
                        <Text as="span" size="xs" variant="muted">
                            {latestSyncReport.scannedFiles} scanned · {latestSyncReport.indexedFiles} indexed · {latestSyncReport.completedAt ? `Completed ${formatTimestamp(latestSyncReport.completedAt)}` : 'Completion unavailable'}
                        </Text>
                    </div>
                    <Badge tone={syncStatusTone(latestSyncReport.status)}>
                        {latestSyncReport.status}
                    </Badge>
                </div>
            )}
        </SettingSection>
    );
};
