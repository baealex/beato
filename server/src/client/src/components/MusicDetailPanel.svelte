<script lang="ts">
    import { navigate } from "svelte-routing";

    import type { Music } from "../models/type";

    import Image from "./Image.svelte";
    import BottomPanel from "./BottomPanel.svelte";

    import Play from "../icons/Play.svelte";
    import Heart from "../icons/Heart.svelte";

    import { musicDetailPanel } from "../store";

    export let onClickLike: (music: Music) => void;
    export let onClickAddToQueue: (music: Music) => void;

    $: isOpen = $musicDetailPanel.isOpen;
    $: music = $musicDetailPanel.music;

    const close = () => {
        musicDetailPanel.update((state) => ({
            ...state,
            isOpen: false,
        }));
    };
</script>

<BottomPanel {isOpen} onClose={close}>
    {#if music}
        <div class="album-info">
            <button
                class="clickable linkable"
                on:click={() => {
                    close();
                    navigate(`/album/${music.album.id}`);
                }}
            >
                <Image alt={music.album.name} src={music.album.cover} />
                <div class="col">
                    <div class="album-name">
                        {music.album.name}
                    </div>
                    <div class="artist-name">
                        {music.artist.name}
                    </div>
                </div>
            </button>
        </div>
        <ul class="items">
            <li>
                <button
                    class="clickable item"
                    class:active={music.isLiked}
                    on:click={() => onClickLike(music)}
                >
                    <Heart /> Like
                </button>
            </li>
            <li>
                <button
                    class="clickable item"
                    on:click={() => onClickAddToQueue(music)}
                >
                    <Play /> Add to Queue
                </button>
            </li>
        </ul>
    {/if}
</BottomPanel>

<style lang="scss">
    .album-info {
        padding-bottom: 1rem;
        border-bottom: 1px solid #444;
        font-size: 1rem;
        font-weight: 500;

        button {
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        .col {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;

            .artist-name {
                font-size: 0.8rem;
                color: #aaa;
            }
        }

        :global(img) {
            width: 3rem;
            height: 3rem;
            border-radius: 0.5rem;
        }
    }

    .items {
        padding: 0;
        margin: 0;
        list-style: none;
        display: flex;
        flex-direction: column;
        padding: 1rem 0;

        .item {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem 0;
            border-radius: 0.5rem;

            @media (hover: hover) {
                &:hover {
                    background-color: #333;
                }
            }

            :global(svg) {
                width: 1.125rem;
                height: 1.125rem;
            }

            &.active {
                :global(svg) {
                    fill: #a076f1;
                    color: #a076f1;
                }
            }
        }
    }
</style>
