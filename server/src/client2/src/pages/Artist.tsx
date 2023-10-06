import { useQuery } from 'react-query'

import { getArtists } from '~/api'

export default function Artist() {
    const { data: artists } = useQuery('artists', async () => {
        return (await getArtists()).data.allArtists
    });

    return (
        <>
            {artists?.map((artist) => (
                <div>{artist.name}</div>
            ))}
        </>
    )
}
