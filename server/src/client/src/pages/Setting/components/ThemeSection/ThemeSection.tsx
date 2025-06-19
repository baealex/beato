import { useStore } from 'badland-react';

import { Select } from '~/components/shared';
import { themeStore } from '~/store/theme';

const THEMES = [
    {
        value: '',
        label: 'Beato'
    },
    {
        value: 'rosy',
        label: 'Rosy'
    },
    {
        value: 'breeze',
        label: 'Breeze'
    }
];

const PLAYER_ALBUM_ART_STYLES = [
    {
        value: '',
        label: 'Puffy Effect'
    },
    {
        value: 'disk',
        label: 'CD Player'
    }
];

export const ThemeSection = () => {
    const [{ colorTone, playerAlbumArtStyle }] = useStore(themeStore);

    return (
        <section>
            <h3>Theme</h3>
            <p>Color Tone</p>
            <Select
                selected={THEMES.find(({ value }) => value === colorTone)}
                options={THEMES}
                onChange={(value) => themeStore.setColorTone(value)}
            />
            <p>Player album art</p>
            <Select
                selected={PLAYER_ALBUM_ART_STYLES.find(({ value }) => value === playerAlbumArtStyle)}
                options={PLAYER_ALBUM_ART_STYLES}
                onChange={(value) => themeStore.setPlayerAlbumArtStyle(value)}
            />
        </section>
    );
};
