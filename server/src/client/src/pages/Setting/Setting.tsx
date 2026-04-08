import { useState } from 'react';

import { socket } from '~/socket';
import { appCopy } from '~/config/copy';
import { confirm } from '~/modules/confirm';

import {
    AudioSettingsSection,
    ConnectorsSection,
    ExperimentalSection,
    PlayModeSection,
    StabilityModeSection,
    SynchronizationSection,
    ThemeSection,
    TroubleshootingSection
} from './components';
import Text from '~/components/shared/Text';
import { appShell } from '~/config/app-shell';

import styles from './Setting.module.scss';

export default function Setting() {
    const [isStabilityModeEnabled] = useState(Boolean(localStorage.getItem('stability-mode::on')));
    const isAppChannel = Boolean(window.AppChannel);

    const handleClickSyncMusic = async (force: boolean) => {
        if (
            force &&
            !(await confirm({
                title: 'Force sync music?',
                description: 'Please only proceed if this update is recommended by the developer.',
                confirmLabel: 'Force sync'
            }))
        ) {
            return;
        }
        socket.emit('sync-music', { force });
    };

    return (
        <div className={styles.container}>
            <div className={styles.settingsHeader}>
                <Text as="h1" size="2xl" weight="bold">
                    {appCopy.settings.title}
                </Text>
                <Text as="p" variant="secondary">
                    {appCopy.settings.description}
                </Text>
            </div>

            <div className={styles.settingsContent}>
                <SynchronizationSection onSyncMusic={handleClickSyncMusic} />
                <PlayModeSection />
                <AudioSettingsSection shouldStable={isAppChannel || isStabilityModeEnabled} />
                <ThemeSection shouldStable={isAppChannel || isStabilityModeEnabled} />
                <ConnectorsSection />
                {!isAppChannel && <StabilityModeSection />}
                <ExperimentalSection />
                <TroubleshootingSection />
            </div>

            <p className={styles.poweredBy}>
                Powered by {appShell.brand.name}
            </p>
        </div>
    );
}
