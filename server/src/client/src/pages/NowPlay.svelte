<script lang="ts">
    import { playlist } from "../store/playlist";

    export let onClickMusic: (idx: number) => void;
</script>

<ul>
    {#each $playlist.items as music, idx}
        <li
            class:active={$playlist.selected === idx}
            on:keydown={(e) => {
                if (e.key === "Enter") {
                    onClickMusic(idx);
                }
            }}
            on:click={() => onClickMusic(idx)}
        >
            <img
                class="album-art"
                src={music.album.cover}
                alt=""
                loading="lazy"
            />
            <div class="info">
                <div class="title">
                    {music.name}
                </div>
                <div class="artist">
                    {music.artist.name}
                </div>
            </div>
        </li>
    {/each}
</ul>

<style lang="scss">
    ul {
        margin: 0;
        padding: 0;
        list-style: none;

        li {
            cursor: pointer;
            padding: 1rem;
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 0.5rem;

            &.active {
                border-left: 0.25rem solid #a076f1;
            }

            &:hover {
                background-color: rgba(255, 255, 255, 0.1);
            }
        }
    }
</style>
