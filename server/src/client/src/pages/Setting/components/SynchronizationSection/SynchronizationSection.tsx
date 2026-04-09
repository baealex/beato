import { useEffect, useMemo, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';

import { Button, SettingSection, SettingItem, Text } from '~/components/shared';
import { getLatestSyncReport } from '~/api';
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
    const { data: latestSyncReport } = useQuery(
        ['sync-report'],
        () => getLatestSyncReport().then((response) => response.data.latestSyncReport)
    );
    const sections = useMemo(() => reportSections(latestSyncReport ?? null), [latestSyncReport]);

    useEffect(() => {
        socket.on('sync-music', (serverMessage: string | 'done' | 'error') => {
            if (serverMessage === 'done' || serverMessage === 'error') {
                if (serverMessage === 'done') {
                    toast.success('Completed sync music');
                } else if (serverMessage === 'error') {
                    toast.error('Error while sync music');
                }

                setIsSyncing(false);
                queryClient.invalidateQueries(['sync-report']);
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
    }, [queryClient]);

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
                            disabled={isSyncing}
                            onClick={() => handleSync(false)}>
                            Sync
                        </Button>
                        <Button
                            disabled={isSyncing}
                            onClick={() => handleSync(true)}>
                            Force Sync
                        </Button>
                    </div>

                    {latestSyncReport && (
                        <div className={styles.reportCard}>
                            <div className={styles.reportHeader}>
                                <div>
                                    <Text as="h5" size="md" weight="semibold">
                                        Latest Sync Report
                                    </Text>
                                    <Text as="p" variant="tertiary" size="sm">
                                        Started {formatTimestamp(latestSyncReport.startedAt)}
                                    </Text>
                                </div>
                                <span className={`${styles.statusBadge} ${styles[latestSyncReport.status]}`}>
                                    {latestSyncReport.status}
                                </span>
                            </div>

                            <div className={styles.summaryGrid}>
                                <div className={styles.summaryItem}>
                                    <span className={styles.summaryLabel}>Scanned</span>
                                    <strong>{latestSyncReport.scannedFiles}</strong>
                                </div>
                                <div className={styles.summaryItem}>
                                    <span className={styles.summaryLabel}>Indexed</span>
                                    <strong>{latestSyncReport.indexedFiles}</strong>
                                </div>
                                <div className={styles.summaryItem}>
                                    <span className={styles.summaryLabel}>Created</span>
                                    <strong>{latestSyncReport.createdCount}</strong>
                                </div>
                                <div className={styles.summaryItem}>
                                    <span className={styles.summaryLabel}>Moved</span>
                                    <strong>{latestSyncReport.movedCount}</strong>
                                </div>
                                <div className={styles.summaryItem}>
                                    <span className={styles.summaryLabel}>Duplicate</span>
                                    <strong>{latestSyncReport.duplicateCount}</strong>
                                </div>
                                <div className={styles.summaryItem}>
                                    <span className={styles.summaryLabel}>Missing</span>
                                    <strong>{latestSyncReport.missingCount}</strong>
                                </div>
                            </div>

                            <div className={styles.reportMeta}>
                                <Text as="p" variant="tertiary" size="sm">
                                    Completed {formatTimestamp(latestSyncReport.completedAt)}
                                </Text>
                                <Text as="p" variant="tertiary" size="sm">
                                    Mode: {latestSyncReport.force ? 'Force sync' : 'Normal sync'}
                                </Text>
                            </div>

                            <div className={styles.reportDetails}>
                                {sections.map((section) => (
                                    <details key={section.key} className={styles.detailGroup}>
                                        <summary>
                                            <span>{section.title}</span>
                                            <span>{section.count}</span>
                                        </summary>
                                        {section.items.length === 0 ? (
                                            <p className={styles.emptyDetail}>No items in this group.</p>
                                        ) : (
                                            <ul className={styles.detailList}>
                                                {section.items.map((item) => (
                                                    <li key={item.id} className={styles.detailItem}>
                                                        <Text as="p" size="sm" weight="semibold">
                                                            {item.musicName}
                                                        </Text>
                                                        <Text as="p" variant="tertiary" size="sm">
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
                </div>
            </SettingItem>
        </SettingSection>
    );
};
