import Store from 'badland';

interface ThemeState {
    theme: string;
}

class ThemeStore extends Store<ThemeState> {
    constructor() {
        super();
        this.state = { theme: '' };
        this.setTheme(localStorage.getItem('theme') || '');
    }

    setTheme(theme: string) {
        this.set({ theme });
        document.body.className = theme;
        localStorage.setItem('theme', theme);
    }
}

export const themeStore = new ThemeStore();
