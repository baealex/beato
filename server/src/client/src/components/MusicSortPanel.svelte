<script lang="ts">
    import BottomPanel from "../components/BottomPanel.svelte";
    import List from "../icons/List.svelte";

    import { musics, musicSortPanel } from "../store";

    $: isOpen = $musicSortPanel.isOpen;
    $: latestSort = $musicSortPanel.latestSort;
</script>

<BottomPanel
    {isOpen}
    onClose={() =>
        musicSortPanel.update((state) => ({ ...state, isOpen: false }))}
>
    <ul class="items">
        <li class:active={latestSort === "playCountAsc"}>
            <button
                class="clickable item"
                on:click={() => {
                    musics.update((musics) => {
                        musics.sort((a, b) => b.playCount - a.playCount);
                        return musics;
                    });
                    musicSortPanel.update(() => ({
                        isOpen: false,
                        latestSort: "playCountAsc",
                    }));
                }}
            >
                <List />
                Play Count (High-Low)
            </button>
        </li>
        <li class:active={latestSort === "playCountDesc"}>
            <button
                class="clickable item"
                on:click={() => {
                    musics.update((musics) => {
                        musics.sort((a, b) => a.playCount - b.playCount);
                        return musics;
                    });
                    musicSortPanel.update(() => ({
                        isOpen: false,
                        latestSort: "playCountDesc",
                    }));
                }}
            >
                <List />
                Play Count (Low-High)
            </button>
        </li>
        <li class:active={latestSort === "nameAsc"}>
            <button
                class="clickable item"
                on:click={() => {
                    musics.update((musics) => {
                        musics.sort((a, b) => a.name.localeCompare(b.name));
                        return musics;
                    });
                    musicSortPanel.update(() => ({
                        isOpen: false,
                        latestSort: "nameAsc",
                    }));
                }}
            >
                <List />
                Name (A-Z)
            </button>
        </li>
        <li class:active={latestSort === "nameDesc"}>
            <button
                class="clickable item"
                on:click={() => {
                    musics.update((musics) => {
                        musics.sort((a, b) => b.name.localeCompare(a.name));
                        return musics;
                    });
                    musicSortPanel.update(() => ({
                        isOpen: false,
                        latestSort: "nameDesc",
                    }));
                }}
            >
                <List />
                Name (Z-A)
            </button>
        </li>
        <li class:active={latestSort === "artistAsc"}>
            <button
                class="clickable item"
                on:click={() => {
                    musics.update((musics) => {
                        musics.sort((a, b) =>
                            a.artist.name.localeCompare(b.artist.name)
                        );
                        return musics;
                    });
                    musicSortPanel.update(() => ({
                        isOpen: false,
                        latestSort: "artistAsc",
                    }));
                }}
            >
                <List />
                Artist (A-Z)
            </button>
        </li>
        <li class:active={latestSort === "artistDesc"}>
            <button
                class="clickable item"
                on:click={() => {
                    musics.update((musics) => {
                        musics.sort((a, b) =>
                            b.artist.name.localeCompare(a.artist.name)
                        );
                        return musics;
                    });
                    musicSortPanel.update(() => ({
                        isOpen: false,
                        latestSort: "artistDesc",
                    }));
                }}
            >
                <List />
                Artist (Z-A)
            </button>
        </li>
        <li class:active={latestSort === "createdAtAsc"}>
            <button
                class="clickable item"
                on:click={() => {
                    musics.update((musics) => {
                        musics.sort((a, b) => a.createdAt - b.createdAt);
                        return musics;
                    });
                    musicSortPanel.update(() => ({
                        isOpen: false,
                        latestSort: "createdAtAsc",
                    }));
                }}
            >
                <List />
                Date Added (Old-New)
            </button>
        </li>
        <li class:active={latestSort === "createdAtDesc"}>
            <button
                class="clickable item"
                on:click={() => {
                    musics.update((musics) => {
                        musics.sort((a, b) => b.createdAt - a.createdAt);
                        return musics;
                    });
                    musicSortPanel.update(() => ({
                        isOpen: false,
                        latestSort: "createdAtDesc",
                    }));
                }}
            >
                <List />
                Date Added (New-Old)
            </button>
        </li>
        <li class:active={latestSort === "durationAsc"}>
            <button
                class="clickable item"
                on:click={() => {
                    musics.update((musics) => {
                        musics.sort((a, b) => a.duration - b.duration);
                        return musics;
                    });
                    musicSortPanel.update(() => ({
                        isOpen: false,
                        latestSort: "durationAsc",
                    }));
                }}
            >
                <List />
                Duration (Short-Long)
            </button>
        </li>
        <li class:active={latestSort === "durationDesc"}>
            <button
                class="clickable item"
                on:click={() => {
                    musics.update((musics) => {
                        musics.sort((a, b) => b.duration - a.duration);
                        return musics;
                    });
                    musicSortPanel.update(() => ({
                        isOpen: false,
                        latestSort: "durationDesc",
                    }));
                }}
            >
                <List />
                Duration (Long-Short)
            </button>
        </li>
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

            @media (hover: hover) {
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
