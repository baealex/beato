<script lang="ts">
    import { createUUID } from "../modules/uuid";

    export let id = createUUID();
    export let title = "";
    export let isOpen = false;
    export let onClose: () => void = null;

    const handleClose = (e?: PopStateEvent) => {
        if (e?.state === id) {
            return;
        }
        if (!e) {
            history.back();
        }
        isOpen = false;
        onClose?.();
    };

    $: {
        if (isOpen) {
            history.pushState(id, null, `#${id}`);
            window.addEventListener("popstate", handleClose);
        } else {
            window.removeEventListener("popstate", handleClose);
        }
    }
</script>

<div class="wrapper" class:open={isOpen}>
    <button
        class="clickable backdrop"
        class:open={isOpen}
        on:click={() => handleClose()}
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
