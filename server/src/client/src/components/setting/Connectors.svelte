<script lang="ts">
    import { onDestroy, onMount } from "svelte";

    import { socket } from "~/socket";

    let connectors: {
        id: string;
        userAgent: string;
        connectedAt: number;
    }[] = [];

    onMount(() => {
        socket.emit("get-connectors");

        socket.on("get-connectors", (connectorsData) => {
            connectors = connectorsData;
        });
    });

    onDestroy(() => {
        socket.off("get-connectors");
    });
</script>

{#each connectors as connector, idx}
    <div class="connector">
        {idx + 1}. {connector.userAgent}
        <span class="date">
            {new Date(connector.connectedAt).toLocaleString()}
        </span>
        {#if connector.id === socket.id}
            <span class="this-device">This device</span>
        {:else}
            <button
                class="dark-button"
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

<style lang="scss">
    .connector {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        font-size: 0.825rem;
        gap: 0.5rem;
    }

    .date {
        font-size: 0.825rem;
        color: #999;
    }

    .this-device {
        padding: 0.25rem 0.5rem;
        border-radius: 0.5rem;
        background-color: #333;
        font-size: 0.75rem;
        color: #eee;
    }
</style>
