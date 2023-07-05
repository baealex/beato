<script lang="ts">
    import PlaylistItem from "../components/PlaylistItem.svelte";

    import { confirm } from "../modules/ui/confirm";

    import { resetQueue, queueHistory } from "../store";
</script>

<div class="help">Last 20 queues are saved on this device.</div>
<ul>
    {#each $queueHistory as queue}
        <li>
            <PlaylistItem
                name={queue.title}
                items={queue.items}
                itemCount={queue.items.length}
                onClick={() => {
                    confirm("The playlist will be replaced with this.", {
                        onConfirm: () => {
                            resetQueue(queue.title, queue.items);
                        },
                    });
                }}
            />
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
</style>
