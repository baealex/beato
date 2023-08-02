<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import { confirm, toast } from "@baejino/ui";

    import { Select } from "~/components";

    import { socket } from "~/socket";

    import { queue } from "~/store";
    import type { QueueInsertMode, QueuePlayMode } from "~/store";

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
    <h3>Synchronization</h3>
    <section>
        <p>Synchronize the music with your server</p>
        {#if isLoading}
            <p class="message">{message}</p>
        {/if}
        <div class="buttons">
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
    <h3>Play Mode</h3>
    <section>
        When you add music to the queue, it will...
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
                        label: "Be added after the current music",
                    },
                    {
                        value: "before",
                        label: "Be added before the current music",
                    },
                    {
                        value: "last",
                        label: "Be added at the end of the queue",
                    },
                ]}
            />
        </div>
    </section>
    <h3>Connectors</h3>
    <section style="align-items: flex-start;">
        {#each connectors as connector, idx}
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
                {idx + 1}. {connector.userAgent}
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
    <h3>Have a problem?</h3>
    <section style="justify-content: space-between;">
        <div>
            <button on:click={handleClickRefreshApp}>Try Refresh</button>
        </div>
    </section>
</div>

<style lang="scss">
    .continer {
        padding: 1rem;
    }

    h3 {
        font-size: 1rem;
        font-weight: 600;
        color: #656565;
        margin: 2rem 0 0;
    }

    .message {
        font-size: 0.825rem;
        color: #999;
    }

    .buttons {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 0.5rem;
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
        flex-direction: column;
        gap: 0.5rem;
        border-bottom: 1px solid #222;
        padding: 1rem 0 2rem;
    }
</style>
