<script lang="ts">
    import { onMount } from "svelte";

    import ArtistDetail from "./ArtistDetail.svelte";

    import { SubPage, Image } from "~/components";

    import { Sort } from "~/icons";

    import { useGradualRender } from "~/hooks/useGradualRender";

    import { artists, artistSortPanel } from "~/store";

    let selectedId: string | null = null;
    let isOpenDetail = false;

    let search = "";
    let innerArtists = useGradualRender($artists);

    $: visibleArtists = $innerArtists.filter(
        (artist) =>
            search === "" ||
            artist.name.toLowerCase().includes(search.toLowerCase())
    );

    onMount(() => {
        artists.subscribe((artists) => {
            $innerArtists = artists;
        });
    });
</script>

<div class="controls">
    <div>
        <input
            class="gray-input"
            type="text"
            placeholder="Search"
            bind:value={search}
        />
    </div>
    <div class="buttons">
        <button
            class="gray-button"
            on:click={() => ($artistSortPanel.isOpen = true)}
        >
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
        <ArtistDetail id={String(selectedId)} />
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

            @media (min-width: 1024px) {
                &:hover {
                    background-color: rgba(255, 255, 255, 0.1);
                }
            }
        }
    }
</style>
