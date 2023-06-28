<script lang="ts">
    import Loading from "../components/Loading.svelte";

    import { socket } from "../modules/socket";
    import { toast } from "../modules/ui/toast";
    import { syncData } from "../store";

    let isLoading = false;
    let message = "";

    const handleClickSyncMusic = () => {
        isLoading = true;
        socket.emit("sync-music");
    };

    socket.on("sync-music", (serverMessage: string | "done" | "error") => {
        if (serverMessage === "done" || serverMessage === "error") {
            message = "Almost done..!";
            syncData(() => {
                isLoading = false;
                if (serverMessage === "done") {
                    toast("Done syncing music");
                } else if (serverMessage === "error") {
                    toast("Error syncing music");
                }
            });
            return;
        }

        message = serverMessage;
    });
</script>

<div class="continer">
    <h1>Setting</h1>
    <section>
        <p>Sync music from your server :</p>
        <button on:click={handleClickSyncMusic}>Start</button>
    </section>

    <Loading {isLoading} {message} />
</div>

<style lang="scss">
    .continer {
        padding: 0.5rem;
    }

    button {
        padding: 0.5rem;
        border-radius: 0.5rem;
        border: 1px solid #333;
        background-color: #000;
        color: #eee;
        cursor: pointer;
    }

    section {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
    }
</style>
