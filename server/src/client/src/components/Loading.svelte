<script lang="ts">
    import Beato from "./Beato.svelte";

    export let isLoading = false;
    export let message = "";
</script>

{#if isLoading}
    <div class="loading">
        <Beato spin />
        <div>{message}</div>
    </div>
{/if}

<style>
    .loading {
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
