<script lang="ts">
    import { BottomPanel } from "~/components";

    import { List } from "~/icons";

    import { musics, musicSortPanel } from "~/store";

    import { shuffle } from "~/modules/shuffle";
    import { sort } from "~/modules/sort";

    $: isOpen = $musicSortPanel.isOpen;
    $: latestSort = $musicSortPanel.latestSort;

    const sortItems = [
        {
            name: "Name (A-Z)",
            sort: "nameAsc",
            onClick: () => {
                musics.update(
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
                musics.update(
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
                musics.update(
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
                musics.update(
                    sort({
                        key: "artist.name" as any,
                        type: "text",
                        direction: "desc",
                    })
                );
            },
        },
        {
            name: "Play Count (Low-High)",
            sort: "playCountAsc",
            onClick: () => {
                musics.update(
                    sort({
                        key: "playCount",
                        type: "number",
                        direction: "asc",
                    })
                );
            },
        },
        {
            name: "Play Count (High-Low)",
            sort: "playCountDesc",
            onClick: () => {
                musics.update(
                    sort({
                        key: "playCount",
                        type: "number",
                        direction: "desc",
                    })
                );
            },
        },
        {
            name: "Duration (Short-Long)",
            sort: "durationAsc",
            onClick: () => {
                musics.update(
                    sort({
                        key: "duration",
                        type: "number",
                        direction: "asc",
                    })
                );
            },
        },
        {
            name: "Duration (Long-Short)",
            sort: "durationDesc",
            onClick: () => {
                musics.update(
                    sort({
                        key: "duration",
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
                musics.update(
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
                musics.update(
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
                musics.update(shuffle);
            },
        },
    ] as const;
</script>

<BottomPanel
    title="Sort By"
    {isOpen}
    onClose={() =>
        musicSortPanel.update((state) => ({ ...state, isOpen: false }))}
>
    <ul class="items">
        {#each sortItems as sortItem}
            <li class:active={latestSort === sortItem.sort}>
                <button
                    class="clickable item"
                    on:click={() => {
                        sortItem.onClick();
                        musicSortPanel.update(() => ({
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
