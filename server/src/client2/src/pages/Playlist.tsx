import { useQuery } from 'react-query'

import { PlaylistItem } from '~/components'

import { getPlaylists } from '~/api'
import { useNavigate } from 'react-router-dom'

export default function Playlist() {
    const navigate = useNavigate()

    const { data: playlists } = useQuery('playlists', async () => {
        return (await getPlaylists()).data.allPlaylist
    })

    return (
        <>
            {playlists?.map((playlist) => (
                <PlaylistItem {...playlist} onClick={() => navigate(`/playlist/${playlist.id}`)} />
            ))}
        </>
    )
}
