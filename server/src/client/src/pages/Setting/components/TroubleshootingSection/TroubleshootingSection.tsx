import { Button, SettingSection, SettingItem } from '~/components/shared';

import styles from './TroubleshootingSection.module.scss';

const AlertIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
);

export const TroubleshootingSection = () => {
    return (
        <SettingSection
            title="Troubleshooting"
            icon={<AlertIcon />}
            description="Having issues with the application? Try these solutions.">
            <SettingItem
                title="Refresh Application"
                description="Reload the application to resolve common issues.">
                <div className={styles.buttonContainer}>
                    <Button onClick={() => window.location.reload()}>
                        Refresh App
                    </Button>
                </div>
            </SettingItem>
            <SettingItem
                title="Give Feedback"
                description="Give feedback to help us improve the application.">
                <div className={styles.buttonContainer}>
                    <Button onClick={() => window.open('https://feedback.baejino.com/s/nfhsuyckehiwfgbpuzesy6dp', '_blank')}>
                        Give Feedback
                    </Button>
                </div>
            </SettingItem>
        </SettingSection>
    );
};
