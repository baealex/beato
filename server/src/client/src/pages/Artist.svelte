<script lang="ts">
    import { onMount } from "svelte";

    import ArtistDetail from "./ArtistDetail.svelte";
    import SubPage from "../components/SubPage.svelte";
    import Image from "../components/Image.svelte";
    import Sort from "../icons/Sort.svelte";

    import type { Music } from "../models/type";

    import { artists, artistSortPanel } from "../store";

    export let onClickMusic: (music: Music) => void;

    let selectedId: string | null = null;
    let isOpenDetail = false;

    let search = "";

    let page = 1;
    let perPage = 100;
    let lastPage = Math.ceil($artists.length / perPage);

    onMount(() => {
        artists.subscribe((value) => {
            lastPage = Math.ceil(value.length / perPage);
            const gradualRender = () =>
                requestAnimationFrame(() => {
                    if (page < lastPage) {
                        page++;
                        gradualRender();
                    }
                });
            gradualRender();
        });
    });

    $: visibleArtists = $artists
        .slice(0, page * perPage)
        .filter(
            (album) =>
                search === "" ||
                album.name.toLowerCase().includes(search.toLowerCase())
        );
</script>

<div class="controls">
    <div>
        <input
            class="search"
            type="text"
            placeholder="Search"
            bind:value={search}
        />
    </div>
    <div class="buttons">
        <button on:click={() => ($artistSortPanel.isOpen = true)}>
            <Sort />
        </button>
    </div>
</div>
<ul>
    {#each visibleArtists as artist}
        <li>
            <button
                class="clickable"
                on:click={() => {
                    selectedId = artist.id;
                    isOpenDetail = true;
                }}
            >
                <Image
                    src={artist.latestAlbum?.cover || ""}
                    alt={artist.name}
                />
                <div class="info">
                    <div class="name">
                        {artist.name}
                    </div>
                    <div class="count">
                        <div class="album">
                            {artist.albumCount} albums
                        </div>
                        <span> / </span>
                        <div class="music">
                            {artist.musicCount} songs
                        </div>
                    </div>
                </div>
            </button>
        </li>
    {/each}
</ul>

<SubPage
    isOpen={isOpenDetail}
    onClose={() => {
        selectedId = null;
        isOpenDetail = false;
    }}
>
    {#if selectedId}
        <ArtistDetail id={String(selectedId)} {onClickMusic} />
    {/if}
</SubPage>

<style lang="scss">
    .controls {
        padding: 1rem;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 0.5rem;
        position: sticky;
        top: 0;
        left: 0;
        background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 1) 75%,
            rgba(0, 0, 0, 0) 100%
        );
        z-index: 1;

        .search {
            padding: 0.5rem;
            border: none;
            background-color: #222;
            border-radius: 0.5rem;
            color: #eee;
            font-size: 0.8rem;
            font-weight: 600;
            width: 10rem;

            &:focus {
                outline: none;
            }
        }

        .buttons {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 0.5rem;

            button {
                padding: 0.5rem;
                border: none;
                background-color: #222;
                border-radius: 0.5rem;
                color: #eee;
                font-size: 0.8rem;
                font-weight: 600;
                display: flex;
                flex-direction: row;
                align-items: center;
                gap: 0.5rem;

                :global(svg) {
                    width: 1rem;
                    height: 1rem;
                }

                @media (min-width: 1024px) {
                    &:hover {
                        background-color: rgba(255, 255, 255, 0.1);
                    }
                }
            }
        }
    }

    :global(a) {
        text-decoration: none;
        color: inherit;
    }

    ul {
        margin: 0;
        padding: 0;
        list-style: none;

        li button {
            cursor: pointer;
            padding: 1rem;
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 0.75rem;

            :global(img) {
                width: 4rem;
                height: 4rem;
                object-fit: cover;
                border-radius: 100%;
            }

            .info {
                display: flex;
                flex-direction: column;
                gap: 0.25rem;
            }

            .count {
                display: flex;
                gap: 0.25rem;
                font-size: 0.75rem;
                color: rgba(255, 255, 255, 0.5);
            }

            @media (min-width: 1024px) {
                &:hover {
                    background-color: rgba(255, 255, 255, 0.1);
                }
            }
        }
    }
</style>
