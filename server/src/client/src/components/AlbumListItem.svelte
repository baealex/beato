<script lang="ts">
    import Image from "../components/Image.svelte";

    export let albumCover: string;
    export let albumName: string;
    export let artistName: string = "";
    export let onClick: () => void;
</script>

<button class="clickable" on:click={onClick}>
    <Image class="cover" src={albumCover} alt={albumName} />
    <div class="title">
        {albumName}
    </div>
    {#if artistName}
        <div class="artist">
            {artistName}
        </div>
    {/if}
</button>

<style lang="scss">
    button {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        border-radius: 0.5rem;
        background-color: #111;
        transition: background-color 0.2s ease-in-out;
        padding-bottom: 0.5rem;

        @media (min-width: 1024px) {
            &:hover {
                background-color: #222222;
            }
        }

        :global(.cover) {
            flex: 1;
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 0.5rem;
            padding-bottom: 0.5rem;
        }

        .title,
        .artist {
            padding: 0 0.5rem;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .title {
            font-weight: bold;
        }

        .artist {
            color: #aaaaaa;
        }
    }
</style>
