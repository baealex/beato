import { confirm, toast } from '@baejino/ui'
import styled from '@emotion/styled'
import { useStore } from 'badland-react'
import { useEffect, useState } from 'react'

import { SecondaryButton } from '~/components'

import { socket } from '~/socket'

import { albumStore } from '~/store/album'
import { artistStore } from '~/store/artist'
import { musicStore } from '~/store/music'
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
`

export default function Setting() {
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

                musicStore.init = false
                artistStore.init = false
                albumStore.init = false

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
                    <label>
                        <input
                            type="radio"
                            name="play-mode"
                            value="immediately"
                            defaultChecked={playMode === 'immediately'}
                            onChange={() => queueStore.setPlayMode('immediately')} />
                        Play immediately
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="play-mode"
                            value="later"
                            defaultChecked={playMode === 'later'}
                            onChange={() => queueStore.setPlayMode('later')} />
                        Play later
                    </label>
                </div>
                <div className="input-section">
                    <label>
                        <input
                            type="radio"
                            name="insert-mode"
                            value="first"
                            defaultChecked={insertMode === 'first'}
                            onChange={() => queueStore.setInsertMode('first')} />
                        Add to the top of the queue
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="insert-mode"
                            value="last"
                            defaultChecked={insertMode === 'last'}
                            onChange={() => queueStore.setInsertMode('last')} />
                        Add to the bottom of the queue
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="insert-mode"
                            value="after"
                            defaultChecked={insertMode === 'after'}
                            onChange={() => queueStore.setInsertMode('after')} />
                        Add to the next of the current music
                    </label>
                </div>
            </section>
            <section>
                <h3>Connectors</h3>
            </section>
            <section>
                <h3>Have a problem?</h3>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <SecondaryButton onClick={() => window.location.reload()}>
                        Try Refresh
                    </SecondaryButton>
                </div>
            </section>
        </Container>
    )
}
