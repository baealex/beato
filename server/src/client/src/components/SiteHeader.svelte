<script>
    import { Link } from "svelte-routing";
</script>

<header>
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
            width: 50%;
            height: 59px;
            background: linear-gradient(
                to left,
                rgba(0, 0, 0, 0.05) 0%,
                rgba(0, 0, 0, 0) 100%
            );
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
        color: #888;
        padding: 1rem 0;
        text-decoration: none;
    }

    nav :global([aria-current="page"]) {
        color: #fff;
        border-bottom: 2px solid #fff;
    }
</style>
