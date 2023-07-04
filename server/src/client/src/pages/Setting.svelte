<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import Loading from "../components/Loading.svelte";

    import { socket } from "../modules/socket";
    import { toast } from "../modules/ui/toast";

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
</script>

<div class="continer">
    <section>
        <p>Sync music from server</p>
        <button on:click={handleClickSyncMusic}>Start</button>
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
        border: 1px solid #333;
        padding: 0.5rem 1rem;
        border-radius: 1rem;
        margin-bottom: 1rem;
    }
</style>
