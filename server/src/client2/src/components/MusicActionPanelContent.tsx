import { useStore } from 'badland-react'

import { Image, PanelContent, PlaylistPanelContent } from '~/components'
import * as Icon from '~/icon'

import { panel } from '~/modules/panel'
import { MusicListener } from '~/socket'

import { musicStore } from '~/store/music'
import { queueStore } from '~/store/queue'

interface MusicActionPanelContentProps {
    id: string
    onArtistClick?: () => void
    onAlbumClick?: () => void
}

export default function MusicActionPanelContent({
    id,
    onArtistClick,
    onAlbumClick,
}: MusicActionPanelContentProps) {
    const [{ musicMap }] = useStore(musicStore)

    const music = musicMap.get(id)

    if (!music) {
        return null
    }

    return (
        <PanelContent
            header={(
                <>
                    {onAlbumClick && (
                        <button className="panel-album clickable linkable" onClick={() => {
                            onAlbumClick()
                            panel.close()
                        }}>
                            <Image
                                className="cover"
                                src={music.album.cover}
                                alt={music.album.name}
                            />
                            <div>
                                <div className="panel-sub-title">Album</div>
                                <div className="panel-sub-content">
                                    {music.album.name}
                                </div>
                            </div>
                        </button>
                    )}
                    {onArtistClick && (
                        <button className="panel-artist clickable linkable" onClick={() => {
                            onArtistClick?.()
                            panel.close()
                        }}>
                            <div>
                                <div className="panel-sub-title">Artist</div>
                                <div className="panel-sub-content">
                                    {music.artist.name}
                                </div>
                            </div>
                        </button>
                    )}
                </>
            )}
            items={[
                {
                    icon: <Icon.Heart />,
                    text: 'Like',
                    isActive: music.isLiked,
                    onClick: () => MusicListener.like(music.id, !music.isLiked),
                },
                {
                    icon: <Icon.Play />,
                    text: 'Add to Queue',
                    onClick: () => queueStore.add(music.id),
                },
                {
                    icon: <Icon.Data />,
                    text: 'Add to Playlist',
                    onClick: () => {
                        panel.close()
                        panel.open({
                            title: 'Add to Playlist',
                            content: (
                                <PlaylistPanelContent musicId={music.id} />
                            )
                        })
                    }
                },
                {
                    icon: <Icon.Download />,
                    text: 'Download',
                    onClick: () => queueStore.add(music.id),
                },
            ]}
        />
    )
}