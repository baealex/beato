import Store from 'badland';

interface ThemeState {
    playerAlbumArtStyle: string;
}

class ThemeStore extends Store<ThemeState> {
    constructor() {
        super();
        this.state = {
            playerAlbumArtStyle: localStorage.getItem('theme:playerAlbumArtStyle') || ''
        };
    }

    setPlayerAlbumArtStyle(playerAlbumArtStyle: string) {
        this.set({ playerAlbumArtStyle });
        localStorage.setItem('theme:playerAlbumArtStyle', playerAlbumArtStyle);
    }
}

export const themeStore = new ThemeStore();
