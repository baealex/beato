<script lang="ts">
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";

    import type { Music } from "../models/type";
    import { musics } from "../store/musics";
    import { graphQLRequest } from "../api";

    export let onClickMusic: (music: Music) => void;

    onMount(async () => {
        const { data } = await graphQLRequest<"allMusics", Music[]>(`
            query {
                allMusics {
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
        `);

        musics.set(data.allMusics);
    });
</script>

<ul>
    {#each $musics as music}
        <li
            on:keydown={(e) => {
                if (e.key === "Enter") {
                    onClickMusic(music);
                }
            }}
            on:click={() => onClickMusic(music)}
        >
            <img
                class="album-art"
                src={music.album.cover}
                alt=""
                loading="lazy"
            />
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

<style lang="scss">
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
