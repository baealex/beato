<script lang="ts">
    import AlbumDetail from "./AlbumDetail.svelte";
    import SubPage from "../components/SubPage.svelte";
    import AlbumListItem from "../components/AlbumListItem.svelte";

    import type { Music } from "../models/type";

    import { albums } from "../store";

    let selectedId: string | null = null;
    let isOpenDetail = false;
    export let onClickMusic: (music: Music) => void;
</script>

<div class="grid">
    {#each $albums as album}
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
