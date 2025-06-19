import { useStore } from 'badland-react';

import { Select, Toggle } from '~/components/shared';
import { audioSettingsStore } from '~/store/audio-settings';

const AUDIO_FORMATS = [
    {
        value: 'mp3',
        label: 'MP3 (Most Compatible)'
    },
    {
        value: 'aac',
        label: 'AAC (Better Quality)'
    }
];

const AUDIO_BITRATES = [
    {
        value: '64k',
        label: '64 kbps (Low Quality, Smallest Size)'
    },
    {
        value: '96k',
        label: '96 kbps (Medium Quality, Small Size)'
    },
    {
        value: '128k',
        label: '128 kbps (Standard Quality)'
    },
    {
        value: '192k',
        label: '192 kbps (High Quality)'
    },
    {
        value: '256k',
        label: '256 kbps (Very High Quality)'
    },
    {
        value: '320k',
        label: '320 kbps (Maximum Quality, Largest Size)'
    }
];

export const AudioSettingsSection = () => {
    const [{ format, bitrate, useOriginal }] = useStore(audioSettingsStore);

    return (
        <section>
            <h3>Audio Settings</h3>
            <p>Use Original Audio Files</p>
            <p>When enabled, plays the original audio files without any transcoding. This provides the highest quality but may use more bandwidth.</p>
            <Toggle
                value={useOriginal}
                onChange={() => audioSettingsStore.setUseOriginal(!useOriginal)}
            />

            {!useOriginal && (
                <>
                    <p>Audio Format</p>
                    <p>Choose the audio format for streaming. MP3 is more compatible, while AAC may offer better quality at the same bitrate.</p>
                    <Select
                        selected={AUDIO_FORMATS.find(({ value }) => value === format)}
                        options={AUDIO_FORMATS}
                        onChange={(value) => audioSettingsStore.setFormat(value as 'mp3' | 'aac')}
                    />
                    <p>Audio Quality</p>
                    <p>Higher quality uses more data. Choose a lower bitrate to save data or a higher bitrate for better sound quality.</p>
                    <Select
                        selected={AUDIO_BITRATES.find(({ value }) => value === bitrate)}
                        options={AUDIO_BITRATES}
                        onChange={(value) => audioSettingsStore.setBitrate(value as '64k' | '96k' | '128k' | '192k' | '256k' | '320k')}
                    />
                </>
            )}
        </section>
    );
};
