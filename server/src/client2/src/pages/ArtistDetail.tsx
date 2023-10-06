import { useQuery } from 'react-query'

import { getArtists } from '~/api'

import { ArtistItem } from '~/components'

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
                    albumCount={artist.albumCount}
                    musicCount={artist.musicCount}
                    onClick={() => { }}
                />
            ))}
        </>
    )
}
