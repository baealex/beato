<script lang="ts">
    import { onDestroy, onMount } from "svelte";

    import MusicListItem from "../components/MusicListItem.svelte";
    import Shuffle from "../icons/Shuffle.svelte";
    import Play from "../icons/Play.svelte";

    import type { Music } from "../models/type";

    import { musics, musicDetailPanel, musicSortPanel } from "../store";
    import Sort from "../icons/Sort.svelte";

    export let onClickMusic: (music: Music) => void;
    export let onClickPlayAll: (musics: Music[]) => void;
    export let onClickPlayShuffle: (musics: Music[]) => void;

    let search = "";

    let event: NodeJS.Timeout;
    let page = 1;
    let perPage = 100;
    let lastPage = Math.ceil($musics.length / perPage);

    onMount(() => {
        musics.subscribe((musics) => {
            lastPage = Math.ceil(musics.length / perPage);
            event = setInterval(() => {
                if (page < lastPage) {
                    page++;
                } else {
                    clearInterval(event);
                }
            }, 100);
        });
    });

    onDestroy(() => {
        clearInterval(event);
    });

    $: visibleMusics = $musics
        .slice(0, page * perPage)
        .filter(
            (music) =>
                music.isLiked &&
                (search === "" ||
                    music.name.toLowerCase().includes(search.toLowerCase()) ||
                    music.artist.name
                        .toLowerCase()
                        .includes(search.toLowerCase()))
        );
</script>

<div class="controls">
    <div>
        <input
            class="search"
            type="text"
            placeholder="Search"
            bind:value={search}
        />
    </div>
    <div class="buttons">
        <button on:click={() => onClickPlayAll(visibleMusics)}>
            <Play />
            Play All
        </button>
        <button on:click={() => onClickPlayShuffle(visibleMusics)}>
            <Shuffle />
            Shuffle
        </button>
        <button on:click={() => ($musicSortPanel.isOpen = true)}>
            <Sort />
        </button>
    </div>
</div>
<ul aria-label="Music List">
    {#each visibleMusics as music}
        <li>
            <MusicListItem
                albumName={music.album.name}
                albumCover={music.album.cover}
                artistName={music.artist.name}
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

<style lang="scss">
    .controls {
        padding: 1rem;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 0.5rem;
        position: sticky;
        top: 0;
        left: 0;
        background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 1) 75%,
            rgba(0, 0, 0, 0) 100%
        );
        z-index: 1;

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

                :global(svg) {
                    width: 1rem;
                    height: 1rem;
                }

                @media (hover: hover) {
                    &:hover {
                        background-color: rgba(255, 255, 255, 0.1);
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
    }
</style>
