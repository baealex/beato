<script lang="ts">
    import PlaylistDetail from "./PlaylistDetail.svelte";

    import SubPage from "../components/SubPage.svelte";
    import BottomPanel from "../components/BottomPanel.svelte";
    import PlaylistItem from "../components/PlaylistItem.svelte";
    import Beato from "../components/Beato.svelte";

    import { toast } from "../modules/ui/toast";

    import * as socketManager from "../socket";

    import { playlists, playlistActionPanel } from "../store";

    let name = "";
    let nameInputRef: HTMLInputElement;
    let isOpenCreatePlaylist = false;

    let selectedId = null;
    let isOpenDetail = false;

    const resetCreate = () => {
        name = "";
        nameInputRef.blur();
        isOpenCreatePlaylist = false;
    };

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        if (name.trim() === "") {
            toast("Please enter a name.");
            return;
        }
        socketManager.socket.emit(socketManager.PLAYLIST_CREATE, { name });
        resetCreate();
    };

    $: {
        if (isOpenCreatePlaylist) {
            nameInputRef.focus();
        }
    }
</script>

<div class="controls">
    <div />
    <div class="buttons">
        <button
            class="gray-button"
            on:click={() => (isOpenCreatePlaylist = true)}
        >
            Create Playlist
        </button>
    </div>
</div>

{#if $playlists.length === 0}
    <div class="empty">
        <Beato dance={true} />
        <div>You don't have any playlist yet!</div>
    </div>
{/if}

{#each $playlists as item}
    <PlaylistItem
        name={item.name}
        items={item.headerMusics}
        itemCount={item.musicCount}
        onClick={() => {
            selectedId = item.id;
            isOpenDetail = true;
        }}
        onLongPress={() =>
            playlistActionPanel.update((state) => ({
                ...state,
                isOpen: true,
                playlist: item,
            }))}
    />
{/each}

<BottomPanel title="Create Playlist" bind:isOpen={isOpenCreatePlaylist}>
    <form class="panel-content" on:submit={handleSubmit}>
        <input
            bind:this={nameInputRef}
            bind:value={name}
            class="gray-input"
            type="text"
            placeholder="Playlist Name"
        />
        <button class="gray-button">Create</button>
    </form>
</BottomPanel>

<SubPage
    isOpen={isOpenDetail}
    onClose={() => {
        selectedId = null;
        isOpenDetail = false;
    }}
>
    {#if selectedId}
        <PlaylistDetail id={String(selectedId)} />
    {/if}
</SubPage>

<style lang="scss">
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
