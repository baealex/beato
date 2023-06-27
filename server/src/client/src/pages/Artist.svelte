<script lang="ts">
    import { onMount } from "svelte";

    import Image from "../components/Image.svelte";
    import SubPage from "../components/SubPage.svelte";
    import ArtistDetail from "./ArtistDetail.svelte";

    import type { Artist, Music } from "../models/type";

    import { graphQLRequest } from "../api";

    import { artists } from "../store";

    let selectedId: number | null = null;
    let isOpenDetail = false;
    export let onClickMusic: (music: Music) => void;

    onMount(async () => {
        const { data } = await graphQLRequest<"allArtists", Artist[]>(`
            query {
                allArtists {
                    id
                    name
                    latestAlbum {
                        cover
                    }
                    albumCount
                    musicCount
                }
            }
        `);

        $artists = data.allArtists;
    });
</script>

<ul>
    {#each $artists as artist}
        <li
            on:click={() => {
                selectedId = artist.id;
                isOpenDetail = true;
            }}
        >
            <Image src={artist.latestAlbum.cover} alt={artist.name} />
            <div class="info">
                <div class="name">
                    {artist.name}
                </div>
                <div class="count">
                    <div class="album">
                        {artist.albumCount}개의 앨범
                    </div>
                    <span> / </span>
                    <div class="music">
                        {artist.musicCount}개의 음악
                    </div>
                </div>
            </div>
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

        li {
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

            &:hover {
                background-color: rgba(255, 255, 255, 0.1);
            }
        }
    }
</style>
