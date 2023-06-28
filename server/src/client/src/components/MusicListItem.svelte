<script lang="ts">
    import Image from "./Image.svelte";

    import { useLongPress } from "../hooks/useLongPress";

    export let albumName: string = null;
    export let albumCover: string = null;
    export let artistName: string;
    export let trackNumber: number = null;
    export let musicName: string;
    export let musicCodec: string = null;
    export let musicDuration: number = null;
    export let musicPlayCount: number = null;
    export let onClick: () => void;
    export let onLongPress: () => void = null;

    const { handleTouchStart, handleTouchMove, handleTouchEnd } = useLongPress({
        onClick,
        onLongPress,
    });
</script>

<button
    class="clickable item"
    on:mousedown={handleTouchStart}
    on:mouseup={handleTouchEnd}
    on:touchmove={handleTouchMove}
>
    {#if albumCover !== null}
        <Image class="album-art" alt={albumName} src={albumCover} />
    {/if}
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
            {#if musicDuration !== null && musicPlayCount !== null}
                <div>
                    {Math.floor(musicDuration / 60)} min /
                    {musicPlayCount} plays
                </div>
            {/if}
        </div>
    </div>
</button>

<style lang="scss">
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
