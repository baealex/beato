<script lang="ts">
    import { Link } from "svelte-routing";

    let navRef: HTMLElement;

    const handleClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const { left, width } = target.getBoundingClientRect();
        const { width: navWidth } = navRef.getBoundingClientRect();
        const center = left + width / 2 - navWidth / 2;
        navRef.scrollBy({
            left: center,
            behavior: "smooth",
        });
    };

    const navItems = [
        {
            name: "Favorite",
            path: "/",
        },
        {
            name: "Music",
            path: "/music",
        },
        {
            name: "Album",
            path: "/album",
        },
        {
            name: "Artist",
            path: "/artist",
        },
        {
            name: "Playlist",
            path: "/playlist",
        },
        {
            name: "Queue",
            path: "/queue-history",
        },
        {
            name: "Setting",
            path: "/setting",
        },
    ];
</script>

<header>
    <nav bind:this={navRef}>
        <ul>
            {#each navItems as item}
                <li>
                    <button class="clickable" on:click={handleClick}>
                        <Link to={item.path}>{item.name}</Link>
                    </button>
                </li>
            {/each}
        </ul>
    </nav>
</header>

<style lang="scss">
    header {
        position: relative;
        height: 60px;
        background-color: #000;
        color: #eee;
        display: flex;
        gap: 5rem;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #333;
    }

    nav {
        position: relative;
        overflow-x: auto;
        overflow-y: hidden;
        white-space: nowrap;
        scrollbar-width: none;
        -ms-overflow-style: none;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;

        &::-webkit-scrollbar {
            display: none;
        }

        &::before {
            content: "";
            position: fixed;
            top: 0;
            right: 0;
            width: 50px;
            height: 59px;
            background: linear-gradient(
                to left,
                rgba(0, 0, 0, 0.5) 0%,
                rgba(0, 0, 0, 0) 100%
            );
            z-index: 1;
            pointer-events: none;
        }
    }

    nav ul {
        display: flex;
        align-items: center;
        list-style: none;
        margin: 0;
        padding: 0 1rem;
        gap: 1rem;
    }

    nav li {
        font-size: 1rem;
    }

    nav :global(a) {
        position: relative;
        color: #fff;
        padding: 1rem 0;
        opacity: 0.5;
        text-decoration: none;
        transition: opacity 0.3s ease;

        &::after {
            content: "";
            position: absolute;
            transform: scaleX(0);
            bottom: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: #fff;
            transition: transform 0.3s ease;
        }
    }

    nav :global([aria-current="page"]) {
        opacity: 1;

        &::after {
            content: "";
            position: absolute;
            transform: scaleX(1);
            bottom: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: #fff;
        }
    }
</style>
