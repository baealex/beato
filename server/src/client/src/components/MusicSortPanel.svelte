<script lang="ts">
    import BottomPanel from "../components/BottomPanel.svelte";
    import List from "../icons/List.svelte";

    import { musics, musicSortPanel } from "../store";

    import { shuffle } from "../modules/shuffle";

    $: isOpen = $musicSortPanel.isOpen;
    $: latestSort = $musicSortPanel.latestSort;

    let sortItems = [
        {
            name: "Name (A-Z)",
            sort: "nameAsc",
            onClick: () => {
                musics.update((musics) => {
                    musics.sort((a, b) => a.name.localeCompare(b.name));
                    return musics;
                });
            },
        },
        {
            name: "Name (Z-A)",
            sort: "nameDesc",
            onClick: () => {
                musics.update((musics) => {
                    musics.sort((a, b) => b.name.localeCompare(a.name));
                    return musics;
                });
            },
        },
        {
            name: "Artist Name (A-Z)",
            sort: "artistAsc",
            onClick: () => {
                musics.update((musics) => {
                    musics.sort((a, b) =>
                        a.artist.name.localeCompare(b.artist.name)
                    );
                    return musics;
                });
            },
        },
        {
            name: "Artist Name (Z-A)",
            sort: "artistDesc",
            onClick: () => {
                musics.update((musics) => {
                    musics.sort((a, b) =>
                        b.artist.name.localeCompare(a.artist.name)
                    );
                    return musics;
                });
            },
        },
        {
            name: "Play Count (Low-High)",
            sort: "playCountAsc",
            onClick: () => {
                musics.update((musics) => {
                    musics.sort((a, b) => a.playCount - b.playCount);
                    return musics;
                });
            },
        },
        {
            name: "Play Count (High-Low)",
            sort: "playCountDesc",
            onClick: () => {
                musics.update((musics) => {
                    musics.sort((a, b) => b.playCount - a.playCount);
                    return musics;
                });
            },
        },
        {
            name: "Duration (Short-Long)",
            sort: "durationAsc",
            onClick: () => {
                musics.update((musics) => {
                    musics.sort((a, b) => a.duration - b.duration);
                    return musics;
                });
            },
        },
        {
            name: "Duration (Long-Short)",
            sort: "durationDesc",
            onClick: () => {
                musics.update((musics) => {
                    musics.sort((a, b) => b.duration - a.duration);
                    return musics;
                });
            },
        },
        {
            name: "Date Added (Old-New)",
            sort: "createdAtAsc",
            onClick: () => {
                musics.update((musics) => {
                    musics.sort((a, b) =>
                        a.createdAt.localeCompare(b.createdAt)
                    );
                    return musics;
                });
            },
        },
        {
            name: "Date Added (New-Old)",
            sort: "createdAtDesc",
            onClick: () => {
                musics.update((musics) => {
                    musics.sort((a, b) =>
                        b.createdAt.localeCompare(a.createdAt)
                    );
                    return musics;
                });
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
