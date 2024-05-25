import { useStore } from 'badland-react'

import { PanelContent } from '~/components/shared'

import PlaylistItem from './PlaylistItem'

import { panel } from '~/modules/panel'

import { playlistStore } from '~/store/playlist'

interface PlaylistPanelContentProps {
    onClick: (id: string) => void
}

export default function PlaylistPanelContent({
    onClick,
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
                                onClick(playlist.id)
                                panel.close()
                            }}
                        />
                    ))}
                </>
            )}
        />
    )
}
