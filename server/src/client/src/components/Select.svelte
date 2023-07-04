<script lang="ts">
    import Menu from "../icons/Menu.svelte";

    export let options: {
        value: string;
        label: string;
    }[] = [];
    export let title: string = null;
    export let value: string;
    export let onChange: (value: string) => void;

    let isOpen = false;

    const handleClickOption = (value: string) => {
        onChange(value);
        isOpen = false;
    };

    $: label =
        options.find((option) => option.value === value)?.label || "Select";
</script>

<div class="select">
    <button class="opnner" on:click={() => (isOpen = !isOpen)}>
        <Menu />
        {label}
    </button>
    <button
        class="backdrop clickable"
        class:open={isOpen}
        on:click={() => (isOpen = false)}
    >
        {#if title}
            <div class="title" class:open={isOpen}>
                {title}
            </div>
        {/if}
        <ul class="menus" class:open={isOpen}>
            {#each options as option}
                <li>
                    <button
                        class:active={option.value === value}
                        on:click={() => handleClickOption(option.value)}
                    >
                        {#if option.value === value}
                            <span class="checkmark">✓</span>
                        {/if}
                        {option.label}
                    </button>
                </li>
            {/each}
        </ul>
    </button>
</div>

<style lang="scss">
    .opnner {
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        border: 1px solid #333;
        background-color: #000;
        color: #eee;
        display: flex;
        align-items: center;
        gap: 0.5rem;

        :global(svg) {
            width: 1rem;
            height: 1rem;
            margin-right: 0.5rem;
        }
    }

    .backdrop {
        position: fixed;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        gap: 1rem;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding: 1rem;
        opacity: 0;
        z-index: 1;
        pointer-events: none;
        background-color: rgba(0, 0, 0, 0.88);
        transition: opacity 0.2s ease-in-out;

        &.open {
            opacity: 1;
            pointer-events: all;
        }
    }

    .title {
        font-size: 0.875rem;
        color: #888;
        transform: translateY(-1rem);
        transition: all 0.2s ease-in-out;

        &.open {
            transform: translateY(0);
            opacity: 1;
        }
    }

    .menus {
        list-style: none;
        display: flex;
        flex-direction: column;
        width: 500px;
        max-width: 100%;
        padding: 0;
        margin: 0.5rem 0 0;
        background-color: #000;
        border: 1px solid #333;
        border-radius: 0.5rem;
        opacity: 0;
        transform: translateY(1rem);
        pointer-events: none;
        transition: all 0.2s ease-in-out;

        &.open {
            opacity: 1;
            transform: translateY(0);
            pointer-events: all;
        }

        li {
            padding: 0;
            margin: 0;

            &:not(:last-child) {
                border-bottom: 1px solid #333;
            }

            button {
                background-color: inherit;
                border: none;
                width: 100%;
                outline: none;
                color: #eee;
                padding: 1rem;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                font-size: 1rem;

                .checkmark {
                    margin-right: 0.5rem;
                    color: #abf176;
                }

                &.active {
                    background-color: #222;
                }

                &:hover {
                    background-color: #222;
                }
            }
        }
    }
</style>
