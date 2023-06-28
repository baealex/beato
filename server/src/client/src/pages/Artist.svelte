<script lang="ts">
    import { onDestroy, onMount } from "svelte";

    import Image from "../components/Image.svelte";
    import SubPage from "../components/SubPage.svelte";
    import ArtistDetail from "./ArtistDetail.svelte";

    import type { Music } from "../models/type";

    import { artists } from "../store";

    export let onClickMusic: (music: Music) => void;

    let selectedId: string | null = null;
    let isOpenDetail = false;

    let event: NodeJS.Timeout;
    let page = 1;
    let perPage = 100;
    let lastPage = Math.ceil($artists.length / perPage);

    onMount(() => {
        artists.subscribe((value) => {
            lastPage = Math.ceil(value.length / perPage);
            event = setInterval(() => {
                if (page < lastPage) {
                    page++;
                } else {
                    clearInterval(event);
                }
            }, 100);
        });
    });

    onDestroy(() => {
        clearInterval(event);
    });

    $: visibleArtists = $artists.slice(0, page * perPage);
</script>

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

            @media (hover: hover) {
                &:hover {
                    background-color: rgba(255, 255, 255, 0.1);
                }
            }
        }
    }
</style>
