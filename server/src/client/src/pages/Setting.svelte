<script lang="ts">
    import Beato from "../components/Beato.svelte";
    import { socket } from "../modules/socket";
    import { toast } from "../modules/ui/toast";

    let blockScreen = false;

    const handleClickSyncMusic = () => {
        blockScreen = true;
        socket.emit("sync-music");
    };

    socket.on("sync-music", (state: "done" | "error") => {
        if (state === "done") {
            toast("Sync music done");
        } else {
            toast("Sync music error");
        }
        blockScreen = false;
    });
</script>

<div class="continer">
    <h1>Setting</h1>
    <section>
        <p>Sync music from your server :</p>
        <button on:click={handleClickSyncMusic}>Start</button>
    </section>

    {#if blockScreen}
        <div class="screen-block">
            <Beato spin={true} />
            <div>Syncing...</div>
        </div>
    {/if}
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

    .screen-block {
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 9999;
        backdrop-filter: blur(20px);
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 3rem;
    }
</style>
