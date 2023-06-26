<script lang="ts">
    export let isOpen = false;
</script>

<div class="sub-page" class:open={isOpen}>
    <slot />
</div>

<style lang="scss">
    .sub-page {
        opacity: 0;
        transform: translateY(100%);
        background-color: rgba(0, 0, 0, 0.95);
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
</style>
