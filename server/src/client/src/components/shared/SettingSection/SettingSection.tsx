import { ReactNode } from 'react';
import styles from './SettingSection.module.scss';

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
          <h4>{title}</h4>
          {description && <p className={styles.description}>{description}</p>}
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
        <h3>
          {icon && <span className={styles.sectionIcon}>{icon}</span>}
          {title}
        </h3>
        {description && <p className={styles.sectionDescription}>{description}</p>}
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
      {children}
    </div>
  );
};
