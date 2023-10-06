import { useQuery } from 'react-query'

import { getPlaylists } from '~/api'

export default function Playlist() {
    const { data: playlists } = useQuery('playlists', async () => {
        return (await getPlaylists()).data.allPlaylist
    })

    return (
        <>
            {playlists?.map((playlist) => (
                <div>{playlist.name}</div>
            ))}
        </>
    )
}
