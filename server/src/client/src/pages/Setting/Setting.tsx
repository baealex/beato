import { useState } from 'react';

import { useModal } from '~/components/app/ModalProvider';
import Text from '~/components/shared/Text';
import { appCopy } from '~/config/copy';
import { appShell } from '~/config/app-shell';
import { socket } from '~/socket';

import {
    AudioSettingsSection,
    ConnectorsSection,
    PlayModeSection,
    StabilityModeSection,
    SynchronizationSection,
    ThemeSection,
    TroubleshootingSection
} from './components';

import styles from './Setting.module.scss';

export default function Setting() {
    const { confirm } = useModal();
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
                <Text as="h1" size="xl" weight="bold">
                    {appCopy.settings.title}
                </Text>
            </div>

            <div className={styles.settingsContent}>
                <SynchronizationSection onSyncMusic={handleClickSyncMusic} />
                <PlayModeSection />
                <AudioSettingsSection shouldStable={isAppChannel || isStabilityModeEnabled} />
                <ThemeSection shouldStable={isAppChannel || isStabilityModeEnabled} />
                <ConnectorsSection />
                {!isAppChannel && <StabilityModeSection />}
                <TroubleshootingSection />
            </div>

            <p className={styles.poweredBy}>
                Powered by {appShell.brand.name}
            </p>
        </div>
    );
}
