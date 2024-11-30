import { confirm, toast } from '@baejino/ui';
import styled from '@emotion/styled';
import { useStore } from 'badland-react';
import { useEffect, useState } from 'react';

import { Button, Select } from '~/components/shared';

import { ConnectorListener, socket } from '~/socket';

import { connectorStore } from '~/store/connector';
import { eqStore } from '~/store/audioEq';
import { queueStore } from '~/store/queue';
import { themeStore } from '~/store/theme';

const Container = styled.div`
    padding: 1rem;

    section {
        display: flex;
        flex-direction: column;
        border-bottom: 1px solid var(--b-color-border);
        padding: 2.5rem 0;
        gap: 1rem;

        h3 {
            font-size: 1rem;
            font-weight: 600;
        }

        p {
            font-size: 0.8rem;
            font-weight: 400;
            opacity: 0.5;
        }
    }

    .connector {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        font-size: 0.825rem;
        gap: 0.5rem;

        .date {
            font-size: 0.825rem;
            opacity: 0.5;
        }

        .this-device, .kick {
            padding: 0.125rem 0.5rem;
            border-radius: 0.5rem;
            background-color: var(--b-color-primary-button);
            font-size: 0.75rem;
        }

        .kick {
            cursor: pointer;
            color: var(--b-color-text);
            background-color: var(--b-color-secondary-button);
        }
    }

    .slider {
        display: flex;
        align-items: center;
        gap: 16px;

        label {
            width: 140px;
        }
    }
`;

const PLAY_MODES = [{
    value: 'immediately',
    label: 'Play immediately'
}, {
    value: 'later',
    label: 'Play later'
}];

const INSERT_MODES = [{
    value: 'first',
    label: 'Add to the top of the queue'
}, {
    value: 'last',
    label: 'Add to the bottom of the queue'
}, {
    value: 'after',
    label: 'Add to the next of the current music'
}];

const MIX_MODES = [{
    value: 'none',
    label: 'None'
}, {
    value: 'mix',
    label: 'Mix (Fade in/out when music changes)'
}];

const PLAYER_ALBUM_ART_STYLES = [{
    value: '',
    label: 'Puffy Effect'
}, {
    value: 'disk',
    label: 'CD Player'
}];

const PLAYER_VISUALIZER_TYPE = [{
    value: 'visualizer',
    label: 'Round'
}, {
    value: 'visualizer:line',
    label: 'Line'
}, {
    value: 'visualizer:ring',
    label: 'Ring'
}, {
    value: 'visualizer:digital',
    label: 'Digital'
}];

const THEMES = [{
    value: '',
    label: 'Beato'
}, {
    value: 'rosy',
    label: 'Rosy'
}, {
    value: 'breeze',
    label: 'Breeze'
}];

export default function Setting() {
    const [{ connectors }] = useStore(connectorStore);
    const [{ playMode, insertMode, mixMode }] = useStore(queueStore);
    const [{ colorTone, playerAlbumArtStyle }] = useStore(themeStore);
    const [eqState, setEqState] = useStore(eqStore);

    const [progressMessage, setProgressMessage] = useState('');

    const handleClickSyncMusic = async (force: boolean) => {
        if (
            force &&
            !(await confirm(
                'Please only proceed with the update if it is recommended by the developer. Are you sure you want to proceed?'
            ))
        ) {
            return;
        }
        socket.emit('sync-music', { force });
    };

    useEffect(() => {
        socket.on('sync-music', (serverMessage: string | 'done' | 'error') => {
            if (serverMessage === 'done' || serverMessage === 'error') {
                if (serverMessage === 'done') {
                    toast('Completed sync music');
                } else if (serverMessage === 'error') {
                    toast('Error while sync music');
                }

                setTimeout(() => {
                    setProgressMessage('');
                }, 1000);
            }
            setProgressMessage(serverMessage);
        });

        return () => {
            socket.off('sync-music');
        };
    }, []);

    return (
        <Container>
            <section>
                <h3>Synchronization</h3>
                <p>Sync from your server</p>
                {progressMessage && (
                    <p>{progressMessage}</p>
                )}
                <div
                    style={{
                        display: 'flex',
                        gap: '1rem'
                    }}>
                    <Button onClick={() => handleClickSyncMusic(false)}>
                        Sync
                    </Button>
                    <Button onClick={() => handleClickSyncMusic(true)}>
                        Force Sync
                    </Button>
                </div>
            </section>
            <section>
                <h3>Play Mode</h3>
                <p>When you add a music to the queue, It will...</p>
                <Select
                    selected={PLAY_MODES.find(({ value }) => value === playMode)}
                    options={PLAY_MODES}
                    onChange={(value) => queueStore.setPlayMode(value as typeof playMode)}
                />
                <Select
                    selected={INSERT_MODES.find(({ value }) => value === insertMode)}
                    options={INSERT_MODES}
                    onChange={(value) => queueStore.setInsertMode(value as typeof insertMode)}
                />
            </section>
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
            <section>
                <h3>Connectors</h3>
                {connectors.map((connector) => (
                    <div key={connector.id} className="connector">
                        <span>{connector.userAgent}</span>
                        <span className="date">{new Date(connector.connectedAt).toLocaleDateString()}</span>
                        {connector.id === socket.id ? (
                            <span className="this-device">This device</span>
                        ) : (
                            <button
                                className="kick"
                                onClick={() => ConnectorListener.remove(connector.id)}>
                                Remove
                            </button>
                        )}
                    </div>
                ))}
            </section>
            <section>
                <h3>Experimental</h3>
                <p>Use experimental features. These features may not work properly. Use at your own risk. These features may be removed without notice.</p>
                <p>Sound Effect (Web only)</p>
                <Select
                    selected={MIX_MODES.find(({ value }) => value === mixMode)}
                    options={MIX_MODES}
                    onChange={(value) => queueStore.setMixMode(value as typeof mixMode)}
                />
                <p>Visualizer (Web only)</p>
                <Select
                    selected={PLAYER_VISUALIZER_TYPE.find(({ value }) => value === playerAlbumArtStyle)}
                    options={PLAYER_VISUALIZER_TYPE}
                    onChange={(value) => themeStore.setPlayerAlbumArtStyle(value)}
                />
                <p>Equalizer (Web only)</p>
                <div className="slider">
                    <label htmlFor="bass">Bass (60Hz):</label>
                    <input
                        type="range"
                        name="bass"
                        min="-10"
                        max="10"
                        value={eqState.bass}
                        onChange={(e) => setEqState((state) => ({
                            ...state,
                            [e.target.name]: Number(e.target.value)
                        }))}
                    />
                </div>
                <div className="slider">
                    <label htmlFor="lowMid">Low Mid (250Hz):</label>
                    <input
                        type="range"
                        name="lowMid"
                        min="-10"
                        max="10"
                        value={eqState.lowMid}
                        onChange={(e) => setEqState((state) => ({
                            ...state,
                            [e.target.name]: Number(e.target.value)
                        }))}
                    />
                </div>
                <div className="slider">
                    <label htmlFor="mid">Mid (1kHz):</label>
                    <input
                        type="range"
                        name="mid"
                        min="-10"
                        max="10"
                        value={eqState.mid}
                        onChange={(e) => setEqState((state) => ({
                            ...state,
                            [e.target.name]: Number(e.target.value)
                        }))}
                    />
                </div>
                <div className="slider">
                    <label htmlFor="highMid">High Mid (4kHz):</label>
                    <input
                        type="range"
                        name="highMid"
                        min="-10"
                        max="10"
                        value={eqState.highMid}
                        onChange={(e) => setEqState((state) => ({
                            ...state,
                            [e.target.name]: Number(e.target.value)
                        }))}
                    />
                </div>
                <div className="slider">
                    <label htmlFor="treble">Treble (12kHz):</label>
                    <input
                        type="range"
                        name="treble"
                        min="-10"
                        max="10"
                        value={eqState.treble}
                        onChange={(e) => setEqState((state) => ({
                            ...state,
                            [e.target.name]: Number(e.target.value)
                        }))}
                    />
                </div>
            </section>
            <section>
                <h3>Have a problem?</h3>
                <div
                    style={{
                        display: 'flex',
                        gap: '1rem'
                    }}>
                    <Button onClick={() => window.location.reload()}>
                        Try Refresh
                    </Button>
                </div>
            </section>
        </Container >
    );
}
