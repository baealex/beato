<script lang="ts">
    import BottomPanel from "./BottomPanel.svelte";
    import List from "../icons/List.svelte";

    import { artists, artistSortPanel } from "../store";

    import { shuffle } from "../modules/shuffle";

    $: isOpen = $artistSortPanel.isOpen;
    $: latestSort = $artistSortPanel.latestSort;

    let sortItems = [
        {
            name: "Name (A-Z)",
            sort: "nameAsc",
            onClick: () => {
                artists.update((artists) => {
                    artists.sort((a, b) => a.name.localeCompare(b.name));
                    return artists;
                });
            },
        },
        {
            name: "Name (Z-A)",
            sort: "nameDesc",
            onClick: () => {
                artists.update((artists) => {
                    artists.sort((a, b) => b.name.localeCompare(a.name));
                    return artists;
                });
            },
        },
        {
            name: "Song Count (Low-High)",
            sort: "songCountAsc",
            onClick: () => {
                artists.update((artists) => {
                    artists.sort((a, b) => a.musicCount - b.musicCount);
                    return artists;
                });
            },
        },
        {
            name: "Song Count (High-Low)",
            sort: "songCountDesc",
            onClick: () => {
                artists.update((artists) => {
                    artists.sort((a, b) => b.musicCount - a.musicCount);
                    return artists;
                });
            },
        },
        {
            name: "Album Count (Low-High)",
            sort: "albumCountAsc",
            onClick: () => {
                artists.update((artists) => {
                    artists.sort((a, b) => a.albumCount - b.albumCount);
                    return artists;
                });
            },
        },
        {
            name: "Album Count (High-Low)",
            sort: "albumCountDesc",
            onClick: () => {
                artists.update((artists) => {
                    artists.sort((a, b) => b.albumCount - a.albumCount);
                    return artists;
                });
            },
        },
        {
            name: "Date Added (Old-New)",
            sort: "createdAtAsc",
            onClick: () => {
                artists.update((artists) => {
                    artists.sort((a, b) =>
                        a.createdAt.localeCompare(b.createdAt)
                    );
                    return artists;
                });
            },
        },
        {
            name: "Date Added (New-Old)",
            sort: "createdAtDesc",
            onClick: () => {
                artists.update((artists) => {
                    artists.sort((a, b) =>
                        b.createdAt.localeCompare(a.createdAt)
                    );
                    return artists;
                });
            },
        },
        {
            name: "Random (Discover)",
            sort: "random",
            onClick: () => {
                artists.update(shuffle);
            },
        },
    ] as const;
</script>

<BottomPanel
    title="Sort By"
    {isOpen}
    onClose={() =>
        artistSortPanel.update((state) => ({ ...state, isOpen: false }))}
>
    <ul class="items">
        {#each sortItems as sortItem}
            <li class:active={latestSort === sortItem.sort}>
                <button
                    class="clickable item"
                    on:click={() => {
                        sortItem.onClick();
                        artistSortPanel.update(() => ({
                            isOpen: false,
                            latestSort: sortItem.sort,
                        }));
                    }}
                >
                    <List />
                    {sortItem.name}
                </button>
            </li>
        {/each}
    </ul>
</BottomPanel>

<style lang="scss">
    .items {
        padding: 0;
        margin: 0;
        list-style: none;
        display: flex;
        flex-direction: column;
        padding: 1rem 0;

        .active {
            :global(svg) {
                fill: #a076f1;
                color: #a076f1;
            }
        }

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
