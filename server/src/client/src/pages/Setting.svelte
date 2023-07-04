<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import Loading from "../components/Loading.svelte";

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

    const handleChangePlayMode = (e: Event) => {
        queue.update((state) => ({
            ...state,
            playMode: (e.target as HTMLSelectElement).value as QueuePlayMode,
        }));
    };

    const handleChangeQueueMode = (e: Event) => {
        queue.update((state) => ({
            ...state,
            insertMode: (e.target as HTMLSelectElement)
                .value as QueueInsertMode,
        }));
    };
</script>

<div class="continer">
    <section>
        <p>Sync music from server</p>
        <button on:click={handleClickSyncMusic}>Start</button>
    </section>
    <section>
        <p>When you click on a music</p>
        <div class="flex-row">
            <select value={$queue.playMode} on:change={handleChangePlayMode}>
                <option value="later">Play later</option>
                <option value="immediate">Play immediately</option>
            </select>
            <select value={$queue.insertMode} on:change={handleChangeQueueMode}>
                <option value="after">
                    Add to queue after current music
                </option>
                <option value="before">
                    Add to queue before current music
                </option>
                <option value="last">Add to queue at the end</option>
            </select>
        </div>
    </section>
    <section>
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
        justify-content: space-between;
        gap: 0.5rem;
        border-bottom: 1px solid #212121;
        padding: 0.5rem 1rem;
        margin-bottom: 1rem;
        flex-wrap: wrap;
    }

    .flex-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        max-width: 100%;
        gap: 0.5rem;
    }

    select {
        padding: 0.5rem 1rem;
        max-width: 100%;
        border-radius: 0.5rem;
        border: 1px solid #333;
        background-color: #000;
        color: #eee;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
</style>
