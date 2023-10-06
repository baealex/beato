import { useQuery } from 'react-query'

import { ArtistItem } from '~/components'

import { getArtists } from '~/api'

export default function ArtistDetail() {
    const { data: artists } = useQuery('artists', async () => {
        return (await getArtists()).data.allArtists
    })

    return (
        <>
            {artists?.map((artist) => (
                <ArtistItem
                    key={artist.id}
                    artistName={artist.name}
                    artistCover={artist.latestAlbum?.cover || ''}
                    musicCount={artist.musicCount}
                    albumCount={artist.albumCount}
                    onClick={() => { }}
                />
            ))}
        </>
    )
}
