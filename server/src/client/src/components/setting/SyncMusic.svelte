<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import { confirm, toast } from "@baejino/ui";

    import { socket } from "~/socket";

    let isLoading = false;
    let message = "";

    onMount(() => {
        socket.on("sync-music", (serverMessage: string | "done" | "error") => {
            if (serverMessage === "done" || serverMessage === "error") {
                isLoading = false;
                if (serverMessage === "done") {
                    toast("Completed sync music");
                } else if (serverMessage === "error") {
                    toast("Error while sync music");
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
</script>

<p>Synchronize the music with your server</p>
{#if isLoading}
    <p class="message">{message}</p>
{/if}
<div class="buttons">
    {#if isLoading}
        <button class="dark-button" disabled={isLoading}>Syncing...</button>
    {:else}
        <button
            class="dark-button"
            on:click={() => handleClickSyncMusic(false)}
        >
            Start
        </button>
        <button class="dark-button" on:click={() => handleClickSyncMusic(true)}>
            Force Start
        </button>
    {/if}
</div>

<style lang="scss">
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
</style>
