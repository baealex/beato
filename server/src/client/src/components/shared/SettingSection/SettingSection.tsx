import type { ReactNode } from 'react';
import styles from './SettingSection.module.scss';
import Text from '../Text';

interface SettingItemProps {
    title: string;
    description?: string;
    children: ReactNode;
}

export const SettingItem = ({ title, description, children }: SettingItemProps) => {
    return (
        <div className={styles.settingItem}>
            <div className={styles.settingItemContent}>
                <div className={styles.settingItemHeader}>
                    <Text as="h4" size="md" weight="medium">
                        {title}
                    </Text>
                    {description && (
                        <Text as="p" variant="tertiary" size="sm" className={styles.description}>
                            {description}
                        </Text>
                    )}
                </div>
                <div className={styles.settingItemControl}>
                    {children}
                </div>
            </div>
        </div>
    );
};

interface SettingSectionProps {
    title: string;
    description?: string;
    icon?: ReactNode;
    children: ReactNode;
}

export const SettingSection = ({ title, description, icon, children }: SettingSectionProps) => {
    return (
        <section className={styles.settingSection}>
            <div className={styles.sectionHeader}>
                <Text as="h3" size="md" weight="semibold" className={styles.sectionTitle}>
                    {icon && <span className={styles.sectionIcon}>{icon}</span>}
                    <span>{title}</span>
                </Text>
                {description && (
                    <Text as="p" variant="secondary" size="sm" className={styles.sectionDescription}>
                        {description}
                    </Text>
                )}
            </div>
            <div className={styles.sectionContent}>
                {children}
            </div>
        </section>
    );
};

interface InfoBoxProps {
    children: ReactNode;
    type?: 'info' | 'warning' | 'success';
}

export const InfoBox = ({ children, type = 'info' }: InfoBoxProps) => {
    return (
        <div className={`${styles.infoBox} ${styles[type]}`}>
            <Text as="p" size="sm" variant="secondary">
                {children}
            </Text>
        </div>
    );
};
