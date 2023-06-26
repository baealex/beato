<script lang="ts">
    import Cross from "../icons/Cross.svelte";

    import { getImage } from "../modules/image";
    import { playlist } from "../store/playlist";
    import SwipeCard from "./SwipeCard.svelte";

    export let listOpen = false;
    export let onClose: () => void;
    export let onClickMusic: (idx: number) => void;
    export let onDeleteMusic: (idx: number) => void;
</script>

<div class="now" class:open={listOpen}>
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
                    <img
                        class="album-art"
                        src={getImage(music.album.cover)}
                        alt=""
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
</div>

<style lang="scss">
    .now {
        opacity: 0;
        transform: translateY(100%);
        position: fixed;
        display: flex;
        flex-direction: column;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.95);
        z-index: 100;
        transition: all 0.25s ease-out;

        &.open {
            opacity: 1;
            transform: translateY(0%);
        }

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

            &:hover {
                background-color: rgba(255, 255, 255, 0.1);
            }
        }
    }
</style>
