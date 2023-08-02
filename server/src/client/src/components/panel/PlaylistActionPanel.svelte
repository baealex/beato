<script lang="ts">
    import { derived } from "svelte/store";
    import { navigate } from "svelte-routing";
    import { confirm, prompt } from "@baejino/ui";

    import { Image, BottomPanel } from "~/components";

    import { Cross, Pencil } from "~/icons";

    import * as socketManager from "~/socket";

    import { musicMap, playlistActionPanel } from "~/store";

    $: isOpen = $playlistActionPanel.isOpen;
    $: playlist = $playlistActionPanel.playlist;
    $: resolveMusic = derived(musicMap, ($musicMap) => {
        return playlist?.headerMusics.map(({ id }) => $musicMap.get(id));
    });

    const handleClose = () => {
        playlistActionPanel.update((state) => ({
            ...state,
            isOpen: false,
        }));
    };

    const handleRename = async () => {
        const name = await prompt("Enter new name", playlist.name);
        if (!name) return;

        socketManager.socket.emit(socketManager.PLAYLIST_UPDATE, {
            id: playlist.id,
            name: name,
        });
        handleClose();
    };

    const handleDelete = async () => {
        if (await confirm("Are you sure you want to delete this playlist?")) {
            socketManager.socket.emit(socketManager.PLAYLIST_DELETE, {
                id: playlist.id,
            });
            playlistActionPanel.update((state) => ({
                ...state,
                isOpen: false,
                playlist: null,
            }));
            handleClose();
        }
    };
</script>

<BottomPanel {isOpen} onClose={handleClose}>
    {#if playlist}
        <div class="album-info">
            <button
                class="clickable linkable"
                on:click={() => {
                    handleClose();
                    setTimeout(() => {
                        navigate(`/playlist/${playlist.id}`);
                    }, 100);
                }}
            >
                {#if $resolveMusic.length >= 4}
                    <div class="album-cover-grid">
                        {#each $resolveMusic as music}
                            <Image src={music.album.cover} alt="Album cover" />
                        {/each}
                    </div>
                {/if}
                {#if $resolveMusic.length < 4}
                    <div class="album-cover">
                        <Image
                            src={$resolveMusic?.[0]?.album.cover}
                            alt="Album cover"
                        />
                    </div>
                {/if}
                <div class="col">
                    <div class="album-name">
                        {playlist.name}
                    </div>
                    <div class="artist-name">
                        {playlist.musicCount} songs
                    </div>
                </div>
            </button>
        </div>
        <ul class="items">
            <li>
                <button class="clickable item" on:click={handleRename}>
                    <Pencil /> Rename
                </button>
            </li>
            <li>
                <button class="clickable item" on:click={handleDelete}>
                    <Cross /> Delete
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

        .album-cover-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: repeat(2, 1fr);
            width: 3rem;
            height: 3rem;
            border-radius: 0.5rem;

            :global(img) {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        .album-cover {
            width: 3rem;
            height: 3rem;
            border-radius: 0.5rem;

            :global(img) {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
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

            @media (min-width: 1024px) {
                &:hover {
                    background-color: #333;
                }
            }

            :global(svg) {
                width: 1.125rem;
                height: 1.125rem;
            }
        }
    }
</style>
