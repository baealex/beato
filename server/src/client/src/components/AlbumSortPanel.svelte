<script lang="ts">
    import BottomPanel from "./BottomPanel.svelte";
    import List from "../icons/List.svelte";

    import { shuffle } from "../modules/shuffle";
    import { sort } from "../modules/sort";

    import { albums, albumSortPanel } from "../store";

    $: isOpen = $albumSortPanel.isOpen;
    $: latestSort = $albumSortPanel.latestSort;

    const sortItems = [
        {
            name: "Name (A-Z)",
            sort: "nameAsc",
            onClick: () => {
                albums.update(
                    sort({
                        key: "name",
                        type: "text",
                        direction: "asc",
                    })
                );
            },
        },
        {
            name: "Name (Z-A)",
            sort: "nameDesc",
            onClick: () => {
                albums.update(
                    sort({
                        key: "name",
                        type: "text",
                        direction: "desc",
                    })
                );
            },
        },
        {
            name: "Artist Name (A-Z)",
            sort: "artistAsc",
            onClick: () => {
                albums.update(
                    sort({
                        key: "artist.name" as any,
                        type: "text",
                        direction: "asc",
                    })
                );
            },
        },
        {
            name: "Artist Name (Z-A)",
            sort: "artistDesc",
            onClick: () => {
                albums.update(
                    sort({
                        key: "artist.name" as any,
                        type: "text",
                        direction: "desc",
                    })
                );
            },
        },
        {
            name: "Published Year (Old-New)",
            sort: "publishedYearAsc",
            onClick: () => {
                albums.update(
                    sort({
                        key: "publishedYear",
                        type: "text",
                        direction: "asc",
                    })
                );
            },
        },
        {
            name: "Published Year (New-Old)",
            sort: "publishedYearDesc",
            onClick: () => {
                albums.update(
                    sort({
                        key: "publishedYear",
                        type: "text",
                        direction: "desc",
                    })
                );
            },
        },
        {
            name: "Date Added (Old-New)",
            sort: "createdAtAsc",
            onClick: () => {
                albums.update(
                    sort({
                        key: "createdAt",
                        type: "text",
                        direction: "asc",
                    })
                );
            },
        },
        {
            name: "Date Added (New-Old)",
            sort: "createdAtDesc",
            onClick: () => {
                albums.update(
                    sort({
                        key: "createdAt",
                        type: "text",
                        direction: "desc",
                    })
                );
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
