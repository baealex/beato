<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import Loading from "../components/Loading.svelte";
    import Select from "../components/Select.svelte";

    import { socket } from "../modules/socket";
    import { toast } from "../modules/ui/toast";
    import { confirm } from "../modules/ui/confirm";

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

    const handleClickSyncMusic = async (force: boolean) => {
        if (
            force &&
            !(await confirm(
                "Please only proceed with the update if it is recommended by the developer. Are you sure you want to proceed?"
            ))
        ) {
            return;
        }
        isLoading = true;
        socket.emit("sync-music", { force });
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
        <div>
            <button on:click={() => handleClickSyncMusic(false)}>Start</button>
            <button on:click={() => handleClickSyncMusic(true)}
                >Force Start</button
            >
            <div />
        </div>
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
        <p>Something wrong?</p>
        <button on:click={handleClickRefreshApp}>Try Refresh</button>
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
