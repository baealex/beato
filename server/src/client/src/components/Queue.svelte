<script lang="ts">
    import { navigate } from "svelte-routing";

    import SubPage from "./SubPage.svelte";
    import MusicListItem from "./MusicListItem.svelte";
    import Cross from "../icons/Cross.svelte";

    import { musicActionPanel, queue, resetQueue } from "../store";

    export let isOpen = false;

    let listRef: HTMLUListElement;

    $: {
        if (isOpen) {
            setTimeout(() => {
                const targetElement = listRef.children.item(
                    $queue.selected
                ) as HTMLLIElement;
                listRef.scrollTo({
                    top: targetElement.offsetTop - 60,
                    behavior: "smooth",
                });
            }, 100);
        }
    }

    const handleClose = () => {
        isOpen = false;
    };
</script>

<SubPage {isOpen} hasHeader={false}>
    <div class="header">
        <div class="count">
            {$queue.items.length}
            {#if $queue.items.length === 1}song{:else}songs{/if}
        </div>
        <button
            class="clickable title"
            on:click={() => {
                handleClose();
                setTimeout(() => {
                    navigate("/queue-history");
                }, 100);
            }}
        >
            {$queue.title} <span class="link" />
        </button>
    </div>
    <ul class="list" bind:this={listRef}>
        {#each $queue.items as music, idx}
            <li class:active={$queue.selected === idx}>
                <MusicListItem
                    musicName={music.name}
                    artistName={music.artist.name}
                    albumName={music.album.name}
                    albumCover={music.album.cover}
                    musicCodec={music.codec}
                    isLiked={music.isLiked}
                    onClick={() => {
                        queue.update((value) => {
                            value.selected = idx;
                            return value;
                        });
                    }}
                    onLongPress={() => {
                        musicActionPanel.update((state) => ({
                            ...state,
                            onPageMove: () => (isOpen = false),
                            isOpen: true,
                            music,
                        }));
                    }}
                />
            </li>
        {/each}
    </ul>
    <div class="action">
        <div class="buttons">
            <button class="button" on:click={() => resetQueue()}>
                Clear Queue
            </button>
        </div>
        <button class="icon-button" on:click={handleClose}>
            <Cross />
        </button>
    </div>
</SubPage>

<style lang="scss">
    .list {
        flex: 1;
        overflow-y: auto;
    }

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 60px;
        padding: 0 1rem;
        border-bottom: 1px solid #333;

        .count {
            color: #ccc;
            font-size: 0.8rem;
        }

        button {
            width: auto;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            color: #eee;
            font-size: 0.8rem;

            .link {
                width: 0;
                height: 0;
                border-top: 0.3rem solid transparent;
                border-bottom: 0.3rem solid transparent;
                border-left: 0.3rem solid currentColor;
                transform: rotate(90deg);
            }
        }
    }

    .action {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.5rem;

        .buttons {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .button {
            border: none;
            background: none;
            color: #a076f1;
            font-size: 1rem;
            font-weight: 600;
            padding: 0.5rem;
            border-radius: 0.5rem;
        }
    }

    ul {
        margin: 0;
        padding: 0;
        width: 100%;
        list-style: none;

        li {
            position: relative;

            @keyframes breathing {
                0% {
                    opacity: 0.15;
                }
                50% {
                    opacity: 0.25;
                }
                100% {
                    opacity: 0.15;
                }
            }

            &.active {
                &::before {
                    content: "";
                    position: absolute;
                    left: 0;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    background-color: #735af2;
                    animation: breathing 3s ease infinite;
                    z-index: -1;
                    pointer-events: none;
                }
            }
        }
    }
</style>
