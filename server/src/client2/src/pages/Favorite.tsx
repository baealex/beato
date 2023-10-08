import { prompt } from '@baejino/ui'
import { useStore } from 'badland-react'
import { useSearchParams } from 'react-router-dom'

import { MusicItem, SecondaryButton, StickyHeader } from '~/components'
import { Play } from '~/icon'

import { musicStore } from '~/store/music'
import { queueStore } from '~/store/queue'

export default function Music() {
    const [{ musics }] = useStore(musicStore)

    const [searchParams, setSearchParams] = useSearchParams()

    const handleSearch = async () => {
        const q = await prompt('Search keyword', searchParams.get('q') || '')
        setSearchParams({ q })
    }

    const filteredMusics = musics
        ?.filter(music =>
            music.isLiked && (
                music.name.toLowerCase().includes(searchParams.get('q')?.toLowerCase() || '') ||
                music.artist.name.toLowerCase().includes(searchParams.get('q')?.toLowerCase() || '') ||
                music.album.name.toLowerCase().includes(searchParams.get('q')?.toLowerCase() || '')
            )
        )

    return (
        <>
            <StickyHeader>
                <SecondaryButton style={{ width: '160px' }} onClick={handleSearch}>
                    {searchParams.get('q') || 'Search'}
                </SecondaryButton>
                <SecondaryButton>
                    <Play /> Play
                </SecondaryButton>
            </StickyHeader>
            {filteredMusics.map((music) => (
                <MusicItem
                    key={music.id}
                    albumName={music.album.name}
                    albumCover={music.album.cover}
                    artistName={music.artist.name}
                    musicName={music.name}
                    musicCodec={music.codec}
                    isLiked={music.isLiked}
                    onClick={() => queueStore.add(music.id)}
                    onLongPress={() => { }}
                />
            ))}
        </>
    )
}
