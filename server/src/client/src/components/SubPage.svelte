<script lang="ts">
    import Left from "../icons/Left.svelte";

    import { createUUID } from "../modules/uuid";

    export let id = createUUID();
    export let isOpen = false;
    export let hasHeader = true;
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

<div class="sub-page" class:open={isOpen}>
    {#if hasHeader}
        <div class="header">
            <button on:click={() => handleClose()}>
                <Left />
            </button>
        </div>
    {/if}
    <div class="content">
        <slot />
    </div>
</div>

<style lang="scss">
    .sub-page {
        opacity: 0;
        transform: translateY(100%);
        background-color: #000;
        position: fixed;
        display: flex;
        flex-direction: column;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 100;
        transition: all 0.3s ease-in-out;

        &.open {
            opacity: 1;
            transform: translateY(0);
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
