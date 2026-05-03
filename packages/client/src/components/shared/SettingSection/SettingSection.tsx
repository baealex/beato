import type { ReactNode } from 'react';
import Text from '../Text';

interface SettingItemProps {
    title: string;
    description?: string;
    divider?: boolean;
    children: ReactNode;
}

export const SettingItem = ({
    title,
    description,
    divider = true,
    children
}: SettingItemProps) => {
    return (
        <div className={`${'ow-setting-section-settingItem'} ${divider ? '' : 'ow-setting-section-noDivider'}`}>
            <div className={'ow-setting-section-settingItemContent'}>
                <div className={'ow-setting-section-settingItemHeader'}>
                    <Text as="h4" size="md" weight="medium">
                        {title}
                    </Text>
                    {description && (
                        <Text as="p" variant="tertiary" size="sm" className={'ow-setting-section-description'}>
                            {description}
                        </Text>
                    )}
                </div>
                <div className={'ow-setting-section-settingItemControl'}>
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
        <section className={'ow-setting-section-settingSection'}>
            <div className={'ow-setting-section-sectionHeader'}>
                <Text as="h3" size="md" weight="semibold" className={'ow-setting-section-sectionTitle'}>
                    {icon && <span className={'ow-setting-section-sectionIcon'}>{icon}</span>}
                    <span>{title}</span>
                </Text>
                {description && (
                    <Text as="p" variant="secondary" size="sm" className={'ow-setting-section-sectionDescription'}>
                        {description}
                    </Text>
                )}
            </div>
            <div className={'ow-setting-section-sectionContent'}>
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
        <div className={`${'ow-setting-section-infoBox'} ${`ow-setting-section-${type}`}`}>
            <Text as="p" size="sm" variant="secondary">
                {children}
            </Text>
        </div>
    );
};
