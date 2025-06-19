import { confirm } from '@baejino/ui';
import { useState, useRef, useEffect } from 'react';

import { socket } from '~/socket';

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

import styles from './Setting.module.scss';

// Icons for the navigation menu
const SyncIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38" />
    </svg>
);

const PlayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
);

const ShieldIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
);

const AudioIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </svg>
);

const ThemeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5" />
        <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
    </svg>
);

const DevicesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
);

const LabIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2v7.31M14 9.3V2M8.5 2h7M14 9.3a6.5 6.5 0 1 1-4 0" />
        <path d="M5.58 16.5h12.85" />
    </svg>
);

const HelpIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
);

export default function Setting() {
    const [isStabilityModeEnabled] = useState(Boolean(localStorage.getItem('stability-mode::on')));
    const [activeSection, setActiveSection] = useState('sync');
    const isAppChannel = Boolean(window.AppChannel);
    const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({
        sync: null,
        play: null,
        stability: null,
        audio: null,
        theme: null,
        connectors: null,
        experimental: null,
        troubleshooting: null
    });

    const navItems = [
        { id: 'sync', label: 'Synchronization', icon: <SyncIcon /> },
        { id: 'play', label: 'Play Mode', icon: <PlayIcon /> },
        ...(!isAppChannel ? [{ id: 'stability', label: 'Stability Mode', icon: <ShieldIcon /> }] : []),
        { id: 'audio', label: 'Audio Settings', icon: <AudioIcon /> },
        { id: 'theme', label: 'Theme', icon: <ThemeIcon /> },
        { id: 'connectors', label: 'Devices', icon: <DevicesIcon /> },
        { id: 'experimental', label: 'Experimental', icon: <LabIcon /> },
        { id: 'troubleshooting', label: 'Help', icon: <HelpIcon /> }
    ];

    const handleClickSyncMusic = async (force: boolean) => {
        if (
            force &&
            !(await confirm(
                'Please only proceed with the update if it is recommended by the developer. Are you sure you want to proceed?'
            ))
        ) {
            return;
        }
        socket.emit('sync-music', { force });
    };

    const scrollToSection = (sectionId: string) => {
        setActiveSection(sectionId);
        const sectionElement = sectionRefs.current[sectionId];
        if (sectionElement) {
            sectionElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const container = document.querySelector('.container');

        const handleScroll = () => {
            const sections = Object.entries(sectionRefs.current).map(([id, ref]) => ({
                id,
                top: Math.abs(ref?.getBoundingClientRect().top || 0)
            }));
            const minTop = Math.min(...sections.map(({ top }) => top));
            const activeSection = sections.find(({ top }) => top === minTop)?.id;
            if (activeSection) {
                setActiveSection(activeSection);
            }
        };

        container?.addEventListener('scroll', handleScroll);

        return () => {
            container?.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.settingsHeader}>
                <h1>Settings</h1>
                <p>Customize your Beato experience</p>
            </div>

            <div className={styles.settingsGrid}>
                <nav className={styles.settingsNav}>
                    <ul>
                        {navItems.map((item) => (
                            <li key={item.id}>
                                <button
                                    className={activeSection === item.id ? styles.active : ''}
                                    onClick={() => scrollToSection(item.id)}
                                >
                                    {item.icon}
                                    {item.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className={styles.settingsContent}>
                    <div
                        id="section-sync"
                        ref={(el) => (sectionRefs.current.sync = el)}
                        className={styles.settingSection}
                    >
                        <SynchronizationSection onSyncMusic={handleClickSyncMusic} />
                    </div>

                    <div
                        id="section-play"
                        ref={(el) => (sectionRefs.current.play = el)}
                        className={styles.settingSection}
                    >
                        <PlayModeSection />
                    </div>

                    {!isAppChannel && (
                        <div
                            id="section-stability"
                            ref={(el) => (sectionRefs.current.stability = el)}
                            className={styles.settingSection}
                        >
                            <StabilityModeSection isAppChannel={isAppChannel} />
                        </div>
                    )}

                    <div
                        id="section-audio"
                        ref={(el) => (sectionRefs.current.audio = el)}
                        className={styles.settingSection}
                    >
                        <AudioSettingsSection />
                    </div>

                    <div
                        id="section-theme"
                        ref={(el) => (sectionRefs.current.theme = el)}
                        className={styles.settingSection}
                    >
                        <ThemeSection />
                    </div>

                    <div
                        id="section-connectors"
                        ref={(el) => (sectionRefs.current.connectors = el)}
                        className={styles.settingSection}
                    >
                        <ConnectorsSection />
                    </div>

                    <div
                        id="section-experimental"
                        ref={(el) => (sectionRefs.current.experimental = el)}
                        className={styles.settingSection}
                    >
                        <ExperimentalSection
                            isAppChannel={isAppChannel}
                            isStabilityModeEnabled={isStabilityModeEnabled}
                        />
                    </div>

                    <div
                        id="section-troubleshooting"
                        ref={(el) => (sectionRefs.current.troubleshooting = el)}
                        className={styles.settingSection}
                    >
                        <TroubleshootingSection />
                    </div>
                </div>
            </div>
        </div>
    );
}
