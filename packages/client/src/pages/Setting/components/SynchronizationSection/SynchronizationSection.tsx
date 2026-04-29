import { useEffect, useMemo, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { Badge, Button, SettingSection, SettingItem, Tag, Text } from '~/components/shared';
import { getLatestSyncReport } from '~/api';
import { queryKeys } from '~/api/query-keys';
import { toast } from '~/modules/toast';
import { socket } from '~/socket';
import type { SyncReport, SyncReportItem } from '~/models/type';

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

const formatTimestamp = (value: string | null) => {
    if (!value) {
        return 'Unavailable';
    }

    return new Date(value).toLocaleString();
};

const buildDetailLabel = (item: SyncReportItem) => {
    if (item.kind === 'moved' && item.previousFilePath) {
        return `${item.previousFilePath} -> ${item.filePath}`;
    }

    return item.filePath;
};

const syncStatusTone = (status: SyncReport['status']) => {
    return status === 'success' ? 'success' : 'danger';
};

const reportSections = (report: SyncReport | null) => {
    if (!report) {
        return [];
    }

    return [
        {
            key: 'created',
            title: 'Created',
            count: report.createdCount,
            items: report.created
        },
        {
            key: 'moved',
            title: 'Moved',
            count: report.movedCount,
            items: report.moved
        },
        {
            key: 'duplicate',
            title: 'Duplicate',
            count: report.duplicateCount,
            items: report.duplicate
        },
        {
            key: 'missing',
            title: 'Missing',
            count: report.missingCount,
            items: report.missing
        }
    ];
};

export const SynchronizationSection = ({ onSyncMusic }: SynchronizationSectionProps) => {
    const [progressMessage, setProgressMessage] = useState('');
    const [isSyncing, setIsSyncing] = useState(false);
    const queryClient = useQueryClient();
    const { data: latestSyncReport } = useQuery({
        queryKey: queryKeys.syncReports.latest(),
        queryFn: () => getLatestSyncReport().then((response) => response.data.latestSyncReport)
    });
    const sections = useMemo(() => reportSections(latestSyncReport ?? null), [latestSyncReport]);

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
                        <div className={styles.progressContainer}>
                            <div className={styles.progressBar}>
                                <div
                                    className={`${styles.progressIndicator} ${isSyncing ? styles.animating : ''}`}
                                />
                            </div>
                            <Text as="p" size="sm" variant="secondary" className={styles.progressMessage}>
                                {progressMessage}
                            </Text>
                        </div>
                    )}

                    <div className={styles.buttonContainer}>
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
                <div className={styles.reportCard}>
                    <div className={styles.reportHeader}>
                        <div>
                            <Text as="h5" size="sm" weight="semibold">
                                Latest Sync Report
                            </Text>
                            <Text as="p" variant="muted" size="xs">
                                Started {formatTimestamp(latestSyncReport.startedAt)}
                            </Text>
                        </div>
                        <Badge tone={syncStatusTone(latestSyncReport.status)}>
                            {latestSyncReport.status}
                        </Badge>
                    </div>

                    <div className={styles.summaryGrid}>
                        {([
                            {
                                label: 'Scanned',
                                value: latestSyncReport.scannedFiles
                            },
                            {
                                label: 'Indexed',
                                value: latestSyncReport.indexedFiles
                            },
                            {
                                label: 'Created',
                                value: latestSyncReport.createdCount
                            },
                            {
                                label: 'Moved',
                                value: latestSyncReport.movedCount
                            },
                            {
                                label: 'Duplicate',
                                value: latestSyncReport.duplicateCount
                            },
                            {
                                label: 'Missing',
                                value: latestSyncReport.missingCount
                            }
                        ] as const).map(({ label, value }) => (
                            <div key={label} className={styles.summaryItem}>
                                <Text as="span" size="xs" variant="muted">{label}</Text>
                                <Text as="strong" size="sm" weight="semibold">{value}</Text>
                            </div>
                        ))}
                    </div>

                    <div className={styles.reportMeta}>
                        <Text as="p" variant="muted" size="xs">
                            Completed {formatTimestamp(latestSyncReport.completedAt)}
                        </Text>
                        <Text as="p" variant="muted" size="xs">
                            {latestSyncReport.force ? 'Force sync' : 'Normal sync'}
                        </Text>
                    </div>

                    <div className={styles.reportDetails}>
                        {sections.map((section) => (
                            <details key={section.key} className={styles.detailGroup}>
                                <summary>
                                    <Text as="span" size="sm" weight="semibold">{section.title}</Text>
                                    <Tag
                                        tone={section.count > 0 ? 'accent' : 'neutral'}
                                        selected={section.count > 0}>
                                        {section.count}
                                    </Tag>
                                </summary>
                                {section.items.length === 0 ? (
                                    <Text as="p" size="sm" variant="muted" className={styles.emptyDetail}>
                                        No items in this group.
                                    </Text>
                                ) : (
                                    <ul className={styles.detailList}>
                                        {section.items.map((item) => (
                                            <li key={item.id} className={styles.detailItem}>
                                                <Text as="p" size="sm" weight="semibold">
                                                    {item.musicName}
                                                </Text>
                                                <Text as="p" size="xs" variant="muted">
                                                    {buildDetailLabel(item)}
                                                </Text>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </details>
                        ))}
                    </div>
                </div>
            )}
        </SettingSection>
    );
};
