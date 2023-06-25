<script lang="ts">
    import { onMount } from "svelte";

    import type { Album, Music } from "../models/type";
    import { graphQLRequest } from "../api";
    import Play from "../icons/Play.svelte";

    export let id = "";
    let album: Album = null;
    export let onClickMusic: (music: Music) => void;

    onMount(async () => {
        if (!id) {
            return;
        }

        const { data } = await graphQLRequest<"album", Album>(`
            query {
                album(id: "${id}") {
                    id
                    name
                    cover
                    musics {
                        id
                        name
                        filePath
                        duration
                        artist {
                            name
                        }
                        album {
                            name
                            cover
                        }
                    }
                }
            }
        `);

        album = data.album;
    });
</script>

{#if album}
    <div class="album">
        <img class="album-cover" src={album.cover} alt="" loading="lazy" />
        <div class="album-title">
            {album.name}
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
{#if album?.musics}
    <ul>
        {#each album.musics as music}
            <li
                on:keydown={(e) => {
                    if (e.key === "Enter") {
                        onClickMusic(music);
                    }
                }}
                on:click={() => onClickMusic(music)}
            >
                <div class="info">
                    <div class="title">
                        {music.name}
                    </div>
                    <div class="artist">
                        {music.artist.name}
                    </div>
                </div>
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
        padding: 1rem;
        background-color: rgba(255, 255, 255, 0.069);
        border-radius: 0.5rem;

        .album-cover {
            width: 100%;
            max-width: 300px;
            border-radius: 0.5rem;
        }

        .album-title {
            font-size: 1.5rem;
            font-weight: bold;
        }

        .play-all {
            position: absolute;
            bottom: 0;
            right: 1rem;
            transform: translateY(50%);

            button {
                border-radius: 100%;
                padding: 1rem;
                background-color: #474787;
                border: none;
                cursor: pointer;
                color: #fff;
                transition: background-color 0.2s;

                &:hover {
                    background-color: #515199;
                }
            }
        }
    }

    ul {
        margin: 0;
        padding: 0;
        list-style: none;

        li {
            cursor: pointer;
            padding: 1rem;
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 0.5rem;

            &:hover {
                background-color: rgba(255, 255, 255, 0.1);
            }
        }
    }
</style>
