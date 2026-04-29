import { BaseStore } from './base-store';

interface ThemeState {
    playerAlbumArtStyle: string;
}

class ThemeStore extends BaseStore<ThemeState> {
    constructor() {
        super();
        this.state = { playerAlbumArtStyle: localStorage.getItem('theme:playerAlbumArtStyle') || '' };
    }

    setPlayerAlbumArtStyle(playerAlbumArtStyle: string) {
        this.set({ playerAlbumArtStyle });
        localStorage.setItem('theme:playerAlbumArtStyle', playerAlbumArtStyle);
    }
}

export const themeStore = new ThemeStore();
