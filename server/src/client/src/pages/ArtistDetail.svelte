<script lang="ts">
    import { onMount } from "svelte";

    import AlbumDetail from "./AlbumDetail.svelte";
    import Image from "../components/Image.svelte";
    import SubPage from "../components/SubPage.svelte";
    import MusicListItem from "../components/MusicListItem.svelte";
    import AlbumListItem from "../components/AlbumListItem.svelte";
    import Play from "../icons/Play.svelte";

    import type { Artist } from "../models/type";

    import { confirm } from "../modules/ui/modal";

    import { getArtist } from "../api";

    import {
        existQueue,
        insertToQueue,
        musicActionPanel,
        musics,
        resetQueue,
    } from "../store";

    export let id = "";

    let artist: Artist = null;
    let selectedAlbumId: string | null = null;
    let isOpenAlbumDetail = false;

    onMount(async () => {
        if (!id) {
            return;
        }

        const { data } = await getArtist(id);
        artist = data.artist;

        musics.subscribe((value) => {
            artist.musics = artist.musics.map((music) => {
                music.isLiked = value.find((m) => m.id === music.id)?.isLiked;
                return music;
            });
        });
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
                    on:click={async () => {
                        if (
                            existQueue() &&
                            !(await confirm(
                                "The queue will be replaced with this."
                            ))
                        ) {
                            return;
                        }
                        resetQueue(
                            `Play songs by ${artist.name}`,
                            artist.musics
                        );
                    }}
                >
                    <Play />
                    Play
                </button>
            </div>
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
                            onClick={() => insertToQueue(music)}
                            onLongPress={() => {
                                musicActionPanel.update(() => ({
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

        .play-all {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.75rem;
        }
    }
</style>
