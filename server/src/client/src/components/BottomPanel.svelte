<script lang="ts">
    export let isOpen = false;
</script>

<div class="wrapper" class:open={isOpen}>
    <button
        class="clickable backdrop"
        class:open={isOpen}
        on:click={() => (isOpen = false)}
    />
    <div class="bottom-panel" class:open={isOpen}>
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
        padding: 32px 16px;
        border-radius: 16px 16px 0 0;
        background-color: #151515;
        z-index: 100;
        transform: translateY(100%);
        transition: transform 0.2s ease-in-out;

        &.open {
            transform: translateY(0);
        }
    }
</style>
