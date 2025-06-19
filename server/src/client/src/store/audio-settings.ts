import Store from 'badland';

export interface AudioSettings {
    format: 'mp3' | 'aac';
    bitrate: '64k' | '96k' | '128k' | '192k' | '256k' | '320k';
    useOriginal: boolean;
}

class AudioSettingsStore extends Store<AudioSettings> {
    constructor() {
        super();

        let savedSettings: AudioSettings | null = null;
        try {
            const savedSettingsJson = localStorage.getItem('audio-settings');
            if (savedSettingsJson) {
                savedSettings = JSON.parse(savedSettingsJson);
            }
        } catch (e) {
            console.error('Failed to load audio settings from localStorage', e);
        }

        this.state = savedSettings || {
            format: 'mp3',
            bitrate: '128k',
            useOriginal: false
        };
    }

    private saveSettings() {
        try {
            localStorage.setItem('audio-settings', JSON.stringify(this.state));
        } catch (e) {
            console.error('Failed to save audio settings to localStorage', e);
        }
    }

    setFormat(format: AudioSettings['format']) {
        this.set({ format });
        this.saveSettings();
    }

    setBitrate(bitrate: AudioSettings['bitrate']) {
        this.set({ bitrate });
        this.saveSettings();
    }

    setUseOriginal(useOriginal: boolean) {
        this.set({ useOriginal });
        this.saveSettings();
    }
}

export const audioSettingsStore = new AudioSettingsStore();
