<script lang="ts">
    import { navigate } from "svelte-routing";

    import type { Music, Playlist } from "../models/type";

    import Image from "./Image.svelte";
    import BottomPanel from "./BottomPanel.svelte";
    import PlaylistItem from "./PlaylistItem.svelte";

    import Play from "../icons/Play.svelte";
    import Data from "../icons/Data.svelte";
    import Heart from "../icons/Heart.svelte";
    import Download from "../icons/Download.svelte";

    import {
        playlists,
        insertToPlaylist,
        insertToQueue,
        musicActionPanel,
    } from "../store";

    export let onClickLike: (music: Music) => void;
    export let onClickDownload: (music: Music) => void;

    $: music = $musicActionPanel.music;
    $: isOpen = $musicActionPanel.isOpen;

    let isOpenPlaylistSelector = false;

    const handleClose = () => {
        musicActionPanel.update((state) => ({
            ...state,
            isOpen: false,
            onClose: null,
        }));
    };

    const handleClickAddToQueue = () => {
        handleClose();
        insertToQueue(music);
    };

    const handleClickAddToPlaylist = () => {
        isOpenPlaylistSelector = true;
    };

    const handleClickAdd = (playlist: Playlist) => {
        insertToPlaylist(playlist, music);
        isOpenPlaylistSelector = false;
    };
</script>

<BottomPanel title="Related to this music" {isOpen} onClose={handleClose}>
    {#if music}
        <div class="panel-content">
            <button
                class="clickable linkable panel-album"
                on:click={() => {
                    $musicActionPanel.onClose?.();
                    handleClose();
                    setTimeout(() => {
                        navigate(`/album/${music.album.id}`);
                    }, 100);
                }}
            >
                <Image alt={music.album.name} src={music.album.cover} />
                <div>
                    <div class="panel-sub-title">Album</div>
                    <div class="panel-sub-content">
                        {music.album.name}
                    </div>
                </div>
            </button>
            <button
                class="clickable linkable panel-artist"
                on:click={() => {
                    $musicActionPanel.onClose?.();
                    handleClose();
                    setTimeout(() => {
                        navigate(`/artist/${music.artist.id}`);
                    }, 100);
                }}
            >
                <div class="panel-sub-title">Artist</div>
                <div class="panel-sub-content">
                    {music.artist.name}
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
                <button class="clickable item" on:click={handleClickAddToQueue}>
                    <Play /> Add to Queue
                </button>
            </li>
            <li>
                <button
                    class="clickable item"
                    on:click={handleClickAddToPlaylist}
                >
                    <Data /> Add to Playlist
                </button>
            </li>
            <li>
                <button
                    class="clickable item"
                    on:click={() => onClickDownload(music)}
                >
                    <Download /> Download
                </button>
            </li>
        </ul>
        <div class="detail-info">
            <span>listen: {music.playCount} times</span>/
            <span>duration: {Math.floor(music.duration / 60)}min</span>/
            <span>codec: {music.codec}</span>
        </div>
    {/if}
</BottomPanel>

<BottomPanel title="Select Playlist" bind:isOpen={isOpenPlaylistSelector}>
    {#each $playlists as playlist}
        <PlaylistItem
            name={playlist.name}
            items={playlist.headerMusics}
            itemCount={playlist.musicCount}
            onClick={() => handleClickAdd(playlist)}
        />
    {/each}
</BottomPanel>

<style lang="scss">
    .panel-content {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        margin-top: 1.5rem;
    }

    .panel-album {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;

        :global(img) {
            width: 60px;
            height: 60px;
            object-fit: cover;
            border-radius: 5px;
            transition: border-radius 0.25s ease-in-out;
        }
    }

    .panel-artist {
        display: flex;
        flex-direction: column;
    }

    .panel-sub-title {
        font-size: 0.875rem;
        color: #888;
        margin-bottom: 0.25rem;
    }

    .panel-sub-content {
        font-size: 0.875rem;
        font-weight: bold;
    }

    .items {
        padding: 0;
        margin: 0;
        list-style: none;
        display: flex;
        flex-direction: column;
        border-bottom: 1px solid #444;
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

            &.active {
                :global(svg) {
                    fill: #a076f1;
                    color: #a076f1;
                }
            }
        }
    }

    .detail-info {
        padding: 1rem 0 0;
        font-size: 0.8rem;
        color: #aaa;
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;
        gap: 0.5rem;
    }
</style>
