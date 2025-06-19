import { useState } from 'react';

import { Toggle } from '~/components/shared';
import { themeStore } from '~/store/theme';

export interface StabilityModeSectionProps {
    isAppChannel: boolean;
}

export const StabilityModeSection = ({ isAppChannel }: StabilityModeSectionProps) => {
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

    if (isAppChannel) {
        return null;
    }

    return (
        <section>
            <h3>Stability Mode</h3>
            <p>Activate this to stop using the audio context feature.</p>
            <p>Please note that with Stability Mode enabled, the equalizer and visualizer will not be available.</p>
            <Toggle value={isStabilityModeEnabled} onChange={handleChangeStabilityMode} />
        </section>
    );
};
