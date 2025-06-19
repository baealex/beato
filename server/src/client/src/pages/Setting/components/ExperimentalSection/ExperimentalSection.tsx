import { useStore } from 'badland-react';
import { useNavigate } from 'react-router';

import { Button, Select } from '~/components/shared';
import { queueStore } from '~/store/queue';
import { themeStore } from '~/store/theme';

const MIX_MODES = [
    {
        value: 'none',
        label: 'None'
    },
    {
        value: 'mix',
        label: 'Mix (Fade in/out when music changes)'
    }
];

const PLAYER_VISUALIZER_TYPE = [
    {
        value: 'visualizer',
        label: 'Round'
    },
    {
        value: 'visualizer:line',
        label: 'Line'
    },
    {
        value: 'visualizer:ring',
        label: 'Ring'
    },
    {
        value: 'visualizer:digital',
        label: 'Digital'
    }
];

export interface ExperimentalSectionProps {
    isAppChannel: boolean;
    isStabilityModeEnabled: boolean;
}

export const ExperimentalSection = ({ isAppChannel, isStabilityModeEnabled }: ExperimentalSectionProps) => {
    const navigate = useNavigate();
    const [{ mixMode }] = useStore(queueStore);
    const [{ playerAlbumArtStyle }] = useStore(themeStore);

    return (
        <section>
            <h3>Experimental</h3>
            <p>Use experimental features. These features may not work properly. Use at your own risk. These features may be removed without notice.</p>
            {!isAppChannel && (
                <>
                    <p>Sound Effect</p>
                    <Select
                        selected={MIX_MODES.find(({ value }) => value === mixMode)}
                        options={MIX_MODES}
                        onChange={(value) => queueStore.setMixMode(value as typeof mixMode)}
                    />
                </>
            )}
            {(!isAppChannel && !isStabilityModeEnabled) && (
                <>
                    <p>Visualizer</p>
                    <Select
                        selected={PLAYER_VISUALIZER_TYPE.find(({ value }) => value === playerAlbumArtStyle)}
                        options={PLAYER_VISUALIZER_TYPE}
                        onChange={(value) => themeStore.setPlayerAlbumArtStyle(value)}
                    />
                </>
            )}
            {(!isAppChannel && !isStabilityModeEnabled) && (
                <>
                    <p>Equalizer</p>
                    <div>
                        <Button onClick={() => navigate('/equalizer')}>Move to page</Button>
                    </div>
                </>
            )}
        </section>
    );
};
