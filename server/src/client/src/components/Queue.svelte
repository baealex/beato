<script lang="ts">
    import { get } from "svelte/store";
    import { navigate } from "svelte-routing";
    import { prompt } from "blend-box";

    import SubPage from "./SubPage.svelte";
    import Checkbox from "./Checkbox.svelte";
    import MusicListItem from "./MusicListItem.svelte";

    import Cross from "../icons/Cross.svelte";
    import CheckBox from "../icons/CheckBox.svelte";
    import TrashBin from "../icons/TrashBin.svelte";
    import DoubleCheck from "../icons/DoubleCheck.svelte";

    import type { Music } from "../models/type";

    import * as socketManager from "../socket";

    import { musicActionPanel, queue } from "../store";

    export let isOpen = false;

    let listRef: HTMLUListElement;
    let enableSelect = false;
    let selectedMusics: Music[] = [];

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
        } else {
            enableSelect = false;
            selectedMusics = [];
        }
    }

    const handleClose = () => {
        isOpen = false;
    };

    const handleChangeCheckbox = (music: Music) => {
        if (selectedMusics.find((m) => m.id === music.id)) {
            selectedMusics = selectedMusics.filter((m) => m.id !== music.id);
        } else {
            selectedMusics = [...selectedMusics, music];
        }
    };

    const handleDeleteMusics = () => {
        queue.update((value) => {
            value.items = value.items.filter(
                (m) => !selectedMusics.find((sm) => sm.id === m.id)
            );
            if (value.selected >= value.items.length) {
                value.selected = value.items.length - 1;
            }
            if (value.items.length === 0) {
                value.title = "";
                value.selected = null;
            }
            return value;
        });
        enableSelect = false;
        selectedMusics = [];
    };

    const handleSaveAsPlaylist = async () => {
        const name = await prompt("Input playlist name");

        if (name) {
            socketManager.socket.emit(socketManager.PLAYLIST_CREATE, {
                name,
                musics: get(queue).items.map((m) => m.id),
            });
        }
    };
</script>

<SubPage {isOpen} hasHeader={false}>
    <div class="header">
        <div class="actions">
            <button
                class="clickable"
                class:active={enableSelect}
                on:click={() => {
                    enableSelect = !enableSelect;
                }}
            >
                <CheckBox />
                {$queue.items.length}
                {#if $queue.items.length === 1}music{:else}musics{/if}
            </button>
            {#if enableSelect}
                <button
                    class="clickable"
                    on:click={() => {
                        if (selectedMusics.length === get(queue).items.length) {
                            selectedMusics = [];
                            return;
                        }
                        selectedMusics = get(queue).items;
                    }}
                >
                    <DoubleCheck />
                    Select all
                </button>
            {/if}
        </div>
        {#if !enableSelect}
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
        {/if}
    </div>
    <ul class="list" bind:this={listRef}>
        {#each $queue.items as music, idx}
            <li class:active={$queue.selected === idx}>
                {#if enableSelect}
                    <div class="checkbox">
                        <Checkbox
                            checked={selectedMusics.some(
                                (m) => m.id === music.id
                            )}
                            onChange={() => handleChangeCheckbox(music)}
                        />
                    </div>
                {/if}
                <MusicListItem
                    musicName={music.name}
                    artistName={music.artist.name}
                    albumName={music.album.name}
                    albumCover={music.album.cover}
                    musicCodec={music.codec}
                    isLiked={music.isLiked}
                    onClick={() => {
                        if (enableSelect) {
                            handleChangeCheckbox(music);
                            return;
                        }
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
    {#if enableSelect && selectedMusics.length > 0}
        <div class="select-actions">
            <button class="clickable" on:click={handleDeleteMusics}>
                <TrashBin />
                Delete
            </button>
        </div>
    {/if}
    <div class="action">
        <div class="buttons">
            <button class="button" on:click={handleSaveAsPlaylist}>
                Save as
            </button>
        </div>
        <button class="icon-button" on:click={handleClose}>
            <Cross />
        </button>
    </div>
</SubPage>

<style lang="scss">
    @import "../styles/var.scss";

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

        .actions {
            display: flex;
            align-items: center;
            gap: 1rem;
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

            &.active {
                color: $PRIMARY_COLOR;
            }

            :global(svg) {
                width: 1rem;
                height: 1rem;
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

    .select-actions {
        position: sticky;
        bottom: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.5rem 0;
        background-color: $PRIMARY_COLOR;

        button {
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
            font-size: 0.75rem;
            font-weight: bold;
            gap: 0.25rem;

            :global(svg) {
                width: 1.25rem;
                height: 1.25rem;
            }
        }
    }

    ul {
        margin: 0;
        padding: 0;
        width: 100%;
        list-style: none;

        li {
            position: relative;
            display: flex;
            align-items: center;

            .checkbox {
                margin-left: 1rem;
            }

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
