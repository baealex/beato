import { toast } from '@baejino/ui'
import { useStore } from 'badland-react'

import { PanelContent, PlaylistItem } from '~/components'

import { panel } from '~/modules/panel'

import { PlaylistListener } from '~/socket'

import { playlistStore } from '~/store/playlist'

interface PlaylistPanelContentProps {
    musicId: string
}

export default function PlaylistPanelContent({
    musicId,
}: PlaylistPanelContentProps) {
    const [{ playlists }] = useStore(playlistStore)

    return (
        <PanelContent
            footer={(
                <>
                    {playlists.map(playlist => (
                        <PlaylistItem
                            key={playlist.id}
                            {...playlist}
                            onClick={() => {
                                PlaylistListener.addMusic(playlist.id, musicId)
                                toast('Added to playlist')
                                panel.close()
                            }}
                        />
                    ))}
                </>
            )}
        />
    )
}