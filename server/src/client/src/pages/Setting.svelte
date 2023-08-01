<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import { confirm, toast } from "@baejino/ui";

    import { Select } from "~/components";

    import { socket } from "../socket";

    import { queue } from "../store";
    import type { QueueInsertMode, QueuePlayMode } from "../store";
    import Beato from "~/components/Beato.svelte";

    let isLoading = false;
    let message = "";
    let connectors: {
        id: string;
        userAgent: string;
        connectedAt: number;
    }[] = [];

    onMount(() => {
        socket.on("sync-music", (serverMessage: string | "done" | "error") => {
            if (serverMessage === "done" || serverMessage === "error") {
                isLoading = false;
                if (serverMessage === "done") {
                    toast("Completed syncing music");
                } else if (serverMessage === "error") {
                    toast("Error while syncing music");
                }
            }
            message = serverMessage;
        });

        socket.emit("get-connectors");

        socket.on("get-connectors", (connectorsData) => {
            connectors = connectorsData;
        });
    });

    onDestroy(() => {
        socket.off("sync-music");
        socket.off("get-connectors");
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
        <div>
            <p>Sync music from server</p>
            {#if isLoading}
                <p class="message">{message}</p>
            {/if}
        </div>
        <div>
            {#if isLoading}
                <button disabled={isLoading}>Syncing...</button>
            {:else}
                <button on:click={() => handleClickSyncMusic(false)}>
                    Start
                </button>
                <button on:click={() => handleClickSyncMusic(true)}>
                    Force Start
                </button>
            {/if}
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
    <section
        style="
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
        "
    >
        <p>Connectors</p>
        {#each connectors as connector}
            <div
                style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    font-size: 0.825rem;
                    gap: 0.5rem;
                "
            >
                {connector.userAgent}
                <span
                    style="
                        font-size: 0.825rem;
                        color: #999;
                    "
                >
                    {new Date(connector.connectedAt).toLocaleString()}
                </span>
                {#if connector.id === socket.id}
                    <span
                        style="
                            padding: 0.25rem 0.5rem;
                            border-radius: 0.5rem;
                            background-color: #333;
                            font-size: 0.75rem;
                            color: #eee;
                        "
                    >
                        This device
                    </span>
                {:else}
                    <button
                        style="padding: 0.25rem 0.5rem;"
                        on:click={() =>
                            socket.emit("disconnect-connector", {
                                id: connector.id,
                            })}
                    >
                        Disconnect
                    </button>
                {/if}
            </div>
        {/each}
    </section>
    <section style="justify-content: space-between;">
        <p>Something wrong?</p>
        <button on:click={handleClickRefreshApp}>Try Refresh</button>
    </section>
</div>

<style lang="scss">
    .continer {
        padding: 1rem 0.5rem;
    }

    .message {
        font-size: 0.825rem;
        color: #999;
    }

    button {
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        font-size: 0.825rem;
        border: 1px solid #333;
        background-color: #000;
        color: #eee;

        &:disabled {
            opacity: 0.5;
        }
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
