import { useState } from 'react';

import { Toggle, SettingSection, SettingItem, InfoBox } from '~/components/shared';
import { themeStore } from '~/store/theme';

const ShieldIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
);

export const StabilityModeSection = () => {
    const [isStabilityModeEnabled] = useState(Boolean(localStorage.getItem('stability-mode::on')));

    const handleChangeStabilityMode = () => {
        if (isStabilityModeEnabled) {
            localStorage.removeItem('stability-mode::on');
            themeStore.setPlayerAlbumArtStyle('');
        } else {
            localStorage.setItem('stability-mode::on', 'true');
        }
        window.location.reload();
    };

    return (
        <SettingSection
            title="Stability Mode"
            icon={<ShieldIcon />}
            description="Improve app stability by disabling certain features.">
            <SettingItem
                title="Enable Stability Mode"
                description="Activate this to stop using the audio context feature.">
                <Toggle value={isStabilityModeEnabled} onChange={handleChangeStabilityMode} />
            </SettingItem>

            <InfoBox type="warning">
                <p>With Stability Mode enabled, the equalizer and visualizer will not be available.</p>
            </InfoBox>
        </SettingSection>
    );
};
