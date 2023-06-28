<script lang="ts">
    import Image from "./Image.svelte";
    import Heart from "../icons/Heart.svelte";
    import MoreVerticalFill from "../icons/MoreVerticalFill.svelte";

    export let albumName: string = null;
    export let albumCover: string = null;
    export let artistName: string;
    export let trackNumber: number = null;
    export let musicName: string;
    export let musicCodec: string = null;
    export let isLiked: boolean = false;
    export let onClick: () => void;
    export let onLongPress: () => void = null;
</script>

<button
    class="clickable item"
    on:click={onClick}
    on:contextmenu={(e) => {
        e.preventDefault();
        onLongPress();
    }}
>
    {#if albumCover !== null}
        <Image class="album-art" alt={albumName} src={albumCover} />
    {/if}
    <div class="row">
        <div class="info">
            <div class="title">
                {#if trackNumber !== null}
                    <span class="track-number">
                        {trackNumber}.
                    </span>
                {/if}
                {musicName}
                {#if musicCodec && musicCodec.toLowerCase() === "flac"}
                    <span class="codec">
                        {musicCodec}
                    </span>
                {/if}
            </div>
            <div class="artist">
                <div>
                    {artistName}
                </div>
            </div>
        </div>
        <button
            class="icon-button"
            class:liked={isLiked}
            on:click={(e) => {
                e.stopPropagation();
                onLongPress();
            }}
        >
            {#if isLiked}
                <Heart />
            {:else}
                <MoreVerticalFill />
            {/if}
        </button>
    </div>
</button>

<style lang="scss">
    .row {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 100%;

        .icon-button {
            color: #eee;
            width: 2.5rem;
            height: 2.5rem;

            :global(svg) {
                width: 1.125rem;
                height: 1.125rem;
            }

            &.liked {
                :global(svg) {
                    fill: #a076f1;
                    color: #a076f1;
                }
            }

            @media (hover: hover) {
                &:hover {
                    background-color: rgba(255, 255, 255, 0.1);
                }
            }
        }
    }

    .item {
        color: #eee;
        font-size: 0.8rem;
        cursor: pointer;
        padding: 1rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
        width: 100%;

        @media (hover: hover) {
            &:hover {
                background-color: rgba(255, 255, 255, 0.1);
            }
        }

        .artist {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
        }

        .title {
            display: flex;
            align-items: center;
            gap: 0.25rem;

            .track-number {
                font-size: 0.8rem;
                font-weight: 400;
            }

            .codec {
                border: 1px solid #333;
                color: #eee;
                padding: 0.1rem 0.5rem;
                border-radius: 0.5rem;
                font-size: 0.6rem;
                font-weight: 400;
            }
        }
    }
</style>
