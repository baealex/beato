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
            console.log(layerPopState.get());
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
    @keyframes fade-in {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @keyframes slide-in {
        from {
            transform: translateY(100%);
        }
        to {
            transform: translateY(0);
        }
    }

    .wrapper {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: none;
        flex-direction: column;
        z-index: 110;
        pointer-events: none;
        background-color: rgba(0, 0, 0, 0.88);

        &.open {
            pointer-events: all;
            display: flex;
            animation: fade-in 0.2s ease-in-out;
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

        &.open {
            animation: slide-in 0.2s ease-in-out;
        }
    }

    .panel-title {
        font-size: 0.875rem;
        color: #888;
    }
</style>
