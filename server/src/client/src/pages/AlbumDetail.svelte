<script lang="ts">
    import { onMount } from "svelte";

    import Image from "~/components/atom/Image.svelte";
    import MusicListItem from "~/components/MusicListItem.svelte";

    import { Play } from "~/icons";

    import type { Album } from "~/models/type";

    import { getAlbum } from "~/api";

    import {
        existQueue,
        resetQueue,
        insertToQueue,
        musicActionPanel,
        musics,
    } from "../store";

    export let id = "";

    let album: Album = null;

    onMount(async () => {
        musics.subscribe((value) => {
            if (album) {
                album.musics = album.musics.map((music) => {
                    music.isLiked = value.find(
                        (m) => m.id === music.id
                    )?.isLiked;
                    return music;
                });
            }
        });
    });

    $: if (id) {
        getAlbum(id).then(({ data }) => {
            album = data.album;
        });
    }
</script>

{#if album}
    <div class="album">
        <Image class="album-cover" src={album.cover} alt={album.name} />
        <div class="album-title">
            {album.name}
        </div>
        <div class="row">
            <div class="album-artist">
                {album.artist.name}
            </div>
            <span>-</span>
            <div class="album-year">
                {album.publishedYear}
            </div>
        </div>
        <div class="play-all">
            <button
                on:click={() =>
                    resetQueue(`Play album ${album.name}`, album.musics)}
            >
                <Play />
            </button>
        </div>
    </div>
{/if}

{#if album?.musics}
    <ul>
        {#each album.musics as music}
            <li>
                <MusicListItem
                    trackNumber={music.trackNumber}
                    artistName={music.artist.name}
                    musicName={music.name}
                    musicCodec={music.codec}
                    isLiked={music.isLiked}
                    onClick={() => insertToQueue(music)}
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
{/if}

<style lang="scss">
    .album {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        padding: 2rem 1rem;
        background-color: #111;
        border-radius: 0.5rem;

        :global(.album-cover) {
            width: 100%;
            max-width: 300px;
            border-radius: 0.5rem;
        }

        .album-title {
            font-size: 1.25rem;
            font-weight: bold;
        }

        .row {
            display: flex;
            align-items: center;
            gap: 0.5rem;

            & > span {
                font-size: 0.875rem;
                color: #aaa;
            }
        }

        .album-artist {
            font-size: 0.875rem;
            color: #aaa;
        }

        .album-year {
            font-size: 0.875rem;
            color: #aaa;
        }

        .play-all {
            position: absolute;
            bottom: 0;
            right: 0.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            transform: translateY(50%);

            button {
                border-radius: 100%;
                width: 4rem;
                height: 4rem;
                background-color: #1c1c1c;
                border: 4px solid #000;
                color: #ccc;
                transition: background-color 0.2s;

                :global(svg) {
                    width: 1.5rem;
                    height: 1.5rem;
                }

                @media (min-width: 1024px) {
                    &:hover {
                        background-color: #2a2a2a;
                    }
                }
            }
        }
    }

    ul {
        margin: 0;
        padding: 0;
        width: 100%;
        list-style: none;
        margin-top: 1.75rem;
    }
</style>
