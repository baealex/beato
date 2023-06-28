<script lang="ts">
    import { onMount } from "svelte";

    import AlbumDetail from "./AlbumDetail.svelte";
    import Image from "../components/Image.svelte";
    import SubPage from "../components/SubPage.svelte";
    import MusicListItem from "../components/MusicListItem.svelte";
    import AlbumListItem from "../components/AlbumListItem.svelte";

    import type { Artist, Music } from "../models/type";

    import { getArtist } from "../api";

    import { musicDetailPanel } from "../store";

    export let id = "";
    export let onClickMusic: (music: Music) => void = () => {};

    let artist: Artist = null;
    let selectedId: string | null = null;
    let isOpenDetail = false;

    onMount(async () => {
        if (!id) {
            return;
        }

        const { data } = await getArtist(id);
        artist = data.artist;
    });
</script>

<section>
    {#if artist}
        <div class="artist-name">
            <Image src={artist.latestAlbum?.cover || ""} alt={artist.name} />
            {artist.name}
        </div>

        <div class="section-title">
            Albums ({artist.albums.length})
        </div>
        <div class="albums">
            <ul>
                {#each artist.albums as album}
                    <li>
                        <AlbumListItem
                            albumCover={album.cover}
                            albumName={album.name}
                            artistName={album.publishedYear}
                            onClick={() => {
                                selectedId = album.id;
                                isOpenDetail = true;
                            }}
                        />
                    </li>
                {/each}
            </ul>
        </div>

        <div class="section-title">
            Songs ({artist.musics.length})
        </div>
        <div class="musics">
            <ul>
                {#each artist.musics as music}
                    <li>
                        <MusicListItem
                            artistName={music.album.name}
                            albumCover={music.album.cover}
                            albumName={music.album.name}
                            musicName={music.name}
                            musicCodec={music.codec}
                            isLiked={music.isLiked}
                            onClick={() => onClickMusic(music)}
                            onLongPress={() => {
                                musicDetailPanel.update(() => ({
                                    isOpen: true,
                                    music,
                                }));
                            }}
                        />
                    </li>
                {/each}
            </ul>
        </div>
    {/if}
</section>

<SubPage
    isOpen={isOpenDetail}
    onClose={() => {
        selectedId = null;
        isOpenDetail = false;
    }}
>
    {#if selectedId}
        <AlbumDetail id={String(selectedId)} {onClickMusic} />
    {/if}
</SubPage>

<style lang="scss">
    section {
        .artist-name {
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: 1.25rem;
            font-weight: bold;
            margin: 3rem 0;

            :global(img) {
                width: 150px;
                height: 150px;
                object-fit: cover;
                border-radius: 50%;
                margin-bottom: 1rem;
            }
        }

        .section-title {
            padding: 1rem;
            font-size: 1.25rem;
            font-weight: bold;
            border-bottom: 1px solid #222;
        }

        .albums {
            padding: 0 1rem 1rem 1rem;
            margin-bottom: 3rem;

            ul {
                display: grid;
                grid-gap: 1rem;
                grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
                padding: 0;
                list-style: none;

                @media (max-width: 600px) {
                    grid-template-columns: repeat(2, minmax(0, 1fr));
                }
            }
        }

        .musics {
            ul {
                margin: 0;
                padding: 0;
                list-style: none;
            }
        }
    }
</style>
