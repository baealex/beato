<script lang="ts">
    import { onDestroy, onMount } from "svelte";

    import AlbumDetail from "./AlbumDetail.svelte";
    import SubPage from "../components/SubPage.svelte";
    import AlbumListItem from "../components/AlbumListItem.svelte";

    import type { Music } from "../models/type";

    import { albums } from "../store";

    export let onClickMusic: (music: Music) => void;

    let selectedId: string | null = null;
    let isOpenDetail = false;

    let event: NodeJS.Timeout;
    let page = 1;
    let perPage = 40;
    let lastPage = Math.ceil($albums.length / perPage);

    onMount(() => {
        albums.subscribe((value) => {
            lastPage = Math.ceil(value.length / perPage);
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

    $: visibleAlbums = $albums.slice(0, page * perPage);
</script>

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
