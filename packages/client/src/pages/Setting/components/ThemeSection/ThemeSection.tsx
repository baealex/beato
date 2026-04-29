import { useAppStore as useStore } from '~/store/base-store';

import { Select, SettingSection, SettingItem } from '~/components/shared';
import { themeStore } from '~/store/theme';

const PLAYER_ALBUM_ART_STYLES = [
    {
        value: '',
        label: 'Puffy Effect'
    },
    {
        value: 'disk',
        label: 'CD Player'
    },
    {
        value: 'visualizer',
        label: 'Visualizer (Round)'
    },
    {
        value: 'visualizer:line',
        label: 'Visualizer (Line)'
    },
    {
        value: 'visualizer:ring',
        label: 'Visualizer (Ring)'
    },
    {
        value: 'visualizer:digital',
        label: 'Visualizer (Digital)'
    },
    {
        value: 'visualizer:dna',
        label: 'Visualizer (DNA)'
    },
    {
        value: 'visualizer:neon',
        label: 'Visualizer (Neon)'
    }
];

const ThemeIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round">
        <circle cx="12" cy="12" r="5" />
        <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
    </svg>
);

interface ThemeSectionProps {
    shouldStable: boolean;
}

export const ThemeSection = ({ shouldStable }: ThemeSectionProps) => {
    const [{ playerAlbumArtStyle }] = useStore(themeStore);

    return (
        <SettingSection
            title="Theme"
            icon={<ThemeIcon />}
            description="Choose how the player presents artwork.">
            <SettingItem
                title="Player Cover"
                description="Select the artwork style.">
                <Select
                    selected={PLAYER_ALBUM_ART_STYLES.find(({ value }) => value === playerAlbumArtStyle)}
                    options={PLAYER_ALBUM_ART_STYLES.filter(({ value }) => shouldStable ? !value.startsWith('visualizer') : true)}
                    onChange={(value) => themeStore.setPlayerAlbumArtStyle(value)}
                />
            </SettingItem>
        </SettingSection>
    );
};
