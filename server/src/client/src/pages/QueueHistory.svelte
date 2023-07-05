<script lang="ts">
    import Image from "../components/Image.svelte";

    import { resetQueue, queueHistory } from "../store";
</script>

<div class="help">Last 20 queues are saved on this device.</div>
<ul>
    {#each $queueHistory as queue}
        <li>
            <button
                class="clickable item"
                on:click={() => resetQueue(queue.title, queue.items)}
            >
                {#if queue.items.length >= 4}
                    <div class="album-cover-grid">
                        {#each queue.items.slice(0, 4) as music}
                            <Image src={music.album.cover} alt="Album cover" />
                        {/each}
                    </div>
                {/if}
                {#if queue.items.length < 4}
                    <div class="album-cover">
                        <Image
                            src={queue.items?.[0]?.album.cover}
                            alt="Album cover"
                        />
                    </div>
                {/if}
                <div class="info">
                    <div class="title">
                        {queue.title}
                    </div>
                    <div class="song-count">
                        {queue.items.length} Songs
                    </div>
                </div>
            </button>
        </li>
    {/each}
</ul>

<style lang="scss">
    .help {
        color: #aaa;
        font-size: 0.8rem;
        padding: 1rem;
    }

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .item {
        color: #eee;
        font-size: 0.8rem;
        cursor: pointer;
        padding: 1rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
        width: 100%;

        @media (min-width: 1024px) {
            &:hover {
                background-color: rgba(255, 255, 255, 0.1);
            }
        }

        .title {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 0.25rem;
        }

        .song-count {
            font-size: 0.875rem;
            color: #aaa;
        }
    }

    .album-cover-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 1fr);
        width: 60px;
        height: 60px;

        :global(img) {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .album-cover {
        width: 60px;
        height: 60px;

        :global(img) {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
</style>
