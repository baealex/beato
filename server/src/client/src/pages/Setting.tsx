import { confirm, toast } from '@baejino/ui'
import styled from '@emotion/styled'
import { useStore } from 'badland-react'
import { useEffect, useState } from 'react'

import { SecondaryButton } from '~/components'

import { ConnectorListener, socket } from '~/socket'

import { connectorStore } from '~/store/connector'
import { queueStore } from '~/store/queue'

const Container = styled.div`
    padding: 1rem;

    section {
        display: flex;
        flex-direction: column;
        border-bottom: 1px solid #222;
        padding: 2.5rem 0;
        gap: 1rem;

        h3 {
            font-size: 1rem;
            font-weight: 600;
            color: #656565;
        }

        p {
            font-size: 0.8rem;
            font-weight: 400;
            color: #d0d0d0;
        }

        .progress-text {
            font-size: 0.8rem;
            font-weight: 400;
            color: #ffffff;
        }
    }

    .input-section {
        display: flex;
        gap: 1rem;
        margin-top: 0.5rem;
        flex-wrap: wrap;
        padding: 1rem;
        border: 1px solid #333;
        border-radius: 0.5rem;

        label {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.8rem;
            font-weight: 400;
            color: #d0d0d0;

            input {
                margin: 0;
            }
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
            color: #999;
        }

        .this-device, .kick {
            padding: 0.125rem 0.5rem;
            border-radius: 0.5rem;
            background-color: #3d3493;
            font-size: 0.75rem;
            color: #eee;
        }

        .kick {
            cursor: pointer;
            background-color: #333;
        }
    }
`

const PLAY_MODES = [{
    value: 'immediately',
    label: 'Play immediately'
}, {
    value: 'later',
    label: 'Play later'
}] as const

const INSERT_MODES = [{
    value: 'first',
    label: 'Add to the top of the queue'
}, {
    value: 'last',
    label: 'Add to the bottom of the queue'
}, {
    value: 'after',
    label: 'Add to the next of the current music'
}] as const

export default function Setting() {
    const [{ connectors }] = useStore(connectorStore)
    const [{ playMode, insertMode }] = useStore(queueStore)
    const [progressMessage, setProgressMessage] = useState('')

    const handleClickSyncMusic = async (force: boolean) => {
        if (
            force &&
            !(await confirm(
                'Please only proceed with the update if it is recommended by the developer. Are you sure you want to proceed?'
            ))
        ) {
            return
        }
        socket.emit('sync-music', { force })
    }

    useEffect(() => {
        socket.on('sync-music', (serverMessage: string | 'done' | 'error') => {
            if (serverMessage === 'done' || serverMessage === 'error') {
                if (serverMessage === 'done') {
                    toast('Completed sync music')
                } else if (serverMessage === 'error') {
                    toast('Error while sync music')
                }

                setTimeout(() => {
                    setProgressMessage('')
                }, 1000)
            }
            setProgressMessage(serverMessage)
        })

        return () => {
            socket.off('sync-music')
        }
    }, [])

    return (
        <Container>
            <section>
                <h3>Synchronization</h3>
                <p>Sync from your server</p>
                {progressMessage && (
                    <p className="progress-text">{progressMessage}</p>
                )}
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <SecondaryButton onClick={() => handleClickSyncMusic(false)}>
                        Sync
                    </SecondaryButton>
                    <SecondaryButton onClick={() => handleClickSyncMusic(true)}>
                        Force Sync
                    </SecondaryButton>
                </div>
            </section>
            <section>
                <h3>Play Mode</h3>
                <p>When you add a music to the queue, It will...</p>
                <div className="input-section">
                    {PLAY_MODES.map(({ value, label }) => (
                        <label key={value}>
                            <input
                                type="radio"
                                name="play-mode"
                                value={value}
                                defaultChecked={playMode === value}
                                onChange={() => queueStore.setPlayMode(value)} />
                            {label}
                        </label>
                    ))}
                </div>
                <div className="input-section">
                    {INSERT_MODES.map(({ value, label }) => (
                        <label key={value}>
                            <input
                                type="radio"
                                name="insert-mode"
                                value={value}
                                defaultChecked={insertMode === value}
                                onChange={() => queueStore.setInsertMode(value)} />
                            {label}
                        </label>
                    ))}
                </div>
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
                <h3>Have a problem?</h3>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <SecondaryButton onClick={() => window.location.reload()}>
                        Try Refresh
                    </SecondaryButton>
                </div>
            </section>
        </Container >
    )
}
