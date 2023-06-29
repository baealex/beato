<script lang="ts">
    import Image from "./Image.svelte";
    import SubPage from "./SubPage.svelte";
    import SwipeCard from "./SwipeCard.svelte";
    import Cross from "../icons/Cross.svelte";

    import { playlist } from "../store/playlist";

    export let isOpen = false;
    export let onClose: () => void;
    export let onClickMusic: (idx: number) => void;
    export let onDeleteMusic: (idx: number) => void;
</script>

<SubPage {isOpen} hasHeader={false}>
    <div class="list">
        {#each $playlist.items as music, idx}
            <SwipeCard
                onClick={() => onClickMusic(idx)}
                menus={[
                    {
                        label: "Delete",
                        onClick: () => onDeleteMusic(idx),
                    },
                ]}
            >
                <div class="item" class:active={$playlist.selected === idx}>
                    <Image
                        class="album-art"
                        src={music.album.cover}
                        alt={music.name}
                        loading="lazy"
                    />
                    <div class="info">
                        <div class="title">
                            {music.name}
                        </div>
                        <div class="artist">
                            {music.artist.name}
                        </div>
                    </div>
                </div>
            </SwipeCard>
        {/each}
    </div>
    <div class="action">
        <button on:click={onClose}>
            <Cross />
        </button>
    </div>
</SubPage>

<style lang="scss">
    .list {
        flex: 1;
        overflow-y: auto;
    }

    .action {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        padding: 0.5rem;

        button {
            width: 3rem;
            height: 3rem;
            border-radius: 0.25rem;
            background-color: transparent;
            color: white;
            border: none;
            cursor: pointer;
            font-size: 0.8rem;
            font-weight: bold;
            text-transform: uppercase;
            transition: background-color 0.25s ease-in-out;

            :global(svg) {
                width: 1.5rem;
                height: 1.5rem;
            }

            @media (hover: hover) {
                &:hover {
                    background-color: rgba(255, 255, 255, 0.2);
                }
            }
        }
    }

    .list {
        .item {
            cursor: pointer;
            padding: 1rem;
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 0.5rem;

            &.active {
                border-left: 0.25rem solid #a076f1;
            }

            @media (hover: hover) {
                &:hover {
                    background-color: rgba(255, 255, 255, 0.1);
                }
            }
        }
    }
</style>
