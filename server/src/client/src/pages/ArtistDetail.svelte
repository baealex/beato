<script lang="ts">
    import { derived } from "svelte/store";

    import AlbumDetail from "./AlbumDetail.svelte";

    import { Image, SubPage, MusicListItem, AlbumListItem } from "~/components";

    import { Play } from "~/icons";

    import type { Artist } from "../models/type";

    import { getArtist } from "../api";

    import {
        insertToQueue,
        musicActionPanel,
        musicMap,
        resetQueue,
    } from "../store";

    export let id = "";

    let artist: Artist = null;
    let selectedAlbumId: string | null = null;
    let isOpenAlbumDetail = false;

    $: if (id) {
        getArtist(id).then(({ data }) => {
            artist = data.artist;
        });
    }

    $: resolveMusics = derived(musicMap, ($musicMap) => {
        if (artist) {
            return artist.musics.map(({ id }) => $musicMap.get(id));
        }
        return [];
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
                                selectedAlbumId = album.id;
                                isOpenAlbumDetail = true;
                            }}
                        />
                    </li>
                {/each}
            </ul>
        </div>

        <div class="section-title">
            Songs ({artist.musics.length})
            <div class="play-all">
                <button
                    class="gray-button"
                    on:click={() =>
                        resetQueue(
                            `Play music by ${artist.name}`,
                            artist.musics
                        )}
                >
                    <Play />
                    Play
                </button>
            </div>
        </div>
        <div class="musics">
            <ul>
                {#each $resolveMusics as music}
                    <li>
                        <MusicListItem
                            artistName={music.album.name}
                            albumCover={music.album.cover}
                            albumName={music.album.name}
                            musicName={music.name}
                            musicCodec={music.codec}
                            isLiked={music.isLiked}
                            onClick={() => insertToQueue({ id: music.id })}
                            onLongPress={() => {
                                musicActionPanel.update((state) => ({
                                    ...state,
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
    isOpen={isOpenAlbumDetail}
    onClose={() => {
        selectedAlbumId = null;
        isOpenAlbumDetail = false;
    }}
>
    {#if selectedAlbumId}
        <AlbumDetail id={String(selectedAlbumId)} />
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
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .albums {
            padding: 1rem;
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

        .play-all {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.75rem;
        }
    }
</style>
