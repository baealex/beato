<script lang="ts">
    import { onMount } from "svelte";

    import MusicListItem from "../components/MusicListItem.svelte";
    import Play from "../icons/Play.svelte";

    import type { Playlist } from "../models/type";

    import { getPlaylist } from "../api";

    import {
        resetQueue,
        insertToQueue,
        musicActionPanel,
        musics,
    } from "../store";

    export let id = "";

    let playlist: Playlist = null;

    onMount(async () => {
        if (!id) {
            return;
        }

        const { data } = await getPlaylist(id);
        playlist = data.playlist;

        musics.subscribe((value) => {
            playlist.musics = playlist.musics.map((music) => {
                music.isLiked = value.find((m) => m.id === music.id)?.isLiked;
                return music;
            });
        });
    });
</script>

{#if playlist}
    <div class="playlist">
        <div class="playlist-title">
            {playlist.name}
        </div>
        <div class="play-all">
            <button
                on:click={() => {
                    resetQueue(playlist.name, playlist.musics);
                }}
            >
                <Play />
            </button>
        </div>
    </div>
{/if}

{#if playlist?.musics}
    <ul>
        {#each playlist.musics as music}
            <li>
                <MusicListItem
                    albumCover={music.album.cover}
                    artistName={music.artist.name}
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
{/if}

<style lang="scss">
    .playlist {
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

        .playlist-title {
            font-size: 1.25rem;
            font-weight: bold;
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
