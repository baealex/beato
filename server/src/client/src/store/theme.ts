import Store from 'badland';

interface ThemeState {
    colorTone: string;
    playerAlbumArtStyle: string;
}

class ThemeStore extends Store<ThemeState> {
    constructor() {
        super();
        this.state = {
            colorTone: '',
            playerAlbumArtStyle: localStorage.getItem('theme:playerAlbumArtStyle') || ''
        };
        this.setColorTone(localStorage.getItem('theme:colorTone') || '');
    }

    setColorTone(colorTone: string) {
        this.set({ colorTone });
        document.body.className = colorTone;
        localStorage.setItem('theme:colorTone', colorTone);
    }

    setPlayerAlbumArtStyle(playerAlbumArtStyle: string) {
        this.set({ playerAlbumArtStyle });
        localStorage.setItem('theme:playerAlbumArtStyle', playerAlbumArtStyle);
    }
}

export const themeStore = new ThemeStore();
