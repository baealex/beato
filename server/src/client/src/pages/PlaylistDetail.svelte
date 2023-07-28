<script lang="ts">
    import { onMount } from "svelte";
    import { confirm } from "@baejino/ui";

    import { MusicListItem, Checkbox } from "~/components";

    import { Play, TrashBin, CheckBox, DoubleCheck } from "~/icons";

    import type { Playlist } from "~/models/type";

    import { getPlaylist } from "~/api";

    import {
        resetQueue,
        insertToQueue,
        musicActionPanel,
        musics,
    } from "~/store";

    import * as socketManager from "~/socket";

    export let id = "";

    let playlist: Playlist = null;
    let enableSelect = false;
    let selectedMusics: Playlist["musics"] = [];

    $: {
        if (!enableSelect) {
            selectedMusics = [];
        }
    }

    const handleChangeCheckbox = (music: Playlist["musics"][0]) => {
        if (selectedMusics.find((m) => m.id === music.id)) {
            selectedMusics = selectedMusics.filter((m) => m.id !== music.id);
        } else {
            selectedMusics = [...selectedMusics, music];
        }
    };

    const handleDeleteMusics = async () => {
        if (
            await confirm(
                `Delete ${selectedMusics.length} musics from ${playlist.name}?`
            )
        ) {
            socketManager.socket.emit(socketManager.PLAYLIST_REMOVE_MUSIC, {
                id: playlist.id,
                musicIds: selectedMusics.map((m) => m.id),
            });
            playlist.musics = playlist.musics.filter(
                (m) => !selectedMusics.find((sm) => sm.id === m.id)
            );
            selectedMusics = [];
        }
    };

    onMount(async () => {
        musics.subscribe((value) => {
            if (playlist) {
                playlist.musics = playlist.musics.map((music) => {
                    music.isLiked = value.find(
                        (m) => m.id === music.id
                    )?.isLiked;
                    return music;
                });
            }
        });
    });

    $: if (id) {
        getPlaylist(id).then(({ data }) => {
            playlist = data.playlist;
        });
    }
</script>

{#if playlist}
    <div class="playlist">
        <div class="playlist-title">
            {playlist.name}
        </div>
        <div class="play-all">
            <button
                on:click={() => {
                    resetQueue(
                        `Play playlist ${playlist.name}`,
                        playlist.musics
                    );
                }}
            >
                <Play />
            </button>
        </div>
    </div>
{/if}

{#if playlist?.musics}
    <div class="playlist-items">
        <div class="actions">
            <button
                class="clickable"
                class:active={enableSelect}
                on:click={() => (enableSelect = !enableSelect)}
            >
                <CheckBox />
                {playlist.musics.length} musics
            </button>
            {#if enableSelect}
                <button
                    class="clickable"
                    on:click={() => {
                        if (selectedMusics.length === playlist.musics.length) {
                            selectedMusics = [];
                            return;
                        }
                        selectedMusics = playlist.musics;
                    }}
                >
                    <DoubleCheck />
                    Select all
                </button>
            {/if}
        </div>
        <ul>
            {#each playlist.musics as music}
                <li>
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
                        albumCover={music.album.cover}
                        artistName={music.artist.name}
                        musicName={music.name}
                        musicCodec={music.codec}
                        isLiked={music.isLiked}
                        onClick={() => {
                            if (enableSelect) {
                                handleChangeCheckbox(music);
                                return;
                            }
                            insertToQueue(music);
                        }}
                        onLongPress={() => {
                            musicActionPanel.update((state) => ({
                                ...state,
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
                <button
                    class="clickable"
                    on:click={() => {
                        resetQueue(
                            `Play ${selectedMusics.length} songs from ${playlist.name}`,
                            selectedMusics
                        );
                    }}
                >
                    <Play />
                    Play
                </button>
                <button class="clickable" on:click={handleDeleteMusics}>
                    <TrashBin />
                    Delete
                </button>
            </div>
        {/if}
    </div>
{/if}

<style lang="scss">
    @import "../styles/var.scss";

    .playlist {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        padding: 2rem 1rem;
        background-color: #111;
        border-radius: 0.5rem;

        :global(.album-cover) {
            width: 100%;
            max-width: 300px;
            border-radius: 0.5rem;
        }

        .playlist-title {
            font-size: 1.25rem;
            font-weight: bold;
        }

        .play-all {
            position: absolute;
            bottom: 0;
            right: 0.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            transform: translateY(50%);

            button {
                border-radius: 100%;
                width: 4rem;
                height: 4rem;
                background-color: #1c1c1c;
                border: 4px solid #000;
                color: #ccc;
                transition: background-color 0.2s;

                :global(svg) {
                    width: 1.5rem;
                    height: 1.5rem;
                }

                @media (min-width: 1024px) {
                    &:hover {
                        background-color: #2a2a2a;
                    }
                }
            }
        }
    }

    .playlist-items {
        margin-top: 1.75rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        flex: 1;

        .checkbox {
            margin-left: 1rem;
        }

        .actions {
            padding: 0 1rem;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 1rem;

            button {
                display: flex;
                align-items: center;
                gap: 0.25rem;
                font-size: 0.875rem;
                color: #ccc;
                width: auto;
                transition: color 0.2s;

                &.active {
                    color: $PRIMARY_COLOR;
                }

                :global(svg) {
                    width: 1rem;
                    height: 1rem;
                }
            }
        }

        ul {
            flex: 1;
            margin: 0;
            padding: 0;
            width: 100%;
            list-style: none;

            li {
                display: flex;
                align-items: center;
            }
        }

        .select-actions {
            position: sticky;
            bottom: 0;
            left: 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 1rem;
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
    }
</style>
