import { useModal } from '~/components/app/ModalProvider';
import Text from '~/components/shared/Text';
import { appCopy } from '~/config/copy';
import { appShell } from '~/config/app-shell';
import { socket } from '~/socket';

import {
    AudioSettingsSection,
    ConnectorsSection,
    PlayModeSection,
    SynchronizationSection,
    TroubleshootingSection
} from './components';


export default function Setting() {
    const { confirm } = useModal();

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
        <div className="mx-auto min-h-full w-full max-w-[860px] px-4 py-6 text-[var(--b-color-text)] sm:px-6 sm:py-10 lg:px-10 lg:py-12">
            <div className="mb-8 lg:mb-12 after:mt-2 after:block after:max-w-[30rem] after:text-sm after:leading-relaxed after:text-[var(--b-color-text-tertiary)] after:content-['Tune_how_Ocean_Wave_behaves.']">
                <Text as="h1" size="xl" weight="bold" className="text-[clamp(2rem,5vw,3.25rem)] leading-[0.98] tracking-[-0.055em]">
                    {appCopy.settings.title}
                </Text>
            </div>

            <div className="flex flex-col gap-8 lg:gap-12">
                <SynchronizationSection onSyncMusic={handleClickSyncMusic} />
                <PlayModeSection />
                <AudioSettingsSection />
                <ConnectorsSection />
                <TroubleshootingSection />
            </div>

            <div className="mt-12 flex min-h-8 items-center justify-center gap-2 pb-[max(48px,calc(48px+env(safe-area-inset-bottom)))] text-center text-xs text-[var(--b-color-text-muted)]">
                <img
                    src="/ocean-wave.svg"
                    alt=""
                    aria-hidden="true"
                    className="h-[1.125rem] w-[1.125rem] rounded-md opacity-70"
                />
                <span>Powered by {appShell.brand.name}</span>
            </div>
        </div>
    );
}
