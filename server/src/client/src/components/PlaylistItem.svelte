<script lang="ts">
    import { derived } from "svelte/store";

    import Image from "~/components/atom/Image.svelte";

    import { MoreVerticalFill } from "~/icons";

    import type { Music } from "../models/type";

    import { musicMap } from "~/store";

    export let name: string;
    export let items: Pick<Music, "id">[];
    export let itemCount: number;
    export let onClick: () => void;
    export let onLongPress: () => void = null;

    $: resolveMusics = derived(musicMap, ($musicMap) => {
        return items.slice(0, 4).map((music) => {
            return $musicMap.get(music.id);
        });
    });
</script>

<button
    class="clickable item"
    on:click={onClick}
    on:contextmenu={(e) => {
        e.preventDefault();
        onLongPress?.();
    }}
>
    {#if $resolveMusics.length >= 4}
        <div class="album-cover-grid">
            {#each $resolveMusics as music}
                <Image src={music.album.cover} alt="Album cover" />
            {/each}
        </div>
    {/if}
    {#if $resolveMusics.length < 4}
        <div class="album-cover">
            <Image src={$resolveMusics[0]?.album.cover} alt="Album cover" />
        </div>
    {/if}
    <div class="info">
        <div class="title">
            {name}
        </div>
        <div class="song-count">
            {itemCount} songs
        </div>
    </div>
    {#if onLongPress}
        <button
            class="icon-button"
            on:click={(e) => {
                e.stopPropagation();
                onLongPress();
            }}
        >
            <MoreVerticalFill />
        </button>
    {/if}
</button>

<style lang="scss">
    .item {
        color: #eee;
        font-size: 0.8rem;
        padding: 1rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
        width: 100%;

        @media (min-width: 1024px) {
            &:hover {
                background-color: rgba(255, 255, 255, 0.1);
            }
        }

        .icon-button {
            color: #eee;
            width: 2.5rem;
            height: 2.5rem;

            :global(svg) {
                width: 1.125rem;
                height: 1.125rem;
            }

            @media (min-width: 1024px) {
                &:hover {
                    background-color: rgba(255, 255, 255, 0.1);
                }
            }
        }

        .title {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 0.25rem;
        }

        .song-count {
            font-size: 0.875rem;
            color: #aaa;
        }
    }

    .album-cover-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 1fr);
        width: 60px;
        height: 60px;

        :global(img) {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .album-cover {
        width: 60px;
        height: 60px;

        :global(img) {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
</style>
