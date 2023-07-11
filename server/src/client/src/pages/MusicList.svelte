<script lang="ts">
    import { onMount } from "svelte";

    import MusicListItem from "../components/MusicListItem.svelte";
    import Shuffle from "../icons/Shuffle.svelte";
    import Play from "../icons/Play.svelte";
    import Sort from "../icons/Sort.svelte";

    import { shuffle } from "../modules/shuffle";

    import { useGradualRender } from "../hooks/useGradualRender";

    import {
        resetQueue,
        insertToQueue,
        musics,
        musicActionPanel,
        musicSortPanel,
    } from "../store";

    let search = "";
    let innerMusics = useGradualRender($musics, 50);

    $: visibleMusics = $innerMusics.filter(
        (music) =>
            search === "" ||
            music.name.toLowerCase().includes(search.toLowerCase()) ||
            music.artist.name.toLowerCase().includes(search.toLowerCase())
    );

    onMount(() => {
        musics.subscribe((musics) => {
            innerMusics.update((state) => {
                const diff = musics.filter((music) => !state.includes(music));
                const diffIndex = diff.map((music) => musics.indexOf(music));
                const diffState = state.filter(
                    (music) => !musics.includes(music)
                );
                const diffStateIndex = diffState.map((music) =>
                    state.indexOf(music)
                );

                diff.forEach((music, index) => {
                    state[diffStateIndex[index]] = music;
                });
                diffState.forEach((music, index) => {
                    state[diffIndex[index]] = music;
                });

                return state;
            });
        });
    });
</script>

<div class="controls">
    <div>
        <input
            class="gray-input"
            type="text"
            placeholder="Search"
            bind:value={search}
        />
    </div>
    <div class="buttons">
        <button
            class="gray-button"
            on:click={() => resetQueue("Play all music", visibleMusics)}
        >
            <Play />
            Play
        </button>
        <button
            class="gray-button"
            on:click={() =>
                resetQueue("Shuffle all music", shuffle(visibleMusics))}
        >
            <Shuffle />
            Shuffle
        </button>
        <button
            class="gray-button"
            on:click={() => ($musicSortPanel.isOpen = true)}
        >
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

<style lang="scss">
    ul {
        margin: 0;
        padding: 0;
        width: 100%;
        list-style: none;
    }
</style>
