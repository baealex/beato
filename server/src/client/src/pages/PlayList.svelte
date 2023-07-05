<script lang="ts">
    import BottomPanel from "../components/BottomPanel.svelte";
    import PlaylistItem from "../components/PlaylistItem.svelte";
    import Beato from "../components/Beato.svelte";

    import { toast } from "../modules/ui/toast";

    import { createPlaylist } from "../api";

    import { playlist } from "../store";

    let name = "";
    let isSubmitting = false;
    let isOpenCreatePlaylist = false;

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        if (isSubmitting) return;

        if (name === "") {
            toast("Please enter a name.");
            return;
        }

        isSubmitting = true;
        const { data } = await createPlaylist(name);
        playlist.update((prev) => [data.createPlaylist, ...prev]);
        isOpenCreatePlaylist = false;
        name = "";
        isSubmitting = false;
    };
</script>

<div class="controls">
    <div class="help">
        Create a playlist to add your favorite musics.
    </div>
    <div class="buttons">
        <button
            class="gray-button"
            on:click={() => (isOpenCreatePlaylist = true)}
        >
            Create Playlist
        </button>
    </div>
</div>

{#if $playlist.length === 0}
    <div class="empty">
        <Beato dance={true} />
        <div>You don't have any playlist yet!</div>
    </div>
{/if}

{#each $playlist as item}
    <PlaylistItem
        name={item.name}
        items={item.headerMusics}
        itemCount={item.musicCount}
        onClick={() => {}}
    />
{/each}

<BottomPanel title="Create Playlist" isOpen={isOpenCreatePlaylist}>
    <form class="panel-content" on:submit={handleSubmit}>
        <input
            class="gray-input"
            type="text"
            placeholder="Playlist Name"
            bind:value={name}
        />
        <button class="gray-button" on:click={() => {}}> Create </button>
    </form>
</BottomPanel>

<style lang="scss">
    .help {
        color: #aaa;
        font-size: 0.8rem;
        padding: 1rem;
    }

    .empty {
        height: 400px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #ccc;
        font-size: 0.875rem;
        gap: 2rem;
    }

    .panel-content {
        padding: 1rem 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 0.5rem;

        input {
            height: 3rem;
            flex: 1;
        }

        button {
            height: 3rem;
            min-width: 5rem;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
</style>
