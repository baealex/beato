<script lang="ts">
    import { Left } from "~/icons";

    import { createUUID } from "~/modules/uuid";

    import { layerPopState } from "~/store";

    let id = createUUID();
    export let isOpen = false;
    export let hasHeader = true;
    export let onClose: () => void = null;

    const handlePopState = (e: PopStateEvent) => {
        if (layerPopState.at(-1) !== id || e.state === id) {
            return;
        }
        layerPopState.pop();
        isOpen = false;
        onClose?.();
    };

    const handleClose = () => {
        isOpen = false;
        onClose?.();
    };

    $: {
        if (isOpen) {
            layerPopState.push(id);
            window.addEventListener("popstate", handlePopState);
        } else {
            layerPopState.back(id);
            window.removeEventListener("popstate", handlePopState);
        }
    }
</script>

<div class="sub-page" class:open={isOpen}>
    {#if hasHeader}
        <div class="header">
            <button on:click={handleClose}>
                <Left />
            </button>
        </div>
    {/if}
    <div class="content">
        <slot />
    </div>
</div>

<style lang="scss">
    @keyframes slide-in {
        from {
            opacity: 0;
            transform: translateY(100%);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .sub-page {
        background-color: #000;
        position: fixed;
        display: none;
        flex-direction: column;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 100;

        &.open {
            display: flex;
            animation: slide-in 0.3s ease-in-out;
        }
    }

    .content {
        display: flex;
        flex-direction: column;
        flex: 1;
        overflow-y: auto;
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 1rem;
        height: 60px;
        background-color: #111;
        color: #fff;
        font-size: 1.2rem;
        font-weight: bold;
        border-bottom: 1px solid #333;

        button {
            background-color: transparent;
            border: none;
            color: inherit;
            cursor: pointer;
            display: flex;
            align-items: center;

            :global(svg) {
                width: 1.25rem;
                height: 1.25rem;
            }
        }
    }
</style>
