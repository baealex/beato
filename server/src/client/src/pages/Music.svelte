<script lang="ts">
    import Image from "../components/Image.svelte";
    import Shuffle from "../icons/Shuffle.svelte";
    import Play from "../icons/Play.svelte";

    import type { Music } from "../models/type";

    import { musics } from "../store/musics";

    export let onClickMusic: (music: Music) => void;
    export let onClickPlayAll: () => void;
    export let onClickPlayShuffle: () => void;

    let search = "";

    $: visibleMusics = $musics.filter(
        (music) =>
            music.name.toLowerCase().includes(search.toLowerCase()) ||
            music.artist.name.toLowerCase().includes(search.toLowerCase())
    );
</script>

<div class="controls">
    <div>
        <input
            class="search"
            type="text"
            placeholder="검색"
            bind:value={search}
        />
    </div>
    <div class="buttons">
        <button on:click={onClickPlayAll}>
            <Play />
            전체 재생
        </button>
        <button on:click={onClickPlayShuffle}>
            <Shuffle />
            랜덤 재생
        </button>
    </div>
</div>
<ul>
    {#each visibleMusics as music}
        <li
            on:keydown={(e) => {
                if (e.key === "Enter") {
                    onClickMusic(music);
                }
            }}
            on:click={() => onClickMusic(music)}
        >
            <Image
                class="album-art"
                alt={music.album.name}
                src={music.album.cover}
            />
            <div class="info">
                <div class="title">
                    {music.name}
                    {#if music.codec.toLowerCase() === "flac"}
                        <span class="codec">
                            {music.codec}
                        </span>
                    {/if}
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
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 0.5rem;
    }

    .search {
        padding: 0.5rem;
        border: none;
        background-color: #222;
        border-radius: 0.5rem;
        color: #eee;
        font-size: 0.8rem;
        font-weight: 600;
        width: 10rem;

        &:focus {
            outline: none;
        }
    }

    .buttons {
        display: flex;
        flex-direction: row;
        align-items: center;
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

            .title {
                display: flex;
                align-items: center;
                gap: 0.5rem;

                .codec {
                    border: 1px solid #333;
                    color: #eee;
                    padding: 0.1rem 0.5rem;
                    border-radius: 0.5rem;
                    font-size: 0.6rem;
                    font-weight: 400;
                }
            }

            &:hover {
                background-color: rgba(255, 255, 255, 0.1);
            }
        }
    }
</style>
