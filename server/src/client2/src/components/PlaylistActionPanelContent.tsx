import { prompt } from '@baejino/ui'
import { useStore } from 'badland-react'

import { Image, PanelContent } from '~/components'
import * as Icon from '~/icon'

import { panel } from '~/modules/panel'

import { PlaylistListener } from '~/socket'

import { musicStore } from '~/store/music'
import { playlistStore } from '~/store/playlist'

interface PlaylistActionPanelContentProps {
    id: string
    onPlaylistClick?: () => void
}

export default function PlaylistActionPanelContent({
    id,
    onPlaylistClick,
}: PlaylistActionPanelContentProps) {
    const [{ musicMap }] = useStore(musicStore)
    const [{ playlists }] = useStore(playlistStore)

    const playlist = playlists.find(playlist => playlist.id === id)

    if (!playlist) {
        return null
    }

    return (
        <PanelContent
            header={(
                <button className="panel-album clickable linkable" onClick={() => {
                    onPlaylistClick?.()
                    panel.close()
                }}>
                    {playlist.headerMusics.length >= 4 && (
                        <div className="album-cover-grid">
                            {playlist.headerMusics.slice(0, 4).map(({ id }) => (
                                <Image
                                    key={id}
                                    src={musicMap.get(id)?.album.cover || ''}
                                    alt={musicMap.get(id)?.album.name}
                                />
                            ))}
                        </div>
                    )}
                    {playlist.headerMusics.length < 4 && playlist.headerMusics.length !== 0 && (
                        <div className="album-cover">
                            <Image
                                src={musicMap.get(playlist.headerMusics[0].id)?.album.cover || ''}
                                alt={musicMap.get(playlist.headerMusics[0].id)?.album.name}
                            />
                        </div>
                    )}
                    {playlist.headerMusics.length === 0 && (
                        <div className="album-cover">
                            <Image src="" alt="" />
                        </div>
                    )}
                    <div>
                        <div className="panel-sub-title">
                            {playlist.musicCount} songs
                        </div>
                        <div className="panel-sub-content">
                            {playlist.name}
                        </div>
                    </div>
                </button>
            )}
            items={[
                {
                    icon: <Icon.Pencil />,
                    text: 'Rename',
                    onClick: async () => {
                        const name = await prompt('Rename playlist', playlist.name)
                        PlaylistListener.update(id, name)
                        panel.close()
                    },
                },
                {
                    icon: <Icon.TrashBin />,
                    text: 'Delete',
                    onClick: () => {
                        PlaylistListener.delete(id)
                        panel.close()
                    },
                },
            ]}
        />
    )
}