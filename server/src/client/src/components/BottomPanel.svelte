<script lang="ts">
    import { createUUID } from "../modules/uuid";
    import { layerPopState } from "../store";

    let id = createUUID();
    export let title = "";
    export let isOpen = false;
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

<div class="wrapper" class:open={isOpen}>
    <button
        class="clickable backdrop"
        class:open={isOpen}
        on:click={handleClose}
    />
    <div class="bottom-panel" class:open={isOpen}>
        {#if title}
            <div class="panel-title">{title}</div>
        {/if}
        <slot />
    </div>
</div>

<style lang="scss">
    .wrapper {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        z-index: 110;
        opacity: 0;
        pointer-events: none;
        background-color: rgba(0, 0, 0, 0.88);
        transition: opacity 0.2s ease-in-out;

        &.open {
            pointer-events: all;
            opacity: 1;
        }
    }

    .backdrop {
        width: 100%;
        flex: 1;
    }

    .bottom-panel {
        width: 100%;
        height: fit-content;
        max-height: 80%;
        overflow-y: auto;
        padding: 32px 16px 16px;
        border-radius: 16px 16px 0 0;
        background-color: #151515;
        z-index: 100;
        transform: translateY(100%);
        transition: transform 0.2s ease-in-out;

        &.open {
            transform: translateY(0);
        }
    }

    .panel-title {
        font-size: 0.875rem;
        color: #888;
    }
</style>
