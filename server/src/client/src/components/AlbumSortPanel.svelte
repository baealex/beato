<script lang="ts">
    import BottomPanel from "./BottomPanel.svelte";
    import List from "../icons/List.svelte";

    import { albums, albumSortPanel } from "../store";

    import { shuffle } from "../modules/shuffle";

    $: isOpen = $albumSortPanel.isOpen;
    $: latestSort = $albumSortPanel.latestSort;

    let sortItems = [
        {
            name: "Name (A-Z)",
            sort: "nameAsc",
            onClick: () => {
                albums.update((albums) => {
                    albums.sort((a, b) => a.name.localeCompare(b.name));
                    return albums;
                });
            },
        },
        {
            name: "Name (Z-A)",
            sort: "nameDesc",
            onClick: () => {
                albums.update((albums) => {
                    albums.sort((a, b) => b.name.localeCompare(a.name));
                    return albums;
                });
            },
        },
        {
            name: "Artist Name (A-Z)",
            sort: "artistAsc",
            onClick: () => {
                albums.update((albums) => {
                    albums.sort((a, b) =>
                        a.artist.name.localeCompare(b.artist.name)
                    );
                    return albums;
                });
            },
        },
        {
            name: "Artist Name (Z-A)",
            sort: "artistDesc",
            onClick: () => {
                albums.update((albums) => {
                    albums.sort((a, b) =>
                        b.artist.name.localeCompare(a.artist.name)
                    );
                    return albums;
                });
            },
        },
        {
            name: "Published Year (Old-New)",
            sort: "publishedYearAsc",
            onClick: () => {
                albums.update((albums) => {
                    albums.sort((a, b) =>
                        a.publishedYear.localeCompare(b.publishedYear)
                    );
                    return albums;
                });
            },
        },
        {
            name: "Published Year (New-Old)",
            sort: "publishedYearDesc",
            onClick: () => {
                albums.update((albums) => {
                    albums.sort((a, b) =>
                        b.publishedYear.localeCompare(a.publishedYear)
                    );
                    return albums;
                });
            },
        },
        {
            name: "Date Added (Old-New)",
            sort: "createdAtAsc",
            onClick: () => {
                albums.update((albums) => {
                    albums.sort((a, b) =>
                        a.createdAt.localeCompare(b.createdAt)
                    );
                    return albums;
                });
            },
        },
        {
            name: "Date Added (New-Old)",
            sort: "createdAtDesc",
            onClick: () => {
                albums.update((albums) => {
                    albums.sort((a, b) =>
                        b.createdAt.localeCompare(a.createdAt)
                    );
                    return albums;
                });
            },
        },
        {
            name: "Random (Discover)",
            sort: "random",
            onClick: () => {
                albums.update(shuffle);
            },
        },
    ] as const;
</script>

<BottomPanel
    title="Sort By"
    {isOpen}
    onClose={() =>
        albumSortPanel.update((state) => ({ ...state, isOpen: false }))}
>
    <ul class="items">
        {#each sortItems as sortItem}
            <li class:active={latestSort === sortItem.sort}>
                <button
                    class="clickable item"
                    on:click={() => {
                        sortItem.onClick();
                        albumSortPanel.update(() => ({
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
