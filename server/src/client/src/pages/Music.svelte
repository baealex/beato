<script lang="ts">
    import { onMount } from "svelte";
    import { get } from "svelte/store";

    import Shuffle from "../icons/Shuffle.svelte";
    import Play from "../icons/Play.svelte";

    import type { Music } from "../models/type";
    import { getImage } from "../modules/image";

    import { graphQLRequest } from "../api";

    import { musics } from "../store/musics";

    export let onClickMusic: (music: Music) => void;
    export let onClickPlayAll: () => void;
    export let onClickPlayShuffle: () => void;

    onMount(async () => {
        const { data } = await graphQLRequest<"allMusics", Music[]>(`
            query {
                allMusics {
                    id
                    name
                    filePath
                    duration
                    playCount
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

<div class="controls">
    <button on:click={onClickPlayAll}>
        <Play />
        전체 재생
    </button>
    <button on:click={onClickPlayShuffle}>
        <Shuffle />
        랜덤 재생
    </button>
</div>
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
                src={getImage(music.album.cover)}
                alt=""
                loading="lazy"
            />
            <div class="info">
                <div class="title">
                    {music.name}
                </div>
                <div class="artist">
                    <div>
                        {music.artist.name}
                    </div>
                    <div>
                        {Math.floor(music.duration / 60)}분 /
                        {music.playCount}회 재생
                    </div>
                </div>
            </div>
        </li>
    {/each}
</ul>

<style lang="scss">
    .controls {
        padding: 1rem;
        display: flex;
        justify-content: flex-end;
        gap: 0.5rem;
    }

    button {
        padding: 0.5rem;
        border: none;
        background-color: #222;
        border-radius: 0.5rem;
        color: #eee;
        font-size: 0.8rem;
        font-weight: 600;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;

        :global(svg) {
            width: 1rem;
            height: 1rem;
        }

        &:hover {
            background-color: rgba(255, 255, 255, 0.1);
        }
    }

    ul {
        margin: 0;
        padding: 0;
        width: 100%;
        list-style: none;

        li {
            cursor: pointer;
            padding: 1rem;
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 0.5rem;
            width: 100%;

            .artist {
                display: flex;
                align-items: center;
                justify-content: space-between;
                flex-wrap: wrap;
            }

            &:hover {
                background-color: rgba(255, 255, 255, 0.1);
            }
        }
    }
</style>
