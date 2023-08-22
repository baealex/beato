<script lang="ts">
    import {
        Connectors,
        PlayerLayout,
        PlayMode,
        SyncMusic,
    } from "~/components/setting";

    const handleClickRefreshApp = () => {
        location.reload();
    };
</script>

<div class="container">
    <section>
        <h3>Synchronization</h3>
        <SyncMusic />
    </section>
    <section>
        <h3>Play Mode</h3>
        <PlayMode />
    </section>
    <section>
        <h3>Player Layout</h3>
        <PlayerLayout />
    </section>
    <section style="align-items: flex-start;">
        <h3>Connectors</h3>
        <Connectors />
    </section>
    <section style="justify-content: space-between;">
        <h3>Have a problem?</h3>
        <div>
            <button class="dark-button" on:click={handleClickRefreshApp}>
                Try Refresh
            </button>
        </div>
    </section>
</div>

<style lang="scss">
    .container {
        padding: 1rem;
    }

    h3 {
        font-size: 1rem;
        font-weight: 600;
        color: #656565;
    }

    section {
        display: flex;
        flex-direction: column;
        border-bottom: 1px solid #222;
        padding: 2.5rem 0;
        gap: 1rem;
    }
</style>
