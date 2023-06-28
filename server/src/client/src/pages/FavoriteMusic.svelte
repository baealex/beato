<script lang="ts">
    import MusicListItem from "../components/MusicListItem.svelte";
    import Shuffle from "../icons/Shuffle.svelte";
    import Play from "../icons/Play.svelte";

    import type { Music } from "../models/type";

    import { musics, musicDetailPanel } from "../store";

    export let onClickMusic: (music: Music) => void;
    export let onClickPlayAll: (musics: Music[]) => void;
    export let onClickPlayShuffle: (musics: Music[]) => void;

    let search = "";

    $: visibleMusics = $musics.filter(
        (m) =>
            m.isLiked &&
            (search === "" ||
                m.name.toLowerCase().includes(search.toLowerCase()) ||
                m.artist.name.toLowerCase().includes(search.toLowerCase()))
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

    ul {
        margin: 0;
        padding: 0;
        width: 100%;
        list-style: none;
    }
</style>
