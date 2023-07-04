<script lang="ts">
    import { onMount } from "svelte";

    import AlbumDetail from "./AlbumDetail.svelte";
    import SubPage from "../components/SubPage.svelte";
    import AlbumListItem from "../components/AlbumListItem.svelte";
    import Sort from "../icons/Sort.svelte";

    import type { Music } from "../models/type";

    import { albums, albumSortPanel } from "../store";

    export let onClickMusic: (music: Music) => void;

    let selectedId: string | null = null;
    let isOpenDetail = false;

    let search = "";

    let page = 1;
    let perPage = 40;
    let lastPage = Math.ceil($albums.length / perPage);

    onMount(() => {
        albums.subscribe((value) => {
            lastPage = Math.ceil(value.length / perPage);
            const gradualRender = () =>
                requestAnimationFrame(() => {
                    if (page < lastPage) {
                        page++;
                        gradualRender();
                    }
                });
            gradualRender();
        });
    });

    $: visibleAlbums = $albums
        .slice(0, page * perPage)
        .filter(
            (album) =>
                search === "" ||
                album.name.toLowerCase().includes(search.toLowerCase())
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
        <button on:click={() => ($albumSortPanel.isOpen = true)}>
            <Sort />
        </button>
    </div>
</div>
<div class="grid">
    {#each visibleAlbums as album}
        <AlbumListItem
            onClick={() => {
                selectedId = album.id;
                isOpenDetail = true;
            }}
            albumName={album.name}
            albumCover={album.cover}
            artistName={album.artist.name}
        />
    {/each}
</div>

<SubPage
    isOpen={isOpenDetail}
    onClose={() => {
        selectedId = null;
        isOpenDetail = false;
    }}
>
    {#if selectedId}
        <AlbumDetail id={selectedId} {onClickMusic} />
    {/if}
</SubPage>

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

                @media (min-width: 1024px) {
                    &:hover {
                        background-color: rgba(255, 255, 255, 0.1);
                    }
                }
            }
        }
    }

    .grid {
        display: grid;
        grid-gap: 1rem;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        padding: 1rem;
        list-style: none;

        @media (max-width: 600px) {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }
</style>
