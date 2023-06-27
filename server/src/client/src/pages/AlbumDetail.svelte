<script lang="ts">
    import { onMount } from "svelte";

    import Image from "../components/Image.svelte";
    import Play from "../icons/Play.svelte";

    import type { Album, Music } from "../models/type";
    import { getAlbum } from "../api";

    export let id = "";
    let album: Album = null;
    export let onClickMusic: (music: Music) => void;

    onMount(async () => {
        if (!id) {
            return;
        }

        const { data } = await getAlbum(id);
        album = data.album;
    });
</script>

{#if album}
    <div class="album">
        <Image class="album-cover" src={album.cover} alt={album.name} />
        <div class="album-title">
            {album.name}
        </div>
        <div class="album-artist">
            {album.artist.name}
        </div>
        <div class="play-all">
            <button
                on:click={() => {
                    for (const music of album.musics) {
                        onClickMusic(music);
                    }
                }}
            >
                <Play />
            </button>
        </div>
    </div>
{/if}
<ul>
    {#if album?.musics}
        {#each album.musics as music}
            <li>
                <button class="clickable" on:click={() => onClickMusic(music)}>
                    <div class="info">
                        <div class="title">
                            {music.trackNumber}. {music.name}
                        </div>
                        <div class="artist">
                            {music.artist.name}
                        </div>
                    </div>
                </button>
            </li>
        {/each}
    {/if}
</ul>

<style lang="scss">
    .album {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        background-color: rgba(255, 255, 255, 0.069);
        border-radius: 0.5rem;

        :global(.album-cover) {
            width: 100%;
            max-width: 300px;
            border-radius: 0.5rem;
        }

        .album-title {
            font-size: 1.5rem;
            font-weight: bold;
        }

        .album-artist {
            font-size: 1rem;
            color: #aaa;
        }

        .play-all {
            position: absolute;
            bottom: 0;
            right: 1rem;
            transform: translateY(50%);

            button {
                border-radius: 100%;
                width: 3.5rem;
                height: 3.5rem;
                background-color: #474787;
                border: none;
                color: #fff;
                transition: background-color 0.2s;

                :global(svg) {
                    width: 1.5rem;
                    height: 1.5rem;
                }

                @media (hover: hover) {
                    &:hover {
                        background-color: #515199;
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

        li {
            button {
                color: #eee;
                font-size: 0.8rem;
                cursor: pointer;
                padding: 1rem;
                display: flex;
                flex-direction: row;
                align-items: center;
                gap: 0.5rem;

                @media (hover: hover) {
                    &:hover {
                        background-color: rgba(255, 255, 255, 0.1);
                    }
                }
            }
        }
    }
</style>
