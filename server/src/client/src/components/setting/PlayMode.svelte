<script lang="ts">
    import { Select } from "~/components";

    import { queue } from "~/store";

    import type { QueueInsertMode, QueuePlayMode } from "~/store";

    const handleChangePlayMode = (value: QueuePlayMode) => {
        queue.update((state) => ({
            ...state,
            playMode: value,
        }));
    };

    const handleChangeQueueMode = (value: QueueInsertMode) => {
        queue.update((state) => ({
            ...state,
            insertMode: value,
        }));
    };
</script>

<p>When you add music to the queue, it will...</p>
<div class="buttons">
    <Select
        title="It will..."
        value={$queue.playMode}
        onChange={handleChangePlayMode}
        options={[
            { value: "later", label: "Play later" },
            { value: "immediate", label: "Play immediately" },
        ]}
    />
    <Select
        title="It will..."
        value={$queue.insertMode}
        onChange={handleChangeQueueMode}
        options={[
            {
                value: "after",
                label: "Added after the current music",
            },
            {
                value: "before",
                label: "Added before the current music",
            },
            {
                value: "last",
                label: "Added at the end of the queue",
            },
        ]}
    />
</div>

<style>
    .buttons {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 0.5rem;
    }
</style>
