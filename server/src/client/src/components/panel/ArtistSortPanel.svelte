<script lang="ts">
    import { BottomPanel } from "~/components";

    import { List } from "~/icons";

    import { artists, artistSortPanel } from "~/store";

    import { shuffle } from "~/modules/shuffle";
    import { sort } from "~/modules/sort";

    $: isOpen = $artistSortPanel.isOpen;
    $: latestSort = $artistSortPanel.latestSort;

    const sortItems = [
        {
            name: "Name (A-Z)",
            sort: "nameAsc",
            onClick: () => {
                artists.update(
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
                artists.update(
                    sort({
                        key: "name",
                        type: "text",
                        direction: "desc",
                    })
                );
            },
        },
        {
            name: "Song Count (Low-High)",
            sort: "songCountAsc",
            onClick: () => {
                artists.update(
                    sort({
                        key: "musicCount",
                        type: "number",
                        direction: "asc",
                    })
                );
            },
        },
        {
            name: "Song Count (High-Low)",
            sort: "songCountDesc",
            onClick: () => {
                artists.update(
                    sort({
                        key: "musicCount",
                        type: "number",
                        direction: "desc",
                    })
                );
            },
        },
        {
            name: "Album Count (Low-High)",
            sort: "albumCountAsc",
            onClick: () => {
                artists.update(
                    sort({
                        key: "albumCount",
                        type: "number",
                        direction: "asc",
                    })
                );
            },
        },
        {
            name: "Album Count (High-Low)",
            sort: "albumCountDesc",
            onClick: () => {
                artists.update(
                    sort({
                        key: "albumCount",
                        type: "number",
                        direction: "desc",
                    })
                );
            },
        },
        {
            name: "Date Added (Old-New)",
            sort: "createdAtAsc",
            onClick: () => {
                artists.update(
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
                artists.update(
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
