<script>
    import { Link } from "svelte-routing";

    export let dance = false;
</script>

<header>
    <h1 class:animate-dance={dance} class:animate-dance--paused={!dance}>
        {`(㇏(•̀ᵥᵥ•́)ノ)`}
    </h1>
    <nav>
        <ul>
            <li>
                <Link to="/">Music</Link>
            </li>
            <li>
                <Link to="/album">Album</Link>
            </li>
            <li>
                <Link to="/artist">Artist</Link>
            </li>
            <li>
                <Link to="/setting">Setting</Link>
            </li>
        </ul>
    </nav>
</header>

<style lang="scss">
    header {
        height: 60px;
        background-color: #000;
        color: #eee;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem;
        border-bottom: 1px solid #333;
    }

    @keyframes dance {
        0% {
            transform: rotate(0deg) scale(1);
        }
        25% {
            transform: rotate(5deg);
        }
        50% {
            transform: rotate(0deg) scale(1.2);
        }
        75% {
            transform: rotate(-5deg);
        }
        100% {
            transform: rotate(0deg) scale(1);
        }
    }

    header h1 {
        margin: 0;
        font-size: 1rem;
        font-family: "Press Start 2P", cursive;

        &.animate-dance {
            animation: dance 1s infinite;
        }

        &.animate-dance--paused {
            animation-play-state: paused;
        }
    }

    nav ul {
        display: flex;
        list-style: none;
        margin: 0;
        padding: 0;
    }

    nav li {
        margin-left: 1rem;
    }

    nav :global(a) {
        color: #888;
        text-decoration: none;
    }

    nav :global([aria-current="page"]) {
        color: #fff;
    }
</style>
