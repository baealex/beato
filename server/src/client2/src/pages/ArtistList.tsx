import { useStore } from 'badland-react'
import { useNavigate } from 'react-router-dom'

import { ArtistItem } from '~/components'

import { artistStore } from '~/store/artist'

export default function ArtistList() {
    const navigate = useNavigate()

    const [{ artists }] = useStore(artistStore)

    return (
        <>
            {artists?.map((artist) => (
                <ArtistItem
                    key={artist.id}
                    artistName={artist.name}
                    artistCover={artist.latestAlbum?.cover || ''}
                    musicCount={artist.musicCount}
                    albumCount={artist.albumCount}
                    onClick={() => navigate(`/artist/${artist.id}`)}
                />
            ))}
        </>
    )
}
