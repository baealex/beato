<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import Loading from "../components/Loading.svelte";
    import Select from "../components/Select.svelte";

    import { socket } from "../modules/socket";
    import { toast } from "../modules/ui/toast";

    import { queue } from "../store";
    import type { QueueInsertMode, QueuePlayMode } from "../store";

    let isLoading = false;
    let message = "";

    onMount(() => {
        socket.on("sync-music", (serverMessage: string | "done" | "error") => {
            if (serverMessage === "done" || serverMessage === "error") {
                isLoading = false;
                if (serverMessage === "done") {
                    toast("Music sync completed");
                } else if (serverMessage === "error") {
                    toast("Error while syncing music");
                }
            }
            message = serverMessage;
        });
    });

    onDestroy(() => {
        socket.off("sync-music");
    });

    const handleClickSyncMusic = () => {
        isLoading = true;
        socket.emit("sync-music");
    };

    const handleClickRefreshApp = () => {
        location.reload();
    };

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

<div class="continer">
    <section style="justify-content: space-between;">
        <p>Sync music from server</p>
        <button on:click={handleClickSyncMusic}>Start</button>
    </section>
    <section>
        <p>When you press the music, the music will</p>
        <Select
            title="The music will..."
            value={$queue.playMode}
            onChange={handleChangePlayMode}
            options={[
                { value: "later", label: "Play later" },
                { value: "immediate", label: "Play immediately" },
            ]}
        />
        and
        <Select
            title="The music will..."
            value={$queue.insertMode}
            onChange={handleChangeQueueMode}
            options={[
                {
                    value: "after",
                    label: "Add to queue after current music",
                },
                {
                    value: "before",
                    label: "Add to queue before current music",
                },
                { value: "last", label: "Add to queue at the end" },
            ]}
        />
    </section>
    <section style="justify-content: space-between;">
        <p>Something wrong? Try refresh</p>
        <button on:click={handleClickRefreshApp}>Ok</button>
    </section>

    <Loading {isLoading} {message} />
</div>

<style lang="scss">
    .continer {
        padding: 1rem 0.5rem;
    }

    button {
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        border: 1px solid #333;
        background-color: #000;
        color: #eee;
    }

    section {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
        border-bottom: 1px solid #212121;
        padding: 1rem;
        flex-wrap: wrap;
    }
</style>
