import { useStore } from 'badland-react';
import { useNavigate } from 'react-router';

import {
    Select, Toggle, Button, SettingSection, SettingItem, InfoBox
} from '~/components/shared';
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

const AudioIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </svg>
);

interface AudioSettingsSectionProps {
    shouldStable: boolean;
}

export const AudioSettingsSection = ({ shouldStable }: AudioSettingsSectionProps) => {
    const navigate = useNavigate();
    const [{ format, bitrate, useOriginal }] = useStore(audioSettingsStore);

    return (
        <SettingSection
            title="Audio Settings"
            icon={<AudioIcon />}
            description="Configure audio quality and format settings for music playback.">
            <SettingItem
                title="Use Original Audio Files"
                description="When enabled, plays the original audio files without any transcoding. This provides the highest quality but may use more bandwidth.">
                <Toggle
                    value={useOriginal}
                    onChange={() => audioSettingsStore.setUseOriginal(!useOriginal)}
                />
            </SettingItem>

            {!useOriginal && (
                <>
                    <SettingItem
                        title="Audio Format"
                        description="Choose the audio format for streaming. MP3 is more compatible, while AAC may offer better quality at the same bitrate.">
                        <Select
                            selected={AUDIO_FORMATS.find(({ value }) => value === format)}
                            options={AUDIO_FORMATS}
                            onChange={(value) => audioSettingsStore.setFormat(value as 'mp3' | 'aac')}
                        />
                    </SettingItem>

                    <SettingItem
                        title="Audio Quality"
                        description="Higher quality uses more data. Choose a lower bitrate to save data or a higher bitrate for better sound quality.">
                        <Select
                            selected={AUDIO_BITRATES.find(({ value }) => value === bitrate)}
                            options={AUDIO_BITRATES}
                            onChange={(value) => audioSettingsStore.setBitrate(value as '64k' | '96k' | '128k' | '192k' | '256k' | '320k')}
                        />
                    </SettingItem>

                    <InfoBox>
                        <p>Higher quality settings will use more bandwidth and storage space. If you experience playback issues, try using a lower quality setting.</p>
                    </InfoBox>
                </>
            )}

            {!shouldStable && (
                <SettingItem
                    title="Equalizer"
                    description="Fine-tune your audio experience with the equalizer.">
                    <Button onClick={() => navigate('/equalizer')}>Open Equalizer</Button>
                </SettingItem>
            )}
        </SettingSection>
    );
};
