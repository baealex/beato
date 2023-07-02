<script lang="ts">
    export let onClick: () => void;
    export let menus: { label: string; onClick: () => void }[] = [];

    let clientWidth = 0;
    let accX = 0;
    let accY = 0;
    let lastX = 0;
    let lastY = 0;
    let isDown = false;
    let el: HTMLDivElement;
    let menu: HTMLDivElement;

    const getClientX = (e: MouseEvent | TouchEvent) => {
        if (e instanceof MouseEvent) {
            return e.clientX;
        } else {
            return e.changedTouches[0].clientX;
        }
    };

    const getClientY = (e: MouseEvent | TouchEvent) => {
        if (e instanceof MouseEvent) {
            return e.clientY;
        } else {
            return e.changedTouches[0].clientY;
        }
    };

    const handleFocusIn = (e: MouseEvent | TouchEvent) => {
        isDown = true;
        lastX = getClientX(e);
        lastY = getClientY(e);
        clientWidth = (e.target as HTMLDivElement).clientWidth;
    };

    const handleFocusOut = () => {
        if (isDown) {
            if (Math.abs(accX) < 10 && Math.abs(accY) < 10) {
                onClick();
            }

            if (accX <= -menus.length * 80) {
                el.style.transform = `translate(-${menus.length * 80}px)`;
                menu.style.transform = `translate(-${menus.length * 80}px)`;
            } else {
                el.style.transform = "translate(0px)";
                menu.style.transform = "translate(0px)";
            }
        }

        isDown = false;
        accX = 0;
        accY = 0;
        lastX = 0;
    };

    const handleMove = (e: MouseEvent | TouchEvent) => {
        if (isDown) {
            const clientX = getClientX(e);
            const clientY = getClientY(e);

            accX += clientX - lastX;
            accY += clientY - lastY;
            lastX = clientX;
            lastY = clientY;

            if (accX < 0 && accX > -menus.length * 80) {
                e.preventDefault();
                el.style.transform = `translate(${accX}px)`;
                menu.style.transform = `translate(${accX}px)`;
            }
        }
    };

    const handleClickMenu = (onClick: () => void) => {
        onClick();
        el.style.transform = "translate(0px)";
        menu.style.transform = "translate(0px)";
    };
</script>

<div
    class="swipe-card"
    tabindex="0"
    role="slider"
    aria-valuenow={accX}
    on:mousedown={handleFocusIn}
    on:touchstart={handleFocusIn}
    on:mouseup={handleFocusOut}
    on:touchend={handleFocusOut}
    on:mousemove={handleMove}
    on:touchmove={handleMove}
>
    <div
        class="menu"
        tabindex="0"
        role="button"
        bind:this={menu}
        on:mousedown={(e) => e.stopPropagation()}
        on:touchstart={(e) => e.stopPropagation()}
    >
        {#if menus.length > 0}
            <div class="menus">
                {#each menus as menu}
                    <button on:click={() => handleClickMenu(menu.onClick)}>
                        {menu.label}
                    </button>
                {/each}
            </div>
        {/if}
    </div>
    <div class="content" bind:this={el}>
        <slot />
    </div>
</div>

<style lang="scss">
    .swipe-card {
        user-select: none;
        cursor: grab;
        position: relative;
        overflow: hidden;
        height: 80px;

        .content {
            position: absolute;
            width: 100%;
            height: 100%;
            background: #000;
            transition: transform 0.1s linear;
        }

        .menu {
            position: absolute;
            cursor: pointer;
            left: 100%;
            top: 0;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.1s linear;
            background: #111;

            .menus {
                display: flex;
                gap: 0.5rem;
                background: #420505;
                height: 100%;

                button {
                    background: none;
                    border: none;
                    color: #eee;
                    font-size: 0.8rem;
                    height: 100%;
                    width: 5rem;
                    cursor: pointer;
                }
            }
        }
    }
</style>
