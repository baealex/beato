import { useQuery } from 'react-query'

import { getAlbums } from '~/api'

export default function Album() {
    const { data: albums } = useQuery('albums', async () => {
        return (await getAlbums()).data.allAlbums
    });

    return (
        <>
            {albums?.map((album) => (
                <div>{album.name}</div>
            ))}
        </>
    )
}
